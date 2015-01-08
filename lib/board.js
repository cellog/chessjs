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
    All = 6

function board(setup) {
 this.bitboards = {
  black: [
   new Bitboard(0x00000000,0x0000ff00), // black pawns
   new Bitboard(0x00000000,0x00000081), // black rooks
   new Bitboard(0x00000000,0x00000042), // black knights
   new Bitboard(0x00000000,0x00000024), // black bishops
   new Bitboard(0x00000000,0x00000008), // black queens
   new Bitboard(0x00000000,0x00000010), // black king
  ],
  white: [
   new Bitboard(0x00ff0000, 0x00000000), // white pawns
   new Bitboard(0x18000000, 0x00000000), // white rooks
   new Bitboard(0x24000000, 0x00000000), // white knights
   new Bitboard(0x42000000, 0x00000000), // white bishops
   new Bitboard(0x80000000, 0x00000000), // white queens
   new Bitboard(0x01000000, 0x00000000), // white king
  ]
 }
}

board.prototype.toIndex = function(square) {
 square = square.toString()
 if (square.length != 2 || !square.match(/[a-h][1-8]/)) {
  throw new Error("Invalid input \"" + square + "\"");
 }
 var r = square.toLowerCase().charCodeAt(0) - 97 + (square.charCodeAt(1) - 49)*8
 if (r < 0 || r > 63) {
  throw new Error("Invalid input \"" + square + "\"")
 }
 return r
}

Object.defineProperty(board.prototype, 'whitepieces', {
 enumerable: false,
 get: function() {
  return new Bitboard(this.bitboards.white.reduce(function(total, val) {
   return total.or(val)
  }))
 }
})

Object.defineProperty(board.prototype, 'blackpieces', {
 enumerable: false,
 get: function() {
  return new Bitboard(this.bitboards.black.reduce(function(total, val) {
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
  return new Bitboard(both(this.bitboards.white, this.bitboards.black))
 }
})

Object.defineProperty(board.prototype, 'emptysquares', {
 enumerable: false,
 get: function() {
  return new Bitboard(both(this.bitboards.white, this.bitboards.black).not())
 }
})

Object.defineProperty(board.prototype, 'textBoard', {
 enumerable: false,
 get: function() {
  
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
 return ret
}

Bitboard.prototype = new Long(0,0,true)

Bitboard.prototype.debugString = function() {
 var lower = this.getLowBitsUnsigned().toString(2),
     upper = this.getHighBitsUnsigned().toString(2),
     pad = '00000000'
 pad += pad
 pad += pad
 return (pad + lower).slice(-32) + (pad + upper).slice(-32)
}