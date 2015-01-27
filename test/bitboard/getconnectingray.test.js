var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard getConnectingRay", function() {
    it("empty bitboard should return empty", function() {
        new chess.bitboard(0,0).getConnectingRay(new chess.bitboard(0,0))
            .debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
    })
    describe("horizontal intersections", function() {
        it("rook should return a horizontal ray", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000'
            ), 'rook').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00111100' + "\n" +
                '00000000'
            )
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ), 'rook').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '01111000' + "\n" +
                '00000000'
            )
        })
        it("queen should return a horizontal ray", function() {
chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00111100' + "\n" +
                '00000000'
            )
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '01111000' + "\n" +
                '00000000'
            )
        })
        it("bishop should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000'
            ), 'bishop').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("rook with no intersection should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000010' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'rook').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("queen with no intersection should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'rook').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
    })
    describe("vertical intersections", function() {
        it("rook should return a vertical ray", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'rook').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
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
                '00000100' +
                '00000000'
            ), 'rook').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000000'
            )
        })
        it("queen should return a vertical ray", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
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
                '00000100' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000100' + "\n" +
                '00000000'
            )
        })
        it("bishop should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRay(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'bishop').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
    })
    describe("diagonal intersections", function() {
        it("bishop should return a diagonal ray southeast")
        it("queen should return a diagonal ray southeast")
        it("bishop should return a diagonal ray southwest")
        it("queen should return a diagonal ray southwest")
        it("bishop should return a diagonal ray northwest")
        it("queen should return a diagonal ray northwest")
        it("bishop should return a diagonal ray northeast")
        it("queen should return a diagonal ray northeast")
        it("rook should return empty")
        it("bishop with no intersection should return empty")
        it("queen with no intersection should return empty")
    })
}) // Bitboard
