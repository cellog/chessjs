var chess = require('./lib/board.js')

var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '01000000'
),empty = chess.bitboard.fromBinary(
                    '01001010' +
                    '01011010' +
                    '01000010' +
                    '01001000' +
                    '01001000' +
                    '01000000' +
                    '01000000' +
                    '00000000'
                )
console.log(bit.debugString("\n"), "\n")
console.log(bit.rookMovesUp(empty).debugString("\n"))