var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard bitboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });
    describe.only("getPotentialKingMoves", function() {
        var myboard
        it("should return a full circle if no obstructions or checks", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '........' +
                '...k....' +
                '........' +
                '........' +
                '....K...' +
                '........'
            )
            myboard.getPotentialKingMoves().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00011100' + "\n" +
                '00010100' + "\n" +
                '00011100'
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
                '00000000'
            )
        })
        it.skip("should account for pawn checks", function() {
        })
        it.skip("should account for knight checks", function() {
        })
        it.skip("should account for bishop checks", function() {
        })
        it.skip("should account for rook checks", function() {
        })
        it.skip("should account for queen checks", function() {
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
