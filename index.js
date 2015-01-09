var chess = require('./lib/board.js')

var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '10000000'
)
console.log(bit.debugString("\n"), "\n")
console.log(bit.kingMoves().debugString("\n"))