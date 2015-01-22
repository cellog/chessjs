var chess = require('./lib/board.js')
var myboard = new chess.board
var empty = new chess.bitboard(0,0)
myboard.bitboards.q = empty
myboard.bitboards.Q = empty
myboard.bitboards.r = empty
myboard.bitboards.R = empty
myboard.bitboards.b = empty
myboard.bitboards.B = empty
myboard.bitboards.q = empty
myboard.bitboards.Q = empty
myboard.bitboards.P = chess.bitboard.fromBinary(
    '00000000' +
    '00000100' +
    '00000000' +
    '00000000' +
    '10000000' +
    '00000000' +
    '01110010' +
    '00000000'
)
myboard.bitboards.p = chess.bitboard.fromBinary(
    '00000000' +
    '01110010' +
    '00000000' +
    '10000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000'
)
myboard.bitboards.k = chess.bitboard.fromBinary(
    '00001000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000'
)
myboard.bitboards.K = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '01000000' +
    '00000000' +
    '00000000' +
    '00000000'
)
myboard.bitboards.n = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00010011' +
    '00000000' +
    '00000000'
)
myboard.bitboards.N = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '11000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000'
)

console.log(myboard.blackpieces.debugString("\n"),"\n")
console.log(myboard.whitepieces.debugString("\n"),"\n")
console.log(myboard.getLegalMoves(0, "pawn", false).debugString("\n"))