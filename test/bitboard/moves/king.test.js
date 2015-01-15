var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Bitboard knight move functions", function() {
    var bitboard = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
                ), emptyboard = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '11111111' +
                    '11111111' +
                    '11111111' +
                    '11111111' +
                    '00000000' +
                    '00000000'
                );
    it("should have correct corners", function() {
        chess.bitboard.fromBinary(
                '10000001' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '10000001'
            ).kingMoves().debugString("\n").should.eql(
                '01000010' + "\n" +
                '11000011' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '11000011' + "\n" +
                '01000010'
            )
    })
    it("should have correct sides", function() {
        chess.bitboard.fromBinary(
                '00001000' +
                '00000000' +
                '00000000' +
                '10000000' +
                '00000001' +
                '00000000' +
                '00000000' +
                '00010000'
            ).kingMoves().debugString("\n").should.eql(
                '00010100' + "\n" +
                '00011100' + "\n" +
                '11000000' + "\n" +
                '01000011' + "\n" +
                '11000010' + "\n" +
                '00000011' + "\n" +
                '00111000' + "\n" +
                '00101000'
            )
    })
    it("should have correct centers", function() {
        chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00001000' +
                '00000000' +
                '00000000'
            ).kingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00111000' + "\n" +
                '00101000' + "\n" +
                '00111000' + "\n" +
                '00011100' + "\n" +
                '00010100' + "\n" +
                '00011100' + "\n" +
                '00000000'
            )
    })
}) // Bitboard
