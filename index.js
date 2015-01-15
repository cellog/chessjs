var chess = require('./lib/board.js')
var f = chess.bitboard.fromBinary(
                                        '00000000' +
                    '00000000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
)
console.log(f.not().debugString("\n"))