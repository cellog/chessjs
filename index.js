var chess = require('./lib/board.js')
var myboard = new chess.board
var empty = new chess.bitboard(0,0)
myboard.bitboards.q = empty
myboard.bitboards.r = empty
myboard.bitboards.n = empty
myboard.bitboards.N = empty
myboard.bitboards.b = empty
myboard.bitboards.B = empty
myboard.bitboards.q = empty
myboard.bitboards.R = empty
myboard.bitboards.P = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00010100' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000'
)
myboard.bitboards.b = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00001000' +
    '00000000' +
    '00000000'
)
myboard.bitboards.r = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '01000000' +
    '00000000'
)
myboard.bitboards.N = chess.bitboard.fromBinary(
    '00000000' +
    '01000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000'
)
myboard.bitboards.p = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00000000' +
    '00000000' +
    '00000010' +
    '00000100' +
    '00000000' +
    '00000000'
)
myboard.bitboards.k = chess.bitboard.fromBinary(
    '00000000' +
    '00000000' +
    '00010000' +
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
    '00000000' +
    '00000000' +
    '00001000' +
    '00000000'
)
console.log(myboard.blackpieces.debugString("\n"),"\n")
console.log(myboard.whitepieces.debugString("\n"),"\n")
//console.log("attacking\n",myboard.bitboards.black[0].pawnAttackTargets(false).debugString("\n"),"\n")
//myboard.blackToMove()
console.log(myboard.getLegalMoves(5, "king", true).debugString("\n"))