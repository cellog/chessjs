var chess = require('./lib/board.js')
console.log(            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00010000' +
                '00000010' +
                '01000000' +
                '00000000' +
                '01000010' +
                '01000000' +
                '00010100' +
                '10000000'
            ), 'rook').debugString("\n"))
