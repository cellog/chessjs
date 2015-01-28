var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard detectStartingSquare", function() {
    var myboard, unused = new chess.bitboard(0,0);
    
    describe("invalid moves", function() {
        beforeEach(function() {
            myboard = new chess.board
        })
        it("should fail on axc4", function() {
            myboard.detectStartingSquare.bind(myboard, 'axc4', unused, unused, "c4", 0, "a", true)
                .should.throwError(chess.InvalidMoveError, {message: 'Pawn capture move must be an adjacent file to "c4", not "a"', name: "InvalidMoveError"})
        })
        it("should fail on bxc4", function() {
            myboard.detectStartingSquare.bind(myboard, 'bxc4', unused, unused, "c4", 0, "b", true)
                .should.throwError(chess.InvalidMoveError, {message: 'Pawn capture from "b3" to "c4" is impossible, no pawn on "b3"', name: "InvalidMoveError"})
        })
        it("should fail on e5", function() {
            myboard.detectStartingSquare.bind(myboard, 'e5', unused, unused, "e5", 0, false, false)
                .should.throwError(chess.InvalidMoveError, {message: '"e5" attempts to move non-existent piece', name: "InvalidMoveError"})
        })
    })
    describe("pawn", function() {
    })
    describe("rook", function() {
    })
    describe("bishop", function() {
    })
    describe("knight", function() {
    })
    describe("queen", function() {
    })
    describe("king", function() {
    })
})
