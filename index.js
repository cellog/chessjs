var chess = require('./lib/board.js')

var rook = chess.bitboard.fromBinary(
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
                        '00000000' +
                        '00001001' +
                        '00000000' +
                        '00000000' +
                        '10010000'
                    ).not()

console.log(rook.debugString("\n"), "\n")
console.log(empty.debugString("\n"), "\n")
console.log(rook.rookAttackTargets(empty).debugString("\n"), "\n")
