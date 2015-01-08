var chess = require('./lib/board.js')
var board = new chess.board
console.log(board.bitboards.black[1].debugString("\n"))