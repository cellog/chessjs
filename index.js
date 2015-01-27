var chess = require('./lib/board.js')
console.log(chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00010000' +
    '00000000' +
    '00000000' +
    '00000000'
).getConnectingRay(chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000010'
), 'bishop').debugString("\n"))
