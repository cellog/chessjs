var chess = require('./lib/board.js')

var bit = chess.bitboard.fromBinary(
                    '10000001' +
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '10000000' +
                    '00000000' +
                    '00000000' +
                    '10000001'
)
console.log(bit.debugString("\n"), "\n")
console.log(bit.knightJumps().debugString("\n"))