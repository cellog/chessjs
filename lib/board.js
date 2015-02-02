var chess = exports,
    Bitboard = require('./bitboard.js'),
    Vector = require('./vector.js').vector,
    makeError = require('custom-error')
chess.board = board
chess.bitboard = Bitboard
chess.vector = Vector
var InvalidMoveError = makeError('InvalidMoveError')
chess.InvalidMoveError = InvalidMoveError

var Pawn = 0,
    Rook = 1,
    Knight = 2,
    Bishop = 3,
    Queen = 4,
    King = 5,
    All = 6

function board(setup) {
 this.turn = 'white'

 this.pieces = {
  P: [new Vector(0,1), new Vector(1,1), new Vector(2,1), new Vector(3,1), new Vector(4,1), new Vector(5,1), new Vector(6,1)],
  R: [new Vector(0,0), new Vector(7,0)],
  N: [new Vector(1,0), new Vector(6,0)],
  B: [new Vector(2,0), new Vector(5,0)],
  Q: [new Vector(3,0)],
  K: [new Vector(4,0)],
  p: [new Vector(0,6), new Vector(1,6), new Vector(2,6), new Vector(3,6), new Vector(4,6), new Vector(5,6), new Vector(6,6)],
  r: [new Vector(0,7), new Vector(7,7)],
  n: [new Vector(1,7), new Vector(6,7)],
  b: [new Vector(2,7), new Vector(5,7)],
  q: [new Vector(3,7)],
  k: [new Vector(4,7)]
 }
 this.bitboards = {
  white: [
   new Bitboard(0x00000000,0x00ff0000, 'P'), // white pawns
   new Bitboard(0x00000000,0x81000000, 'R'), // white rooks
   new Bitboard(0x00000000,0x42000000, 'N'), // white knights
   new Bitboard(0x00000000,0x24000000, 'B'), // white bishops
   new Bitboard(0x00000000,0x10000000, 'Q'), // white queens
   new Bitboard(0x00000000,0x08000000, 'K'), // white king
  ],
  black: [
   new Bitboard(0x0000ff00,0x00000000, 'p'), // black pawns
   new Bitboard(0x00000081,0x00000000, 'r'), // black rooks
   new Bitboard(0x00000042,0x00000000, 'n'), // black knights
   new Bitboard(0x00000024,0x00000000, 'b'), // black bishops
   new Bitboard(0x00000010,0x00000000, 'q'), // black queens
   new Bitboard(0x00000008,0x00000000, 'k'), // black king
  ],
  cache: {
   empty: null,
   both: null,
   white: null,
   black: null
  },
  clearCache: function() {
   this.cache = {
    empty: null,
    both: null,
    white: null,
    black: null
   }
  },
  get p() {return this.black[0]},
  get P() {return this.white[0]},
  get r() {return this.black[1]},
  get R() {return this.white[1]},
  get n() {return this.black[2]},
  get N() {return this.white[2]},
  get b() {return this.black[3]},
  get B() {return this.white[3]},
  get q() {return this.black[4]},
  get Q() {return this.white[4]},
  get k() {return this.black[5]},
  get K() {return this.white[5]},

  set p(t) {this.black[0] = new Bitboard(t, 'p');this.clearCache()},
  set P(t) {this.white[0] = new Bitboard(t, 'P');this.clearCache()},
  set r(t) {this.black[1] = new Bitboard(t, 'r');this.clearCache()},
  set R(t) {this.white[1] = new Bitboard(t, 'R');this.clearCache()},
  set n(t) {this.black[2] = new Bitboard(t, 'n');this.clearCache()},
  set N(t) {this.white[2] = new Bitboard(t, 'N');this.clearCache()},
  set b(t) {this.black[3] = new Bitboard(t, 'b');this.clearCache()},
  set B(t) {this.white[3] = new Bitboard(t, 'B');this.clearCache()},
  set q(t) {this.black[4] = new Bitboard(t, 'q');this.clearCache()},
  set Q(t) {this.white[4] = new Bitboard(t, 'Q');this.clearCache()},
  set k(t) {this.black[5] = new Bitboard(t, 'k');this.clearCache()},
  set K(t) {this.white[5] = new Bitboard(t, 'K');this.clearCache()},
 }
}

