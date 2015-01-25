var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard bitboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });
    describe("getPotentialKingMoves", function() {
        var myboard
        it("should return a full circle if no obstructions or checks", function() {
            myboard = chess.board.fromTextBoard(
                'N.......' +
                '.....R.Q' +
                '........' +
                '...k.p.B' +
                '.r......' +
                'P.......' +
                '....K..b' +
                'n.......'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00011100' + "\n" +
                '00010100' + "\n" +
                '00011100', 'white to move'
            )
            myboard.blackToMove()
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00111000' + "\n" +
                '00101000' + "\n" +
                '00111000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000', 'black to move'
            )
        })
        it("should account for pawn checks", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '...k....' +
                '..P.P...' +
                '.P..P..p' +
                '....p...' +
                '.....K..' +
                '........'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001100' + "\n" +
                '00001010' + "\n" +
                '00001110', 'white to move'
            )
            myboard.blackToMove()
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00111000' + "\n" +
                '00101000' + "\n" +
                '00001000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000', 'black to move'
            )
        })
        it("should account for knight checks", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '...k....' +
                '...N..n.' +
                '.....N..' +
                '........' +
                '....nK..' +
                '..n.....'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00000010' + "\n" +
                '00001100', 'white to move'
            )
            myboard.blackToMove()
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00010000' + "\n" +
                '00100000' + "\n" +
                '00101000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000', 'black to move'
            )
        })
        it("should account for bishop checks", function() {
            myboard = chess.board.fromTextBoard(
                '....B...' +
                '........' +
                '...k....' +
                '....B...' +
                '........' +
                '....b...' +
                '.....K..' +
                '........'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001110' + "\n" +
                '00001010' + "\n" +
                '00001100', 'white to move'
            )
            myboard.blackToMove()
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00001000' + "\n" +
                '00111000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000', 'black to move'
            )
        })
        it("should account for rook checks", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '...P....' +
                '...k....' +
                '...R....' +
                '........' +
                '....r...' +
                '.....K..' +
                '........'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00000010' + "\n" +
                '00000110', 'white to move'
            )
            myboard.blackToMove()
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00101000' + "\n" +
                '00101000' + "\n" +
                '00010000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000', 'black to move'
            )
        })
        it("should account for queen checks", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '....P...' +
                '...k....' +
                '..Q.....' +
                '........' +
                '...q....' +
                '.....K..' +
                '........'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000010' + "\n" +
                '00001010', 'white to move'
            )
            myboard.blackToMove()
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00010000' + "\n" +
                '00001000' + "\n" +
                '00100000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000', 'black to move'
            )
        })
        it("should account for the buffer around the enemy king", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '........' +
                '...k....' +
                '........' +
                '....K...' +
                '........' +
                '........'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00010100' + "\n" +
                '00011100' + "\n" +
                '00000000'
            )
        })
    })
})
