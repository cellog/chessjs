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
    rank5 = new Long(0xff000000)

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
  }
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

Bitboard.fromBinary = function(bin) {
 var high = parseInt(bin.slice(0,32), 2), low = parseInt(bin.slice(-32), 2),
     // flip the board so a1 is in the lower right
     flip = Bitboard.verticalFlip(low, high)
 high = flip.high
 low = flip.low
 return new Bitboard(low, high)
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
 return new Bitboard(low, high)
}

Bitboard.prototype.northFill = function() {
 var high = this.high, low = this.low,
     rsh = function(numBits) {return {l:(low >>> numBits) | (high << (32 - numBits)), h: high >> numBits}},
     or  = function(n) {low |= n.l, high |= n.h}
 or(rsh(8))
 or(rsh(16))
 low |= high
 return new Bitboard(low, high)
}

Bitboard.prototype.southOne = function() {
 return new Bitboard(this.low << 8, (this.high << 8) | (this.low >>> 24))
}

Bitboard.prototype.northOne = function() {
 return new Bitboard((this.low >>> 8) | (this.high << 24), this.high >> 8)
}
