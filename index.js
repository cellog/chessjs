var chess = require('./lib/board.js')

var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
)
console.log(bit.debugString("\n"), "\n")
console.log(bit.southFill().debugString("\n"))