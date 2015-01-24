var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard bitboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

    describe("all possible attacks", function() {
        it("calculate white", function() {
            board = new chess.board
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
            board.bitboardAttacks(true).debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000001' + "\n" +
                    '11000001' + "\n" +
                    '01000001' + "\n" +
                    '10100011' + "\n" +
                    '10110101' + "\n" +
                    '10001001' + "\n" +
                    '00000000'
            )
        })
        it("calculate black", function() {
            board = new chess.board
            board.bitboards.P = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000' +
                '01000000' +
                '10011111' +
                '00000000'
            )
            board.bitboards.p = chess.bitboard.fromBinary(
                '00000000' +
                '01110110' +
                '00000000' +
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
            board.bitboardAttacks(false).debugString("\n").should.eql(
                '00000000' + "\n" +
                '10001001' + "\n" +
                '10110101' + "\n" +
                '10100011' + "\n" +
                '01000001' + "\n" +
                '11000001' + "\n" +
                '00000001' + "\n" +
                '00000000'
            )
        })
    })
})
