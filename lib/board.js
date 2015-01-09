var Long = require("long")
var chess = exports
chess.board = board
chess.bitboard = Bitboard

var Pawn = 0,
    Rook = 1,
    Knight = 2,
    Bishop = 3,
    Queen = 4,
    King = 5,
    All = 6,
    rank4 = new Long(0,0xff),
    rank5 = new Long(0xff000000),
    notAFile = 0xfefefefe>>>0,
    notHFile = 0x7f7f7f7f>>>0

function board(setup) {
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

  set p(t) {this.black[0] = new Bitboard(t, undefined, 'p')},
  set P(t) {this.white[0] = new Bitboard(t, undefined, 'P')},
  set r(t) {this.black[1] = new Bitboard(t, undefined, 'r')},
  set R(t) {this.white[1] = new Bitboard(t, undefined, 'R')},
  set n(t) {this.black[2] = new Bitboard(t, undefined, 'n')},
  set N(t) {this.white[2] = new Bitboard(t, undefined, 'N')},
  set b(t) {this.black[3] = new Bitboard(t, undefined, 'b')},
  set B(t) {this.white[3] = new Bitboard(t, undefined, 'B')},
  set q(t) {this.black[4] = new Bitboard(t, undefined, 'q')},
  set Q(t) {this.white[4] = new Bitboard(t, undefined, 'Q')},
  set k(t) {this.black[5] = new Bitboard(t, undefined, 'k')},
  set K(t) {this.white[5] = new Bitboard(t, undefined, 'K')},
 }
}

board.prototype.toIndex = function(square) {
 square = square.toString()
 if (square.length != 2 || !square.match(/[a-h][1-8]/)) {
  throw new Error("Invalid input \"" + square + "\"");
 }
 return square.toLowerCase().charCodeAt(0) - 97 + (square.charCodeAt(1) - 49)*8
}

board.prototype.squareName = function(index) {
 var file = index % 8,
     rank = Math.floor(index / 8)
 return String.fromCharCode(file + 97) + String.fromCharCode(rank + 49)
}

Object.defineProperty(board.prototype, 'whitepieces', {
 enumerable: false,
 get: function() {
  if (!!this.bitboards.cache.white) {
   return this.bitboards.cache.white
  }
  return this.bitboards.cache.white = new Bitboard(this.bitboards.white.reduce(function(total, val) {
   return total.or(val)
  }))
 }
})

Object.defineProperty(board.prototype, 'blackpieces', {
 enumerable: false,
 get: function() {
  if (!!this.bitboards.cache.black) {
   return this.bitboards.cache.black
  }
  return this.bitboards.cache.black = new Bitboard(this.bitboards.black.reduce(function(total, val) {
   return total.or(val)
  }))
 }
})

function both(white,black) {
 return white.concat(black).reduce(
   function(total, val) {
    return total.or(val)
   }
  )
}

Object.defineProperty(board.prototype, 'both', {
 enumerable: false,
 get: function() {
  if (!!this.bitboards.cache.both) {
   return this.bitboards.cache.both
  }
  return this.bitboards.cache.both = new Bitboard(both(this.bitboards.white, this.bitboards.black))
 }
})

Object.defineProperty(board.prototype, 'emptysquares', {
 enumerable: false,
 get: function() {
  if (!!this.bitboards.cache.empty) {
   return this.bitboards.cache.empty
  }
  return this.bitboards.cache.empty = new Bitboard(both(this.bitboards.white, this.bitboards.black).not())
 }
})

board.prototype.textBoard = function(divider) {
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
}

board.prototype.whitePawnPushTargets = function() {
 return new Bitboard(this.bitboards.white[Pawn].northOne().and(this.emptysquares))
}

board.prototype.whiteDoublePawnPushTargets = function() {
 return new Bitboard(this.whitePawnPushTargets().northOne().and(this.emptysquares).and(rank4))
}

board.prototype.whitePawnsAbleToPush = function() {
 return new Bitboard(this.emptysquares.southOne().and(this.bitboards.white[Pawn]))
}

board.prototype.blackPawnPushTargets = function() {
 return new Bitboard(this.bitboards.black[Pawn].southOne().and(this.emptysquares))
}

board.prototype.blackDoublePawnPushTargets = function() {
 return new Bitboard(this.blackPawnPushTargets().southOne().and(this.emptysquares).and(rank5))
}

board.prototype.blackPawnsAbleToPush = function() {
 return new Bitboard(this.emptysquares.northOne().and(this.bitboards.black[Pawn]))
}

board.prototype.whitePawnEastAttackTargets = function() {
 return this.bitboards.white[Pawn].northeastOne()
}

board.prototype.whitePawnWestAttackTargets = function() {
 return this.bitboards.white[Pawn].northwestOne()
}

board.prototype.whitePawnAttackTargets = function() {
 return new Bitboard(this.bitboards.white[Pawn].northwestOne()
                     .or(this.bitboards.white[Pawn].northeastOne()))
}

board.prototype.blackPawnEastAttackTargets = function() {
 return this.bitboards.black[Pawn].southeastOne()
}

