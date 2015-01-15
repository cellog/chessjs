var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard testing for king checks", function() {

    describe("inCheck", function() {
        var king = chess.bitboard.fromBinary(
            '00000000' +
            '00000000' +
            '00000000' +
            '00000000' +
            '00010000' +
            '00000000' +
            '00000000' +
            '00000000'
        ), empty = new chess.bitboard(0,0)
        describe("pawns", function() {
            it("should handle white pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                ), checkingpawn = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, true).should.eql({
                    pawn: checkingpawn
                })
            })
            it("should handle black pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, false).should.eql({
                    pawn: p
                })
            })
            it("should handle invalid white pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00100010' +
                    '00000000' +
                    '00100000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, true).should.be.false
            })
            it("should handle invalid black pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00100010' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, false).should.be.false
            })
        })
        describe("rook", function() {
            it("should handle rook checks vertically", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000'
                )
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, true).should.eql({
                    rook: r
                })
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, false).should.eql({
                    rook: r
                })
            })
            it("should handle rook checks horizontally", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, true).should.eql({
                    rook: r
                })
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, false).should.eql({
                    rook: r
                })
            })
            it("should handle invalid rook checks", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000'
                )
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, true).should.be.false
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, false).should.be.false
            })
        })
        describe("bishop", function() {
            it("should handle bishop checks", function() {
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '01000100' +
                    '00000000'
                )
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, true).should.eql({
                    bishop: b
                })
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, false).should.eql({
                    bishop: b
                })
            })
            it("should handle invalid bishop checks", function() {
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '01000000' +
                    '00000010' +
                    '00000000' +
                    '00000000' +
                    '01000000' +
                    '00000000' +
                    '00000100'
                )
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, true).should.be.false
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, false).should.be.false
            })
        })
        describe("knight", function() {
            it("should handle knight checks", function() {
                var n = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00101000' +
                    '01000100' +
                    '00000000' +
                    '01000100' +
                    '00101000' +
                    '00000000'
                )
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, true).should.eql({
                    knight: n
                })
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, false).should.eql({
                    knight: n
                })
            })
            it("should handle invalid knight checks", function() {
                var n = chess.bitboard.fromBinary(
                    '00000000' +
                    '00101000' +
                    '01000100' +
                    '00000000' +
                    '01000100' +
                    '00101000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, true).should.be.false
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, false).should.be.false
            })
        })
        describe("queen", function() {
            it("should handle queen checks", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '00000000'
                )
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '01000100' +
                    '00000000'
                ),q=r.orB(b)
                king.inCheck(king.orB(b).not(), empty, empty, empty, empty, q, true).should.eql({
                    queen: q
                })
                king.inCheck(king.orB(b).not(), empty, empty, empty, empty, q, false).should.eql({
                    queen: q
                })
            })
            it("should handle invalid queen checks", function() {
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '01000000' +
                    '00000010' +
                    '00000000' +
                    '00000000' +
                    '01000000' +
                    '00000000' +
                    '00000100'
                )
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '01000000'
                ),q=r.orB(b)
                king.inCheck(king.orB(q).not(), empty, empty, empty, empty, q, true).should.be.false
                king.inCheck(king.orB(q).not(), empty, empty, empty, empty, q, false).should.be.false
            })
        })
        describe("multiple checks (theoretical)", function() {
            it("should return every valid check", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '00000000'
                )
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '01000100' +
                    '00000000'
                ),q=r.orB(b),
                n = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00101000' +
                    '01000100' +
                    '00000000' +
                    '01000100' +
                    '00101000' +
                    '00000000'
                ),P = chess.bitboard.fromBinary(
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00100000' +
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00000000'
                ),p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(b).not(), P, r, n, b, q, true).should.eql({
                    pawn: P,
                    knight: n,
                    rook: r,
                    bishop: b,
                    queen: q
                })
                king.inCheck(king.orB(b).not(), p, r, n, b, q, false).should.eql({
                    pawn: p,
                    knight: n,
                    rook: r,
                    bishop: b,
                    queen: q
                })
            }) // multiple checks
        })
    }) // inCheck
}) // Bitboard
