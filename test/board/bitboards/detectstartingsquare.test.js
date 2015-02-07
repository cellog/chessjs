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
        it("should fail on Pxc5", function() {
            myboard.detectStartingSquare.bind(myboard, 'Pxc5', unused, unused, "c5", 0, false, true)
                .should.throwError(chess.InvalidMoveError, {message: "Pawn capture move must be a file (a-h) or square", name: "InvalidMoveError"})
        })
        it("should fail on dxc5", function() {
            myboard.detectStartingSquare.bind(myboard, 'dxc5', unused, unused, "c5", 0, 'd', true)
                .should.throwError(chess.InvalidMoveError, {message: 'Pawn capture from "d4" to "c5" is impossible, no pawn on "d4"', name: "InvalidMoveError"})
        })
    })
    describe("pawn", function() {
        beforeEach(function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '.p......' +
                '........' +
                '...p.p..' +
                '..P.P.P.' +
                '........' +
                '.P......' +
                '........'
            )
        })
        it("should return e4 for exd5", function() {
            myboard.detectStartingSquare('exd5', myboard.bitboards.P, unused, 'd5', 0, 'e', true).should.eql('e4')
        })
        it("should return d5 for dxe4 black", function() {
            myboard.blackToMove()
            myboard.detectStartingSquare('dxe4', myboard.bitboards.p, unused, 'e4', 0, 'd', true).should.eql('d5')
        })
        it("should return b2 for b4", function() {
            myboard.detectStartingSquare('b4', myboard.bitboards.P, unused, 'b4', 0, false, false).should.eql('b2')
        })
        it("should return b7 for b5", function() {
            myboard.blackToMove()
            myboard.detectStartingSquare('b5', myboard.bitboards.p, unused, 'b5', 0, false, false).should.eql('b7')
        })
        it("should return b2 for b3", function() {
            myboard.detectStartingSquare('b3', myboard.bitboards.P, unused, 'b3', 0, false, false).should.eql('b2')
        })
        it("should fail on c6", function() {
            myboard.detectStartingSquare.bind(myboard, 'c6', myboard.bitboards.P, unused, "c6", 0, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"c6" attempts to move non-existent piece', name: "InvalidMoveError"})
        })
        it("should fail on d3", function() {
            myboard.blackToMove()
            myboard.detectStartingSquare.bind(myboard, 'c6', myboard.bitboards.p, unused, "c6", 0, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"c6" attempts to move non-existent piece', name: "InvalidMoveError"})
        })
        it("should fail on d4", function() {
            myboard.detectStartingSquare.bind(myboard, 'd4', myboard.bitboards.P, unused, "d4", 0, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"d4" attempts to move non-existent piece', name: "InvalidMoveError"})
        })
    })
    describe("bishop", function() {
        beforeEach(function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '.B......' +
                '.....p..' +
                '........' +
                '........' +
                '.BB..B..' +
                '........' +
                '........'
            )
        })
        it("should error on Bg7", function() {
            myboard.detectStartingSquare.bind(myboard, 'Bg7', myboard.bitboards.B, myboard.getLegalMoves(3, 'bishop', false), 'g7',
                                              3, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Bishops cannot move to "g7"', name: "InvalidMoveError"})
        })
        it("should return c3 for Bxe6", function() {
            myboard.detectStartingSquare('Bxe6', myboard.bitboards.B, myboard.getLegalMoves(3, 'bishop', true), 'f6',
                                              3, false, true)
                .should.eql('c3')
        })
        it("should error on Bd5", function() {
            myboard.detectStartingSquare.bind(myboard, 'Bd5', myboard.bitboards.B, myboard.getLegalMoves(3, 'bishop', false), 'd5',
                                              3, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many bishops can move to "d5", need more disambiguation than "' +
                                              'Bd5"', name: "InvalidMoveError"})
        })
        it("should error on Bbd5", function() {
            myboard.detectStartingSquare.bind(myboard, 'Bbd5', myboard.bitboards.B, myboard.getLegalMoves(3, 'bishop', false), 'd5',
                                              3, 'b', false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many bishops can move to "d5", need more disambiguation than "' +
                                              'b"', name: "InvalidMoveError"})
        })
    })
    describe("rook", function() {
    })
    describe("knight", function() {
    })
    describe("queen", function() {
    })
    describe("king", function() {
    })
})
