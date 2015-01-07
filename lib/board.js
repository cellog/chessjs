var Vector = require("./vector.js").vector
var chess = exports
chess.board = board

function board(setup) {
 this.squares = new Array(64);
}
board.prototype.indexOf = function(square) {
 if (square instanceof Vector) {
  return square.indexOf()
 }
 if (typeof square != "string") {
  throw new Error("coordinate must be a string")
 }
 if (square.length != 2) {
  throw new Error('"' + square + '" is not a valid coordinate')
 }
 square = square.toLowerCase()
 var col = square.charCodeAt(0), row = square.charCodeAt(1)
 if (col < 97 || col > 97+8) {
  throw new Error('"' + square[0] + '" is not a valid column (a-h)')
 }
 if (row < 49 || row > 49+8) {
  throw new Error('"' + square[1] + '" is not a valid row (1-8)')
 }
 col -= 97
 row -= 49
 return row*8 + col
}