board.prototype.blackPawnWestAttackTargets = function() {
 return this.bitboards.black[Pawn].southwestOne()
}

board.prototype.blackPawnAttackTargets = function() {
 return new Bitboard(this.bitboards.black[Pawn].southwestOne()
                     .or(this.bitboards.black[Pawn].southeastOne()))
}

Object.defineProperty(board.prototype, 'mapBoard', {
 get: function() {
  var board = this.textBoard().match(/.{8}/g).reverse().join('')
  var ret = {}
  for (var i = 0; i < board.length; i++) {
   ret[this.squareName(i)] = board[i]
  }
  return ret
 }
})

function Bitboard() {
 var ret
 if (arguments[0] && arguments[0] instanceof Bitboard) {
  Long.call(this, arguments[0].low, arguments[0].high, true);
  this.piece = arguments[2] || arguments[0].piece;
  return this
 }
 if (arguments[0] && arguments[0] instanceof Long) {
  ret = arguments[0];
 } else {
  ret = new Long(arguments[0], arguments[1], true)
 }
 ret.__proto__ = Bitboard.prototype
 ret.piece = arguments[2] || 'X';
 return ret
}

Bitboard.prototype = new Long(0,0,true)

Bitboard.fromBinary = function(bin, piece) {
 var high = parseInt(bin.slice(0,32), 2), low = parseInt(bin.slice(-32), 2),
     // flip the board so a1 is in the lower right
     flip = Bitboard.verticalFlip(low, high)
 high = flip.high
 low = flip.low
 return new Bitboard(low, high, piece)
}

Bitboard.verticalFlip = function (low, high) {
 var newhigh = 0, newlow = 0
 // swap 1st/8th
 newhigh |= low << 24
 newlow  |= high >>> 24
 // swap 2nd/7th
 newhigh |= low << 8 & 0x00ff0000
 newlow  |= high >>> 8 & 0xff00
 // swap 3rd/6th
 newhigh |= low >>> 8 & 0x00ff00
 newlow  |= high << 8 & 0xff0000
 // swap 4th/5th
 newhigh |= low >>> 24
 newlow |= high << 24
 return {high: newhigh, low: newlow}
}

Bitboard.prototype.debugString = function(divider) {
 var upper = this.getLowBitsUnsigned(),
     lower = this.getHighBitsUnsigned(),
     pad = '00000000',
     // flip the board so a1 is in the lower right
     flip = Bitboard.verticalFlip(lower, upper)
 lower = flip.low
 upper = flip.high
 lower = (lower >>> 0).toString(2)
 upper = (upper >>> 0).toString(2)
 pad += pad
 pad += pad
 var thing = (pad + lower).slice(-32) + (pad + upper).slice(-32)
 if (divider) {
  return thing.match(/.{8}/g).join(divider)
 }
 return thing
}

Bitboard.prototype.toArray = function() {
 return this.debugString().replace(/0/g, ' ').replace(/1/g, this.piece).split('')
}

Bitboard.prototype.southFill = function() {
 var high = this.high, low = this.low,
     lsh = function(numBits) {return {l:low << numBits, h: (high << numBits) | (low >>> (32 - numBits))}},
     or  = function(n) {low |= n.l; high |= n.h}
 or(lsh(8))
 or(lsh(16))
 high |= low
 return new Bitboard(low, high, this.piece)
}

Bitboard.prototype.northFill = function() {
 var high = this.high, low = this.low,
     rsh = function(numBits) {return {l:(low >>> numBits) | (high << (32 - numBits)), h: high >> numBits}},
     or  = function(n) {low |= n.l, high |= n.h}
 or(rsh(8))
 or(rsh(16))
 low |= high
 return new Bitboard(low, high, this.piece)
}

Bitboard.prototype.southOne = function() {
 return new Bitboard(this.low << 8, (this.high << 8) | (this.low >>> 24), this.piece)
}

Bitboard.prototype.northOne = function() {
 return new Bitboard((this.low >>> 8) | (this.high << 24), this.high >> 8, this.piece)
}

Bitboard.prototype.westOne = function() {
 return new Bitboard((this.low << 1) & notAFile, ((this.high << 1) | (this.low >>> 31)) & notAFile, this.piece)
}

Bitboard.prototype.northwestOne = function() {
 return new Bitboard(((this.low >>> 7) | (this.high << 25)) & notAFile, (this.high >> 7) & notAFile, this.piece)
}

Bitboard.prototype.southwestOne = function() {
 return new Bitboard((this.low << 9) & notAFile, ((this.high << 9) | (this.low >>> 23)) & notAFile, this.piece)
}

Bitboard.prototype.eastOne = function() {
 return new Bitboard(((this.low >>> 1) | (this.high << 31)) & notHFile, (this.high >> 1) & notHFile, this.piece)
}

Bitboard.prototype.northeastOne = function() {
 return new Bitboard(((this.low >>> 9) | (this.high << 23)) & notHFile, (this.high >> 9) & notHFile, this.piece)
}

Bitboard.prototype.southeastOne = function() {
 return new Bitboard((this.low << 7) & notHFile, ((this.high << 7) | (this.low >>> 25)) & notHFile, this.piece)
}
