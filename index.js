var chess = require('./lib/board.js')

var bit = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
),empty = chess.bitboard.fromBinary(
                    '01000000' +
                    '10000010' +
                    '01100100' +
                    '00101001' +
                    '01010100' +
                    '00100110' +
                    '01000001' +
                    '10010000'
                )
console.log(bit.debugString("\n"), "\n")
console.log(bit.bishopMoves(empty).debugString("\n"))