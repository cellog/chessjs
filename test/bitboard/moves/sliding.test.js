var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Bitboard sliding piece move functions", function() {
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
    it("should have correct rook moves", function() {
        var rook = chess.bitboard.fromBinary(
            '00000001' +
            '00000000' +
            '00010000' +
            '00000000' +
            '00000010' +
            '00001000' +
            '00000000' +
            '00000000'
        ), empty = chess.bitboard.fromBinary(
            '00011110' +
            '00010001' +
            '11101011' +
            '00000011' +
            '01011000' +
            '11110111' +
            '00001011' +
            '00001011'
        )
        rook.rookMoves(empty).debugString("\n").should.eql(
            '00011110' + "\n" +
            '00010001' + "\n" +
            '11101011' + "\n" +
            '00000011' + "\n" +
            '00001000' + "\n" +
            '11110111' + "\n" +
            '00001010' + "\n" +
            '00001010'
        )
    })
    it("should have correct bishop moves", function() {
        var bishop = chess.bitboard.fromBinary(
            '00000001' +
            '00000000' +
            '00010000' +
            '00000000' +
            '00000010' +
            '00001000' +
            '00000000' +
            '00000000'
        ), empty = chess.bitboard.fromBinary(
            '01000000' +
            '10000010' +
            '01100100' +
            '00101001' +
            '01010100' +
            '00100110' +
            '01000001' +
            '10010000'
        )
        bishop.bishopMoves(empty).debugString("\n").should.eql(
            '00000000' + "\n" +
            '10000010' + "\n" +
            '01000100' + "\n" +
            '00101001' + "\n" +
            '01010100' + "\n" +
            '00100110' + "\n" +
            '01000001' + "\n" +
            '10000000'
        )
    })
    it("should have correct queen moves", function() {
        var queen = chess.bitboard.fromBinary(
            '00000001' +
            '00000000' +
            '00010000' +
            '00000000' +
            '00000010' +
            '00001000' +
            '00000000' +
            '00000000'
        ), empty = chess.bitboard.fromBinary(
            '11111110' +
            '10000011' +
            '01100101' +
            '00101001' +
            '01010100' +
            '00100110' +
            '01000001' +
            '10010000'
        )
        queen.queenMoves(empty).debugString("\n").should.eql(
            '11111110' + "\n" +
            '10000011' + "\n" +
            '01100101' + "\n" +
            '00101001' + "\n" +
            '01010100' + "\n" +
            '00100110' + "\n" +
            '01000001' + "\n" +
            '10000000'
        )
    })
    describe("attack bitboards", function() {
        describe("king", function() {
            it("should be same as king moves.  We can and it against enemy|empty later in the process", function() {
                var king = chess.bitboard.fromBinary(
            '00000000' +
            '00000000' +
            '00010000' +
            '00000000' +
            '00000000' +
            '00000000' +
            '00000000' +
            '00000000')
            king.kingAttackTargets().should.eql(king.kingMoves())
            })
        })
        describe("rook", function() {
            it("should be all the rook moves minus pieces in the way plus 1 square", function() {
                var rook = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00001001' +
                    '00000000' +
                    '00000000' +
                    '10010000'
                ).not()
                rook.rookAttackTargets(empty).debugString("\n").should.eql(
                    '11111110' + "\n" +
                    '00010011' + "\n" +
                    '11101111' + "\n" +
                    '00010011' + "\n" +
                    '00011101' + "\n" +
                    '11110111' + "\n" +
                    '00011010' + "\n" +
                    '00011010'
                )
            })
        })
        describe("bishop", function() {
            it("should be all the bishop moves minus pieces in the way plus 1 square", function() {
                var bishop = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00010000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                ).not()
                bishop.bishopAttackTargets(empty).debugString("\n").should.eql(
                    '01100100' + "\n" +
                    '00111010' + "\n" +
                    '00001101' + "\n" +
                    '00101111' + "\n" +
                    '00010100' + "\n" +
                    '00000111' + "\n" +
                    '00011101' + "\n" +
                    '00110010'
                )
            })
        })
        describe("queen", function() {
            it("should be all the queen moves minus pieces in the way plus 1 square", function() {
                var queen = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00010000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                ).not()
                queen.queenAttackTargets(empty).debugString("\n").should.eql(
                    '11111110' + "\n" +
                    '00111011' + "\n" +
                    '11101111' + "\n" +
                    '00111111' + "\n" +
                    '00011101' + "\n" +
                    '11110111' + "\n" +
                    '00011111' + "\n" +
                    '00111011'
                )
            })
        })
    }) // attack bitboards
}) // Bitboard
