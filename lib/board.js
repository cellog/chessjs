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
   new Bitboard(0x00000000,0x0000ff00, 'p'), // black pawns
   new Bitboard(0x00000000,0x00000081, 'r'), // black rooks
   new Bitboard(0x00000000,0x00000042, 'n'), // black knights
   new Bitboard(0x00000000,0x00000024, 'b'), // black bishops
   new Bitboard(0x00000000,0x00000010, 'q'), // black queens
   new Bitboard(0x00000000,0x00000008, 'k'), // black king
  ],
  white: [
   new Bitboard(0x00ff0000, 0x00000000, 'P'), // white pawns
   new Bitboard(0x81000000, 0x00000000, 'R'), // white rooks
   new Bitboard(0x42000000, 0x00000000, 'N'), // white knights
   new Bitboard(0x24000000, 0x00000000, 'B'), // white bishops
   new Bitboard(0x10000000, 0x00000000, 'Q'), // white queens
   new Bitboard(0x08000000, 0x00000000, 'K'), // white king
  ]
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
  var boards = this.bitboards.white.concat(this.bitboards.black).map(function(i) {
   return i.toArray()
  });
  ret = '';
  for (var i = 0; i < 64; i++) {
   ret += boards.reduce(function(t, item) {
    if (item[i] !=  ' ') return item[i]
    return t
   }, ' ')
  }
  return ret
 }
})

Object.defineProperty(board.prototype, 'mapBoard', {
 get: function() {
  var board = this.textBoard
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

Bitboard.prototype.debugString = function() {
 var lower = this.getLowBitsUnsigned().toString(2),
     upper = this.getHighBitsUnsigned().toString(2),
     pad = '00000000'
 pad += pad
 pad += pad
 return (pad + lower).slice(-32) + (pad + upper).slice(-32)
}

Bitboard.prototype.toArray = function() {
 return this.debugString().replace(/0/g, ' ').replace(/1/g, this.piece).split('')
}
