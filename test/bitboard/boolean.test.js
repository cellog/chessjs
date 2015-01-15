var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard boolean functions", function() {
    var myboard, bitboard = chess.bitboard.fromBinary(
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

    describe("and", function() {
        it("should combine only 1s", function() {
            bitboard.and(0xff000000).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000010' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
    })

    describe("or", function() {
        it("should combine a value with a bitboard", function() {
            bitboard.or(0xff).debugString("\n").should.eql(
                '11111111' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000010' + "\n" +
                '11111111' + "\n" +
                '00010000' + "\n" +
                '01100000' + "\n" +
                '00000000'
            )
        })
    })

    describe("xor", function() {
        it("should combine a value with a bitboard", function() {
            bitboard.xor(0xff << 16).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '11111011' + "\n" +
                '00000010' + "\n" +
                '00000000' + "\n" +
                '00010000' + "\n" +
                '10011111' + "\n" +
                '00000000'
            )
        })
    })

    describe("shl", function() {
        it("should move the board down for shift < 32", function() {
            bitboard.shl(8).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000010' + "\n" +
                '00000000' + "\n" +
                '00010000' + "\n" +
                '01100000'
            )
        })
    })

    describe("shr", function() {
        it("should move the board up for shift < 32", function() {
            bitboard.shr(8).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000010' + "\n" +
                '00000000' + "\n" +
                '00010000' + "\n" +
                '01100000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
    })

    describe("BIGshl", function() {
        it("should move the board down for shift >= 32", function() {
            bitboard.BIGshl(33).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00000100'
            )
        })
    })

    describe("BIGshr", function() {
        it("should move the board up for shift >= 32", function() {
            bitboard.BIGshr(33).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00110000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
    })

    describe("not", function() {
        it("should reverse every bit in the board", function() {
            bitboard.not().debugString("\n").should.eql(
                '11111111' + "\n" +
                '11111111' + "\n" +
                '11111011' + "\n" +
                '11111101' + "\n" +
                '11111111' + "\n" +
                '11101111' + "\n" +
                '10011111' + "\n" +
                '11111111'
            )
        })
    })

    describe("orB", function() {
        it("should combine two bitboards", function() {
            bitboard.orB(chess.bitboard.fromBinary(
                '11111111' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )).debugString("\n").should.eql(
                '11111111' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000010' + "\n" +
                '00000000' + "\n" +
                '00010000' + "\n" +
                '01100000' + "\n" +
                '00000000'
            )
        })
    })

    describe("xorB", function() {
        it("should xor the contents of two bitboards", function() {
            bitboard.xorB(chess.bitboard.fromBinary(
                '11111111' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )).debugString("\n").should.eql(
                '11111111' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000010' + "\n" +
                '00000000' + "\n" +
                '00010000' + "\n" +
                '01100000' + "\n" +
                '00000000'
            )
        })
    })

    describe("existence tests", function() {
        it("should report any bitboard with pieces as not empty", function() {
            new chess.bitboard(0x1,0).isEmpty().should.be.false
            new chess.bitboard(0,0x1).isEmpty().should.be.false
            new chess.bitboard(0x1,0).isNotEmpty().should.be.true
            new chess.bitboard(0,0x1).isNotEmpty().should.be.true
        })
        it("should report any bitboard with no pieces as empty", function() {
            new chess.bitboard(0,0).isEmpty().should.be.true
            new chess.bitboard(0,0).isNotEmpty().should.be.false
        })
    })

}) // Bitboard
