var chess = require('./lib/board.js')

var queen = chess.bitboard.fromBinary(
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

console.log(queen.pawnDoubleMoves(empty).debugString("\n"), "\n")
