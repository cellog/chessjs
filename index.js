var chess = require('./lib/board.js'),
    Vector = chess.vector
var a = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00010000' +
                '00000010' +
                '01000000' +
                '00000000' +
                '01000010' +
                '01000000' +
                '00010100' +
                '10000000'
            ), 'queen', true)
            a.debugString.bind(a, "oops").call()