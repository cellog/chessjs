var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard constants", function() {
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

    describe("constants", function() {
        it("notAFile", function() {
            var c = new chess.bitboard()
            c.notAFile.should.eql(0x7f7f7f7f)
            new chess.bitboard(c.notAFile, c.notAFile)
                .debugString("\n").should.eql(
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111'
                )
        })
        it("notHFile", function() {
            var c = new chess.bitboard()
            c.notHFile.should.eql(0xfefefefe>>>0)
            new chess.bitboard(c.notHFile, c.notHFile)
                .debugString("\n").should.eql(
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110'
                )
        })
        it("notABFile", function() {
            var c = new chess.bitboard()
            c.notABFile.should.eql(0x3f3f3f3f)
            new chess.bitboard(c.notABFile, c.notABFile)
                .debugString("\n").should.eql(
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111'
                )
        })
        it("notGHFile", function() {
            var c = new chess.bitboard()
            c.notGHFile.should.eql(0xfcfcfcfc>>>0)
            new chess.bitboard(c.notGHFile, c.notGHFile)
                .debugString("\n").should.eql(
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100'
                )
        })
        it("rank4", function() {
            var c = new chess.bitboard()
            c.rank4.should.eql({l: 0, h: 0xff,piece: 'X'})
            c.rank4
                .debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
        })
        it("rank5", function() {
            var c = new chess.bitboard()
            c.rank5.should.eql({l: 0xff000000>>>0, h: 0, piece: 'X'})
            c.rank5
                .debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
        })
    })
}) // Bitboard
