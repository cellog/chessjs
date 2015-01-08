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
   new Long(0x00000000,0x0000ff00), // black pawns
   new Long(0x00000000,0x00000081), // black rooks
   new Long(0x00000000,0x00000042), // black knights
   new Long(0x00000000,0x00000024), // black bishops
   new Long(0x00000000,0x00000008), // black queens
   new Long(0x00000000,0x00000010), // black king
   new Long(0x00000000,0x0000ffff)  // all black pieces
  ],
  white: [
   new Long(0x00ff0000, 0x00000000), // white pawns
   new Long(0x18000000, 0x00000000), // white rooks
   new Long(0x24000000, 0x00000000), // white knights
   new Long(0x42000000, 0x00000000), // white bishops
   new Long(0x80000000, 0x00000000), // white queens
   new Long(0x01000000, 0x00000000), // white king
   new Long(0xffff0000, 0x00000000)  // all white pieces
  ],
  empty: new Long(0x0000ffff,0xffff0000),
  both: new Long(0xffff0000,0x0000ffff)
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

chess.bitboardString = function(board) {
 var lower = board.getLowBitsUnsigned().toString(2),
     upper = board.getHighBitsUnsigned().toString(2),
     pad = '00000000'
 pad += pad
 pad += pad
 return (pad + lower).slice(-32) + (pad + upper).slice(-32)
}