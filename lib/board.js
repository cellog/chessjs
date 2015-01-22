var chess = exports,
    Bitboard = require('./bitboard.js'),
    makeError = require('custom-error')
chess.board = board
chess.bitboard = Bitboard
chess.InvalidMoveError = makeError('InvalidMoveError')

var Pawn = 0,
    Rook = 1,
    Knight = 2,
    Bishop = 3,
    Queen = 4,
    King = 5,
    All = 6

function board(setup) {
 this.turn = 'white'

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

 textBoard: function(divider) {
  divider = divider || ''
  var boards = this.bitboards.white.concat(this.bitboards.black).map(function(i) {
   return i.toArray()
  });
  ret = '';
  for (var i = 0; i < 64; i++) {
   if (i > 0 && (i % 8 == 0)) {
    ret += divider
   }
   ret += boards.reduce(function(t, item) {
    if (item[i] !=  ' ') return item[i]
    return t
   }, ' ')
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

 bitboardAttacks: function(white) {
  var pieces, foes, empty = this.emptysquares, mineinverted
  if (!!white) {
   pieces = this.bitboards.white
   foes = this.blackpieces
   mineinverted = this.whitepieces.not()
  } else {
   pieces = this.bitboards.black
   foes = this.whitepieces
   mineinverted = this.blackpieces.not()
  }
  return pieces[Pawn].attackingPawns(foes, white).pawnAttackTargets(white)
         .orB(pieces[Knight].knightJumps(white))
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
 
 getLegalMoves: function(p, name, captures) {
  var bitboard = this.bitboards[this.turn][p],
      enemy = (this.turn == 'white' ? this.blackpieces : this.whitepieces),
      enemyking = (this.turn == 'white' ? this.bitboards.k : this.bitboards.K).not(),
      whitesturn = this.turn == 'white'

  if (captures) {
   if (p == Pawn) {
    return enemy.attackingPawns(bitboard, !whitesturn).andB(enemyking)
   } else {
    return bitboard[name + "AttackTargets"](this.emptysquares).andB(enemy).andB(enemyking)
   }
  } else {
   // the last two parameters are only used by pawnMoves
   return bitboard[name + "Moves"](this.emptysquares, new Bitboard(0,0), whitesturn)
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
   if (!startingSquare) {
    // detect starting square
    switch (p) {
     case Pawn:
      if (captures) {
       this.attackingPawns(legalmoves, whitesturn)
      } else {
       var func = whitesturn ? southOne : northOne,
           lsq = chess.bitboard.fromAlgebraic(landing),
           onesquare = lsq[func]()
       if (bitboard.andB(onesquare).isNotEmpty()) {
        // single pawn move
        startingSquare = onesquare.toAlgebraic()
        break
       }
       if (bitboard.andB(onesquare[func]()).isNotEmpty()) {
        startingSquare = onesquare[func]().toAlgebraic()
       } else {
        throw new InvalidMoveError('"' + ply + '" attempts to move non-existent piece')
       }
      }
      break
     case Bishop:
     case Rook:
     case Queen:
     case Knight:
     case King:
    }
   } else {
    
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
