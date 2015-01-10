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
                    '00011110' +
                    '00010001' +
                    '11101011' +
                    '00000011' +
                    '01011000' +
                    '11110111' +
                    '00001011' +
                    '00001011'
                )
console.log(bit.debugString("\n"), "\n")
console.log(bit.rookMoves(empty).debugString("\n"))