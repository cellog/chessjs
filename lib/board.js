var Long = require("long")
var chess = exports
chess.board = board

var Pawn = 0,
    Rook = 1,
    Knight = 2,
    Bishop = 3,
    Queen = 4,
    King = 5

function board(setup) {
 this.bitboards = {
  black: [
   new Long(0x0000,0x00f0), // black pawns
   new Long(0x0000,0x0081), // black rooks
   new Long(0x0000,0x0042), // black knights
   new Long(0x0000,0x0024), // black bishops
   new Long(0x0000,0x0008), // black queens
   new Long(0x0000,0x0010)], // black king
  white: [
   new Long(0x0f00,0x0000), // white pawns
   new Long(0x1800,0x0000), // white rooks
   new Long(0x2400,0x0000), // white knights
   new Long(0x4200,0x0000), // white bishops
   new Long(0x1000,0x0000), // white queens
   new Long(0x0800,0x0000), // white kings
  ],
  empty: new Long(0x00ff,0xff00),
  both: new Long(0xff00,0x00ff)
 }
}

board.prototype.squareToBit = function(square) {
 return square.toLowerCase().charCodeAt(0) - 97 + (square.charCodeAt(1) - 49)*8
}