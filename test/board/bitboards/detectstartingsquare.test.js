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
        beforeEach(function() {
            myboard = chess.board.fromTextBoard(
                '...R....' +
                '........' +
                '.R...p..' +
                '........' +
                '........' +
                '........' +
                '...R....' +
                '........' +
                '........'
            )
        })
        it("should error on Rg6", function() {
            myboard.detectStartingSquare.bind(myboard, 'Rg6', myboard.bitboards.R, myboard.getLegalMoves(1, 'rook', false), 'g6',
                                              1, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Rooks cannot move to "g6"', name: "InvalidMoveError"})
        })
        it("should return b6 for Rxf6", function() {
            myboard.detectStartingSquare('Rxf6', myboard.bitboards.R, myboard.getLegalMoves(1, 'rook', true), 'f6',
                                              1, false, true)
                .should.eql('b6')
        })
        it("should error on Rd6", function() {
            myboard.detectStartingSquare.bind(myboard, 'Rd6', myboard.bitboards.R, myboard.getLegalMoves(1, 'rook', false), 'd6',
                                              1, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many rooks can move to "d6", need more disambiguation than "' +
                                              'Rd6"', name: "InvalidMoveError"})
        })
        it("should error on Rdd6", function() {
            myboard.detectStartingSquare.bind(myboard, 'Rdd6', myboard.bitboards.R, myboard.getLegalMoves(1, 'rook', false), 'd6',
                                              1, 'd', false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many rooks can move to "d6", need more disambiguation than "' +
                                              'd"', name: "InvalidMoveError"})
        })
    })
    describe("knight", function() {
        beforeEach(function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '..N.....' +
                '........' +
                '.....p..' +
                '........' +
                '..N.N...' +
                '........' +
                '........'
            )
        })
        it("should error on Nf5", function() {
            myboard.detectStartingSquare.bind(myboard, 'f5', myboard.bitboards.N, myboard.getLegalMoves(2, 'knight', false), 'f5',
                                              2, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Knights cannot move to "f5" from "c7, e3, c3"', name: "InvalidMoveError"})
        })
        it("should return e3 for Nxf5", function() {
            myboard.detectStartingSquare('Nxf5', myboard.bitboards.N, myboard.getLegalMoves(2, 'knight', true), 'f5',
                                              2, false, true)
                .should.eql('e3')
        })
        it("should error on Nd5", function() {
            myboard.detectStartingSquare.bind(myboard, 'Nd5', myboard.bitboards.N, myboard.getLegalMoves(2, 'knight', false), 'd5',
                                              2, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many knights can move to "d5", need more disambiguation than "' +
                                              'Nd5"', name: "InvalidMoveError"})
        })
        it("should error on Ncd5", function() {
            myboard.detectStartingSquare.bind(myboard, 'Ncd5', myboard.bitboards.N, myboard.getLegalMoves(2, 'knight', false), 'd5',
                                              2, 'c', false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many knights can move to "d5", need more disambiguation than "' +
                                              'c"', name: "InvalidMoveError"})
        })
        it("should error on N3d5", function() {
            myboard.detectStartingSquare.bind(myboard, 'N3d5', myboard.bitboards.N, myboard.getLegalMoves(2, 'knight', false), 'd5',
                                              2, '3', false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many knights can move to "d5", need more disambiguation than "' +
                                              '3"', name: "InvalidMoveError"})
        })
    })
    describe("queen", function() {
        beforeEach(function() {
            myboard = chess.board.fromTextBoard(
                '..Q...Q.' +
                '........' +
                '.Q...p..' +
                '........' +
                '........' +
                '........' +
                '..Q.....' +
                '........'
            )
        })
        it("should error on Qh6", function() {
            myboard.detectStartingSquare.bind(myboard, 'Qh6', myboard.bitboards.Q, myboard.getLegalMoves(4, 'queen', false), 'h6',
                                              4, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Queens cannot move to "h6"', name: "InvalidMoveError"})
        })
        it("should return b6 for Qxf6", function() {
            myboard.detectStartingSquare('Qxf6', myboard.bitboards.Q, myboard.getLegalMoves(4, 'queen', true), 'f6',
                                              4, false, true)
                .should.eql('b6')
        })
        it("should error on Qg6", function() {
            myboard.detectStartingSquare.bind(myboard, 'Qg6', myboard.bitboards.Q, myboard.getLegalMoves(4, 'queen', false), 'g6',
                                              4, false, false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many queens can move to "g6", need more disambiguation than "' +
                                              'Qg6"', name: "InvalidMoveError"})
        })
        it("should return c3 on Qcg6", function() {
            myboard.detectStartingSquare('Qcg6', myboard.bitboards.Q, myboard.getLegalMoves(4, 'queen', false), 'g6',
                                              4, 'c', false)
                .should.eql('c2')
        })
        it("should error on Qcc6", function() {
            myboard.detectStartingSquare.bind(myboard, 'Qcc6', myboard.bitboards.Q, myboard.getLegalMoves(4, 'queen', false), 'c6',
                                              4, 'c', false)
                .should.throwError(chess.InvalidMoveError,
                                   {message: 'Too many queens can move to "c6", need more disambiguation than "' +
                                              'c"', name: "InvalidMoveError"})
        })
    })
    describe("king", function() {
    })
})
