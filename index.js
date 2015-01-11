var chess = require('./lib/board.js')
var bit = new chess.bitboard(0xffffffff,0xffffffff)

console.log(bit.debugString("\n"))
console.log(bit.bitscan())
