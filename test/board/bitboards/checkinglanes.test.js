var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard bitboard", function() {
    var myboard;
    
    describe("checking lanes", function() {
        var myboard
        it("should be empty when king is not in check", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '...r....' +
                '........' +
                '........' +
                '........' +
                '....K...' +
                '........' +
                '........'
            )
            myboard.getCheckingLanes().debugString("\n").should.eql(
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
        describe("simple case: knight and pawn checks should return the location of the checking pieces", function() {
            it("pawn checks")
            it("knight checks")
        })
        it("rook checks should return the rook lanes", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '...r....' +
                '........' +
                '........' +
                '........' +
                '...K....' +
                '........' +
                '........'
            )
            myboard.getCheckingLanes().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00010000' + "\n" +
                '00010000' + "\n" +
                '00010000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("bishop checks should return the bishop lanes", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '.......b' +
                '........' +
                '........' +
                '........' +
                '...K....' +
                '........' +
                '........'
            )
            myboard.getCheckingLanes().debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000010' + "\n" +
                '00000100' + "\n" +
                '00001000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        describe.skip("queen checks should return the queen lanes", function() {
            it("diagonal", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '.......q' +
                    '........' +
                    '........' +
                    '........' +
                    '...K....' +
                    '........' +
                    '........'
                )
                myboard.getCheckingLanes().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000010' + "\n" +
                    '00000100' + "\n" +
                    '00001000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("horizontal", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '...q....' +
                    '........' +
                    '........' +
                    '........' +
                    '...K....' +
                    '........' +
                    '........'
                )
                myboard.getCheckingLanes().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '00010000' + "\n" +
                    '00010000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
        })
    })
})
