var chess = require('./lib/board.js')
var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '01100000' +
                    '00000100' +
                    '00000010' +
                    '00000011' +
                    '00011000' +
                    '11000000' +
                    '00000010'
)
console.log(bit.debugString("\n"), "\n")
console.log(bit.northwestOne().debugString("\n"))