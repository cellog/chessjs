var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard getConnectingRays", function() {
    it("empty bitboard should return empty", function() {
        new chess.bitboard(0,0).getConnectingRays(new chess.bitboard(0,0))
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
    it("bitboard with multiple pieces should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
                '01111000' + "\n" +
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
                '00111100' + "\n" +
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
                '01111000' + "\n" +
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
                '00111100' + "\n" +
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
            ).getConnectingRays(chess.bitboard.fromBinary(
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
        it("bishop should return a diagonal ray southeast", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000010'
            ), 'bishop').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00000100' + "\n" +
                '00000010'
            )
        })
        it("queen should return a diagonal ray southeast", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000010'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00000100' + "\n" +
                '00000010'
            )
        })
        it("bishop should return a diagonal ray southwest", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '10000000'
            ), 'bishop').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00100000' + "\n" +
                '01000000' + "\n" +
                '10000000'
            )
        })
        it("queen should return a diagonal ray southwest", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '10000000'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00100000' + "\n" +
                '01000000' + "\n" +
                '10000000'
            )
        })
        it("bishop should return a diagonal ray northwest", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'bishop').debugString("\n").should.eql(
                '00000000' + "\n" +
                '10000000' + "\n" +
                '01000000' + "\n" +
                '00100000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("queen should return a diagonal ray northwest", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
                '00000000' + "\n" +
                '10000000' + "\n" +
                '01000000' + "\n" +
                '00100000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("bishop should return a diagonal ray northeast", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000001' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'bishop').debugString("\n").should.eql(
                '00000001' + "\n" +
                '00000010' + "\n" +
                '00000100' + "\n" +
                '00001000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("queen should return a diagonal ray northeast", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000001' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
                '00000001' + "\n" +
                '00000010' + "\n" +
                '00000100' + "\n" +
                '00001000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("rook should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000001' +
                '00000000' +
                '00000000' +
                '00000000' +
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
        it("bishop with no intersection should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000010' +
                '00000000' +
                '00000000' +
                '00000000' +
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
        it("queen with no intersection should return empty", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00000010' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            ), 'queen').debugString("\n").should.eql(
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
    describe("multiple connections", function() {
        describe("asArray", function() {
            it("should return only rooks that connect", function() {
                var a = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                ).getConnectingRays(chess.bitboard.fromBinary(
                    '00010000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '01000010' +
                    '01000000' +
                    '00010100' +
                    '10000000'
                ), 'rook', true)
                a.length.should.eql(9)
                a.debugString('d8').should.eql(
                    '00010000' + "\n" +
                    '00010000' + "\n" +
                    '00010000' + "\n" +
                    '00010000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('b4').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '01100000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('g4').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00001110' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('d2').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '00010000' + "\n" +
                    '00000000'
                )
                a.debugString('g7').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('b6').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('b3').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('f2').should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
                a.debugString('a1').should.eql(
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
        it("should return only rooks that connect", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00010000' +
                '00000010' +
                '01000000' +
                '00000000' +
                '01000010' +
                '01000000' +
                '00010100' +
                '10000000'
            ), 'rook').debugString("\n").should.eql(
                '00010000' + "\n" +
                '00010000' + "\n" +
                '00010000' + "\n" +
                '00010000' + "\n" +
                '01101110' + "\n" +
                '00010000' + "\n" +
                '00010000' + "\n" +
                '00000000'
            )
        })
        it("should return only bishops that connect", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00010000' +
                '00000010' +
                '01000000' +
                '00000000' +
                '01000010' +
                '01000000' +
                '00010100' +
                '10000000'
            ), 'bishop').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000010' + "\n" +
                '01000100' + "\n" +
                '00101000' + "\n" +
                '00000000' + "\n" +
                '00101000' + "\n" +
                '01000100' + "\n" +
                '10000000'
            )
        })
        it("should return only queens that connect", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000'
            ).getConnectingRays(chess.bitboard.fromBinary(
                '00010000' +
                '00000010' +
                '01000000' +
                '00000000' +
                '01000010' +
                '01000000' +
                '00010100' +
                '10000000'
            ), 'queen').debugString("\n").should.eql(
                '00010000' + "\n" +
                '00010010' + "\n" +
                '01010100' + "\n" +
                '00111000' + "\n" +
                '01101110' + "\n" +
                '00111000' + "\n" +
                '01010100' + "\n" +
                '10000000'
            )
        })
    })
}) // Bitboard