board.prototype = {
 toIndex: function(square) {
  square = square.toString()
  if (square.length != 2 || !square.match(/[a-h][1-8]/)) {
   throw new Error("Invalid input \"" + square + "\"");
  }
  return square.toLowerCase().charCodeAt(0) - 97 + (square.charCodeAt(1) - 49)*8
 },

 squareName: function(index) {
  var file = index % 8,
      rank = Math.floor(index / 8)
  return String.fromCharCode(file + 97) + String.fromCharCode(rank + 49)
 },

 get whitepieces() {
  if (!!this.bitboards.cache.white) {
   return this.bitboards.cache.white
  }
  return this.bitboards.cache.white = this.bitboards.white.reduce(function(total, val) {
   return total.orB(val)
  })
 },

 get blackpieces() {
  if (!!this.bitboards.cache.black) {
   return this.bitboards.cache.black
  }
  return this.bitboards.cache.black = this.bitboards.black.reduce(function(total, val) {
   return total.orB(val)
  })
 },

 get both() {
  if (!!this.bitboards.cache.both) {
   return this.bitboards.cache.both
  }
  return this.bitboards.cache.both = this.whitepieces.orB(this.blackpieces)
 },
 get emptysquares() {
  if (!!this.bitboards.cache.empty) {
   return this.bitboards.cache.empty
  }
  return this.bitboards.cache.empty = this.both.not()
 },

 textBoard: function(divider, space) {
  divider = divider || ''
  space = space || ' '
  var boards = this.bitboards.white.concat(this.bitboards.black).map(function(i) {
   return i.toArray(space)
  });
  ret = '';
  for (var i = 0; i < 64; i++) {
   if (i > 0 && (i % 8 == 0)) {
    ret += divider
   }
   ret += boards.reduce(function(t, item) {
    if (item[i] != space) return item[i]
    return t
   }, space)
  }
  return ret
 },

 get mapBoard() {
  var board = this.textBoard().match(/.{8}/g).reverse().join('')
  var ret = {}
  for (var i = 0; i < board.length; i++) {
   ret[this.squareName(i)] = board[i]
  }
  return ret
 },

 bitboardAttacks: function(white, mineinverted) {
  var pieces, foes, empty = this.emptysquares, nofilterpawns = !!mineinverted
  if (!!white) {
   pieces = this.bitboards.white
   foes = this.blackpieces
   mineinverted = mineinverted || this.whitepieces.not()
  } else {
   pieces = this.bitboards.black
   foes = this.whitepieces
   mineinverted = mineinverted || this.blackpieces.not()
  }
  var start = nofilterpawns ? pieces[Pawn] : pieces[Pawn].attackingPawns(foes, white)
  return start.pawnAttackTargets(white)
         .orB(pieces[Knight].knightMoves())
         .orB(pieces[Bishop].bishopAttackTargets(empty))
         .orB(pieces[Rook].rookAttackTargets(empty))
         .orB(pieces[King].kingAttackTargets())
         .orB(pieces[Queen].queenAttackTargets(empty))
         .andB(mineinverted)
 },

 blackToMove: function() {
  this.turn = 'black'
 },
 
 whiteToMove: function() {
  this.turn = 'white'
 },
 
 /**
  * Get a list of possible king moves, not taking into account whether it is
  * a capture or just a move
  * 
  * First, get a list of all possible moves that don't "take" our own pieces
  * Next, calculate all the checking moves that would put the king in check on those squares
  * A subnote: we have to remove pieces that are adjacent to the king when
  * calculating the checking moves, as they would be captured if the king moves there.
  * We have to instead see if any other pieces were protecting the captured pieces
  */
 getPotentialKingMoves: function() {
  var king = this.bitboards[this.turn][King],
      whitesturn = this.turn == 'white',
      enemy = (whitesturn ? this.blackpieces : this.whitepieces),
      pieces = this.bitboards[whitesturn ? 'black' : 'white']
      kingmoves = king.kingMoves(whitesturn ? this.whitepieces.not() : this.blackpieces.not()),
      kingmovesandking = kingmoves.orB(king),
      notkingmoves = kingmoves.not(),
      enemyking = (whitesturn ? this.bitboards.k : this.bitboards.K).kingMoves(new Bitboard(0,0).not()).not(),
      checks = kingmoves.inCheck(this.emptysquares.orB(kingmovesandking), pieces[Pawn],
                                 pieces[Rook], pieces[Knight],
                                 pieces[Bishop], pieces[Queen], whitesturn)
  if (!checks) {
   return kingmoves.andB(enemyking)
  }
  if (checks.pawn) {
   kingmoves = kingmoves.andB(checks.pawn.pawnAttackTargets(!whitesturn).not())
  }
  if (checks.knight) {
   kingmoves = kingmoves.andB(checks.knight.knightMoves().not())
  }
  if (checks.bishop) {
   kingmoves = kingmoves.andB(checks.bishop.bishopAttackTargets(this.emptysquares.orB(kingmovesandking)).not())
  }
  if (checks.rook) {
   kingmoves = kingmoves.andB(checks.rook.rookAttackTargets(this.emptysquares.orB(kingmovesandking)).not())
  }
  if (checks.queen) {
   kingmoves = kingmoves.andB(checks.queen.queenAttackTargets(this.emptysquares.orB(kingmovesandking)).not())
  }
  return kingmoves.andB(enemyking)
 },

 getCheckingLanes: function(asVector) {
  var whitesturn = this.turn == 'white',
      king = this.bitboards[this.turn][King],
      pieces = (whitesturn ? this.bitboards.black : this.bitboards.white),
      vectorking = whitesturn ? this.pieces.K : this.pieces.k,
      checks = king.inCheck(this.emptysquares, pieces[Pawn],
                                    pieces[Rook], pieces[Knight],
                                    pieces[Bishop], pieces[Queen], whitesturn, asVector)
  if (!checks) {
   return new Bitboard(0,0)
  }
  if (checks.pawn) {
   return checks.pawn
  }
  if (checks.knight) {
   return checks.knight
  }
  if (checks.bishop) {
   if (asVector) {
    return vectorking.getConnectedBishops(checks.bishop)
   }
   return king.getConnectingRays(checks.bishop, 'bishop')
  }
  if (checks.rook) {
   if (asVector) {
    return vectorking.getConnectedRooks(checks.rook)
   }
   return king.getConnectingRays(checks.rook, 'rook')
  }
  //queen
  if (asVector) {
   return vectorking.getConnectedQueens(checks.queen)
  }
  return king.getConnectingRays(checks.queen, 'queen')
 },
 
 getLegalMoves: function(p, name, captures) {
  var bitboard = this.bitboards[this.turn][p],
      whitesturn = this.turn == 'white',
      me = (whitesturn ? this.whitepieces : this.blackpieces),
      enemy = (whitesturn ? this.blackpieces : this.whitepieces),
      enemyking = (whitesturn ? this.bitboards.k : this.bitboards.K).not(),
      checkers = this.bitboards[this.turn]

  if (captures) {
   if (p == Pawn) {
    return enemy.attackingPawns(bitboard, !whitesturn).andB(enemyking)
   } else if (p == King) {
    return this.getPotentialKingMoves().andB(enemy)
   } else if (p == Knight) {
    return bitboard[name + "AttackTargets"](me.not()).andB(enemy).andB(enemyking)
   } else {
    return bitboard[name + "AttackTargets"](this.emptysquares).andB(enemy).andB(enemyking)
   }
  } else {
   if (p == Knight) {
    return bitboard.knightMoves(this.emptysquares)
   } else if (p == King) {
    return this.getPotentialKingMoves().andB(this.emptysquares)
   }
   // the last two parameters are only used by pawnMoves
   return bitboard[name + "Moves"](this.emptysquares, new Bitboard(0,0), whitesturn)
  }
 },

 // TODO: when we implement the array-based board in parallel, implement most of this using that instead of bitboards, which are clunkier
 detectStartingSquare: function(ply, bitboard, legalmoves, landing, p, startingSquare, captures) {
  var piecename, fancypiecename
  switch (p) {
   case Pawn:
    if (captures) {
     if (!startingSquare || !startingSquare.match(/^[a-h]$/)) {
      throw new InvalidMoveError("Pawn capture move must be a file (a-h)")
     }
     var st = startingSquare.charCodeAt(0), land = landing.charCodeAt(0)
     if (st != land+1 && st != land-1) {
      throw new InvalidMoveError('Pawn capture move must be an adjacent file to "' + landing + '", not "' + startingSquare + '"')
     }
     var squares = Bitboard.fromAlgebraic(landing).pawnAttackTargets(this.turn != 'white').toAlgebraic(true)
     var pawnsquares = bitboard.toAlgebraic(true)
     if (squares[0][0] == startingSquare) {
      if (-1 == pawnsquares.indexOf(squares[0])) {
       throw new InvalidMoveError('Pawn capture from "' + squares[0] + '" to "' + landing + '" is impossible, no pawn on "' + squares[0] + '"')
      }
      return squares[0]
     }
     if (-1 == pawnsquares.indexOf(squares[1])) {
      throw new InvalidMoveError('Pawn capture from "' + squares[1] + '" to "' + landing + '" is impossible, no pawn on "' + squares[1] + '"')
     }
     return squares[1]
    } else {
     var func = this.turn == 'white' ? 'southOne' : 'northOne',
         lsq = chess.bitboard.fromAlgebraic(landing),
         onesquare = lsq[func]()
     if (bitboard.andB(onesquare).isNotEmpty()) {
      // single pawn move
      return onesquare.toAlgebraic()
     }
     if (bitboard.andB(onesquare[func]()).isNotEmpty()) {
      return onesquare[func]().toAlgebraic()
     } else {
      throw new InvalidMoveError('"' + ply + '" attempts to move non-existent piece')
     }
    }
   case Knight:
   case Bishop:
    piecename = 'bishop'
    fancypiecename = 'Bishop'
    break
   case Rook:
    piecename = 'rook'
    fancypiecename = 'Rook'
    break
   case Queen:
    piecename = 'queen'
    fancypiecename = 'Queen'
    break
   case King:
    if (legalmoves.andB(chess.bitboard.fromAlgebraic(landing)).isEmpty()) {
     throw new InvalidMoveError('King cannot move to "' + landing + '" from "' + bitboard.toAlgebraic() + '"')
    }
    return bitboard.toAlgebraic()
  }
  var land = chess.bitboard.fromAlgebraic(landing)
  if (legalmoves.andB(land).isEmpty()) {
   throw new InvalidMoveError(fancypiecename + 's cannot move to "' + landing + '"')
  }
  var rays = land.getConnectingRays(bitboard, piecename, true)
  var possibles = rays.reduce(function(square, ray, total) {
   if (ray.isNotEmpty()) {
    total.push(square)
   }
   return total
  }, [])
  if (possibles.length == 1) {
   return possibles[0]
  } else {
   throw new InvalidMoveError('Too many ' + piecename + 's can move to "' + landing + '", need more disambiguation than "' + startingSquare + '"')
  }
 },
 
 parseAlgebraicNotation: function(ply, domove) {
  var map = {
   P:Pawn,
   B:Bishop,
   R:Rook,
   Q:Queen,
   N:Knight,
   K:King
  },
  namemap = {
   P:"pawn",
   B:"bishop",
   R:"rook",
   N:"knight",
   Q:"queen",
   K:"king"
  }
  var m = ply.match(/^([PRNBQKprnbqk])?([a-h][1-8]?)?(x)?([a-h][1-8])$/)
  if (m) {
   var captures = m[3] || false
   var piece = m[1].toUpperCase() || 'P',p=map[piece],legalmoves
   var bitboard = this.bitboards[this.turn][p]
   var startingSquare = m[2] || false
   var landing = m[4]
   var enemy = (this.turn == 'white' ? this.blackpieces : this.whitepieces)
   var enemyking = (this.turn == 'white' ? this.bitboards.k : this.bitboards.K).not()
   var whitesturn = this.turn == 'white'
   var tentativemove

   legalmoves = this.getLegalMoves(p, namemap[piece], captures)
   if (startingSquare && startingSquare.length != 2) {
    // detect starting square
    startingSquare = this.detectStartingSquare(ply, bitboard, legalmoves, landing, p, startingSquare, !!captures)
   }
   if (captures) {
    // make sure a piece exists on the landing square and it isn't the king
   } else {
    // make sure the landing square is unoccupied
   }
   // make the move
  }
 }
}

