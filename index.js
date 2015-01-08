var chess = require('./lib/board.js')
var a = new chess.bitboard(0xff000000,0)
console.log(a.debugString())