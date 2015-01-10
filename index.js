var chess = require('./lib/board.js')

var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000001' +
                    '00010000' +
                    '11100000' +
                    '00000000'
                ),
                enemies = chess.bitboard.fromBinary(
                    '01000000' +
                    '00001110' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                ),
                empty = chess.bitboard.fromBinary(
                    '01000000' +
                    '00101110' +
                    '00000100' +
                    '00000010' +
                    '00100001' +
                    '00010000' +
                    '11100000' +
                    '00000000'
                ).not()
console.log(bit.debugString("\n"), "\n")
console.log(enemies.debugString("\n"), "\n")
console.log(bit.pawnMoves(empty, enemies, false).debugString("\n"))
