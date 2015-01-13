var chess = require('./lib/board.js')
var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                ), empty = new chess.bitboard(0,0),
                king = chess.bitboard.fromBinary(
                            '00000000' +
                            '00000000' +
                            '00000000' +
                            '00000000' +
                            '00010000' +
                            '00000000' +
                            '00000000' +
                            '00000000'
                        ),k
                k = king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, false)

