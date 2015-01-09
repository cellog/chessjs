var chess = require('./lib/board.js')
var bit = chess.bitboard.fromBinary(
                    '00000001' +
                    '00100000' +
                    '00000100' +
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '10000000' +
                    '00000010'
)
console.log(bit.debugString("\n"), "\n")
console.log(bit.knightJumps().debugString("\n"))