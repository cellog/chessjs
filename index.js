var chess = require('./lib/board.js')

var bishop = chess.bitboard.fromBinary(
                        '00000001' +
                        '00000000' +
                        '00010000' +
                        '00000000' +
                        '00000010' +
                        '00001000' +
                        '00000000' +
                        '00000000'
                    ), empty = chess.bitboard.fromBinary(
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00100000' +
                        '00010000' +
                        '00000000' +
                        '00000000' +
                        '00000000'
                    ).not()

console.log(bishop.debugString("\n"), "\n")
console.log(empty.debugString("\n"), "\n")
console.log(bishop.bishopAttackTargets(empty).debugString("\n"), "\n")
