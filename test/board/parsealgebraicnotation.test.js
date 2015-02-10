var should = require("should"),
    chess = require("../../lib/board.js"),
    vector = require("../../lib/vector.js").vector

describe("Chessboard parseAlgebraicNotation", function() {
    var myboard = new chess.board;

    describe("invalid notation", function() {
        it("Ta4", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Ta4')
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"Ta4" is not valid algebraic notation', name: "InvalidMoveError"})
        })
        it("Qxy4", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qxy4')
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"Qxy4" is not valid algebraic notation', name: "InvalidMoveError"})
        })
        it("Qxa14", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qxa14')
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"Qxa14" is not valid algebraic notation', name: "InvalidMoveError"})
        })
        it("Qabc3", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qabc3')
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"Qabc3" is not valid algebraic notation', name: "InvalidMoveError"})
        })
        it("abxc4", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'abxc4')
                .should.throwError(chess.InvalidMoveError,
                                   {message: '"abxc4" is not valid algebraic notation', name: "InvalidMoveError"})
        })
    })
    describe("pawn notation", function() {
        before(function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '........' +
                '....pP..' +
                '...P.P..' +
                '........' +
                '.P......' +
                '........'
            )
        })
        after(function() {
            myboard = new chess.board
        })
        it("b3", function() {
            myboard.parseAlgebraicNotation('b3').should.eql(['b2', 'b3'])
        })
        it("b4", function() {
            myboard.parseAlgebraicNotation('b4').should.eql(['b2', 'b4'])
        })
        it("d4xe5", function() {
            myboard.parseAlgebraicNotation('d4xe5').should.eql(['d4', 'e5'])
        })
        it("e5xd4", function() {
            myboard.blackToMove()
            myboard.parseAlgebraicNotation('e5xd4').should.eql(['e5', 'd4'])
            myboard.whiteToMove()
        })
        it("f4xe5", function() {
            myboard.parseAlgebraicNotation('f4xe5').should.eql(['f4', 'e5'])
        })
        it("f6", function() {
            myboard.parseAlgebraicNotation('f6').should.eql(['f5', 'f6'])
        })
        it("fxe5", function() {
            myboard.parseAlgebraicNotation('fxe5').should.eql(['f4', 'e5'])
        })
        it("dxe5", function() {
            myboard.parseAlgebraicNotation('dxe5').should.eql(['d4', 'e5'])
        })
        it("invalid: f5", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'f5').should.throwError(chess.InvalidMoveError,
                                   {message: '"f5" is not possible, there is a piece on that square', name: "InvalidMoveError"})
        })
        it("invalid: f7", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'f7').should.throwError(chess.InvalidMoveError,
                                   {message: '"f7" attempts to move non-existent piece', name: "InvalidMoveError"})
        })
        it("invalid: bxc3", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'bxc3').should.throwError(chess.InvalidMoveError,
                                   {message: 'Pawn capture at "c3" is impossible, no enemy piece on that square', name: "InvalidMoveError"})
        })
        it("invalid: hxg3", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'hxg3').should.throwError(chess.InvalidMoveError,
                                   {message: 'Pawn capture at "g3" is impossible, no enemy piece on that square', name: "InvalidMoveError"})
        })
    })
    describe("queen notation", function() {
        before(function() {
            myboard = chess.board.fromTextBoard(
                'Q...QQ..' +
                '....p...' +
                'p.......' +
                'Q.......' +
                '......p.' +
                '........' +
                '....Q...' +
                '........'
            )
        })
        after(function() {
            myboard = new chess.board
        })
        it("Qe4", function() {
            myboard.parseAlgebraicNotation('Qe6').should.eql(['e2', 'e6'])
        })
        it("Qd1", function() {
            myboard.parseAlgebraicNotation('Qd1').should.eql(['e2', 'd1'])
        })
        it("Qc2", function() {
            myboard.parseAlgebraicNotation('Qc2').should.eql(['e2', 'c2'])
        })
        it("Qh2", function() {
            myboard.parseAlgebraicNotation('Qh2').should.eql(['e2', 'h2'])
        })
        it("Qxg4", function() {
            myboard.parseAlgebraicNotation('Qxg4').should.eql(['e2', 'g4'])
        })
        it("Qe2xa6", function() {
            myboard.parseAlgebraicNotation('Qe2xa6').should.eql(['e2', 'a6'])
        })
        it("Qfxe7", function() {
            myboard.parseAlgebraicNotation('Qfxe7').should.eql(['f8', 'e7'])
        })
        it("Q5xa6", function() {
            myboard.parseAlgebraicNotation('Q5xa6').should.eql(['a5', 'a6'])
        })
        it("Q8xa6", function() {
            myboard.parseAlgebraicNotation('Q8xa6').should.eql(['a8', 'a6'])
        })
        it("invalid: Q8xb5", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Q8xb5')
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Queens cannot move to "b5"', name: "InvalidMoveError"})
        })
        it("invalid: Qb5", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qb5')
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many queens can move to "b5", need more disambiguation than "Qb5"', name: "InvalidMoveError"})
        })
        it("invalid: Qe8", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qe8')
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Queens cannot move to "e8"', name: "InvalidMoveError"})
        })
        it("invalid: Qxe3", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qxe3')
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Queens cannot move to "e3"', name: "InvalidMoveError"})
        })
        it("invalid: Qxd7", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qxd7')
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Queens cannot move to "d7"', name: "InvalidMoveError"})
        })
        it("invalid: Qa1xa3", function() {
            myboard.parseAlgebraicNotation.bind(myboard, 'Qa1xa3')
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'No queen exists on "a1"', name: "InvalidMoveError"})
        })
    })
})