board.fromTextBoard = function(text, divider) {
 divider = divider || ''
 if (divider.length) {
  text = text.replace(new RegExp(divider.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g'),"")
 }
 var ret = new board(),
     empty = new Bitboard(0,0),
     one = new Bitboard(1,0)
 ret.bitboards.p = empty
 ret.bitboards.P = empty
 ret.bitboards.r = empty
 ret.bitboards.R = empty
 ret.bitboards.n = empty
 ret.bitboards.N = empty
 ret.bitboards.b = empty
 ret.bitboards.B = empty
 ret.bitboards.q = empty
 ret.bitboards.Q = empty
 ret.bitboards.k = empty
 ret.bitboards.K = empty
 ret.pieces.P = []
 ret.pieces.R = []
 ret.pieces.B = []
 ret.pieces.N = []
 ret.pieces.Q = []
 ret.pieces.K = []
 ret.pieces.p = []
 ret.pieces.r = []
 ret.pieces.b = []
 ret.pieces.n = []
 ret.pieces.q = []
 ret.pieces.k = []

 for (var i = 0; i < 64; i++) {
  var j = 63-i
  switch (text[j]) {
   case 'p' :
   case 'P' :
   case 'r' :
   case 'R' :
   case 'n' :
   case 'N' :
   case 'b' :
   case 'B' :
   case 'q' :
   case 'Q' :
   case 'k' :
   case 'K' :
    ret.pieces[text[j]].push(new Vector(j % 8,7-Math.floor(j/8)))
    if (i >= 32) {
     ret.bitboards[text[j]] = ret.bitboards[text[j]].orB(one.BIGshl(i))
     break
    }
    ret.bitboards[text[j]] = ret.bitboards[text[j]].orB(one.shl(i))
    break;
   default:
    // space
    break;
  }
 }
 for (var i = 0; i < 6; i++) {
  ret.bitboards.white[i].verticalFlip()
  ret.bitboards.black[i].verticalFlip()
 }
 return ret
}
