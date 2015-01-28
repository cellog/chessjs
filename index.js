var chess = require('./lib/board.js')
var myboard = new chess.board, unused = new chess.bitboard(0,0)
myboard.detectStartingSquare("e5", unused, unused, "e5", 0, false, false)
