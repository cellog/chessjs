var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard shift functions", function() {
    var bitboard = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
                );
    describe("bitboard shift", function() {
        it("north one square", function() {
            bitboard.northOne().debugString("\n").should.eql(
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
        it("south one square", function() {
            bitboard.southOne().debugString("\n").should.eql(
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
        it("east one square", function() {
            bitboard.eastOne().debugString("\n").should.eql(
            '00000000' + "\n" +
            '00000000' + "\n" +
            '00000010' + "\n" +
            '00000001' + "\n" +
            '00000000' + "\n" +
            '00001000' + "\n" +
            '00110000' + "\n" +
            '00000000'
            )
        })
        it("northeast one square", function() {
            bitboard.northeastOne().debugString("\n").should.eql(
            '00000000' + "\n" +
            '00000010' + "\n" +
            '00000001' + "\n" +
            '00000000' + "\n" +
            '00001000' + "\n" +
            '00110000' + "\n" +
            '00000000' + "\n" +
            '00000000'
            )
        })
        it("southeast one square", function() {
            bitboard.southeastOne().debugString("\n").should.eql(
            '00000000' + "\n" +
            '00000000' + "\n" +
            '00000000' + "\n" +
            '00000010' + "\n" +
            '00000001' + "\n" +
            '00000000' + "\n" +
            '00001000' + "\n" +
            '00110000'
            )
        })
        it("west one square", function() {
            bitboard.westOne().debugString("\n").should.eql(
            '00000000' + "\n" +
            '00000000' + "\n" +
            '00001000' + "\n" +
            '00000100' + "\n" +
            '00000000' + "\n" +
            '00100000' + "\n" +
            '11000000' + "\n" +
            '00000000'
            )
        })
        it("southwest one square", function() {
            bitboard.southwestOne().debugString("\n").should.eql(
            '00000000' + "\n" +
            '00000000' + "\n" +
            '00000000' + "\n" +
            '00001000' + "\n" +
            '00000100' + "\n" +
            '00000000' + "\n" +
            '00100000' + "\n" +
            '11000000'
            )
        })
        it("northwest one square", function() {
            bitboard.northwestOne().debugString("\n").should.eql(
            '00000000' + "\n" +
            '00001000' + "\n" +
            '00000100' + "\n" +
            '00000000' + "\n" +
            '00100000' + "\n" +
            '11000000' + "\n" +
            '00000000' + "\n" +
            '00000000'
            )
        })
            })
}) // Bitboard
