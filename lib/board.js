var Long = require("long")
var chess = exports
chess.board = board

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
   new Long(0x00000000,0x0000ff00, true), // black pawns
   new Long(0x00000000,0x00000081, true), // black rooks
   new Long(0x00000000,0x00000042, true), // black knights
   new Long(0x00000000,0x00000024, true), // black bishops
   new Long(0x00000000,0x00000008, true), // black queens
   new Long(0x00000000,0x00000010, true), // black king
  ],
  white: [
   new Long(0x00ff0000, 0x00000000, true), // white pawns
   new Long(0x18000000, 0x00000000, true), // white rooks
   new Long(0x24000000, 0x00000000, true), // white knights
   new Long(0x42000000, 0x00000000, true), // white bishops
   new Long(0x80000000, 0x00000000, true), // white queens
   new Long(0x01000000, 0x00000000, true), // white king
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
  return this.bitboards.white.reduce(function(total, val) {
   return total.or(val)
  })
 }
})

Object.defineProperty(board.prototype, 'blackpieces', {
 enumerable: false,
 get: function() {
  return this.bitboards.black.reduce(function(total, val) {
   return total.or(val)
  })
 }
})

Object.defineProperty(board.prototype, 'both', {
 enumerable: false,
 get: function() {
  return this.whitepieces.or(this.blackpieces)
 }
})

chess.bitboardString = function(board) {
 var lower = board.getLowBitsUnsigned().toString(2),
     upper = board.getHighBitsUnsigned().toString(2),
     pad = '00000000'
 pad += pad
 pad += pad
 return (pad + lower).slice(-32) + (pad + upper).slice(-32)
}