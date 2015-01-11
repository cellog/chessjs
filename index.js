var chess = require('./lib/board.js')

var board = new chess.board()
            board.bitboards.p = chess.bitboard.fromBinary(
                '00000000' +
                '10011111' +
                '01000000' +
                '00000000' +
                '01000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
            board.bitboards.P = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '01110110' +
                '00000000'
            )


console.log(board.bitboardAttacks(true).debugString("\n"), "\n")
