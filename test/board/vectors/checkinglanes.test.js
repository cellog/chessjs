var should = require("should"),
    chess = require("../../../lib/board.js"),
    Vector = chess.vector

describe("Chessboard vector", function() {
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
            myboard.getCheckingLanes(true).should.eql([])
            myboard.blackToMove()
            myboard.getCheckingLanes(true).should.eql([])
        })
        describe("simple case: knight and pawn checks should return the location of the checking pieces", function() {
            it("pawn checks", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '........' +
                    '........' +
                    '........' +
                    '..p.p...' +
                    '...K....' +
                    '........' +
                    '........'
                )
                var v = myboard.getCheckingLanes(true)
                v.length.should.eql(2)
                v.should.containEql(new Vector(2,3))
                v.should.containEql(new Vector(4,3))
            })
            it("knight checks", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '........' +
                    '........' +
                    '........' +
                    '.n......' +
                    '...K....' +
                    '.....n..' +
                    '........'
                )
                var v = myboard.getCheckingLanes(true)
                v.length.should.eql(2)
                v.should.containEql(new Vector(1,3))
                v.should.containEql(new Vector(5,1))
            })
        })
        it("rook checks should return the rook lanes", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '...r....' +
                '.r......' +
                '........' +
                '........' +
                '.r.K..r.' +
                '........' +
                '...r....'
            )
            var v = myboard.getCheckingLanes(true)
            v.should.have.length(4)
            v[0].should.have.length(4)
            v[1].should.have.length(3)
            v[2].should.have.length(2)
            v[3].should.have.length(2)
            v[0].should.containEql(new Vector(3,3))
            v[0].should.containEql(new Vector(3,4))
            v[0].should.containEql(new Vector(3,5))
            v[0].should.containEql(new Vector(3,6))
            v[1].should.containEql(new Vector(4,2))
            v[1].should.containEql(new Vector(5,2))
            v[1].should.containEql(new Vector(6,2))
            v[2].should.containEql(new Vector(1,2))
            v[2].should.containEql(new Vector(2,2))
            v[3].should.containEql(new Vector(3,0))
            v[3].should.containEql(new Vector(3,1))
        })
        it("bishop checks should return the bishop lanes", function() {
            myboard = chess.board.fromTextBoard(
                '........' +
                '.......b' +
                '........' +
                '.b......' +
                '........' +
                '...K....' +
                '....b...' +
                '.b......'
            )
            var v = myboard.getCheckingLanes(true)
            v.should.have.length(4)
            v[0].should.have.length(4)
            v[1].should.have.length(2)
            v[2].should.have.length(1)
            v[3].should.have.length(2)
            v[0].should.containEql(new Vector(4,3))
            v[0].should.containEql(new Vector(5,4))
            v[0].should.containEql(new Vector(6,5))
            v[0].should.containEql(new Vector(7,6))
            v[1].should.containEql(new Vector(1,4))
            v[1].should.containEql(new Vector(2,3))
            v[2].should.containEql(new Vector(4,1))
            v[3].should.containEql(new Vector(2,1))
            v[3].should.containEql(new Vector(1,0))
        })
        describe("queen checks should return the queen lanes", function() {
            it("diagonal", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '.......q' +
                    '........' +
                    '.q......' +
                    '........' +
                    '...K....' +
                    '....q...' +
                    '.q.....q'
                )
                var v = myboard.getCheckingLanes(true)
                v.should.have.length(4)
                v[0].should.have.length(4)
                v[1].should.have.length(2)
                v[2].should.have.length(1)
                v[3].should.have.length(2)
                v[0].should.containEql(new Vector(4,3))
                v[0].should.containEql(new Vector(5,4))
                v[0].should.containEql(new Vector(6,5))
                v[0].should.containEql(new Vector(7,6))
                v[1].should.containEql(new Vector(1,4))
                v[1].should.containEql(new Vector(2,3))
                v[2].should.containEql(new Vector(4,1))
                v[3].should.containEql(new Vector(2,1))
                v[3].should.containEql(new Vector(1,0))
            })
            it("horizontal/vertical", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '...q....' +
                    '........' +
                    '........' +
                    '........' +
                    '.q.K..q.' +
                    '........' +
                    '...q....'
                )
                var v = myboard.getCheckingLanes(true)
                v.should.have.length(4)
                v[0].should.have.length(4)
                v[1].should.have.length(3)
                v[2].should.have.length(2)
                v[3].should.have.length(2)
                v[0].should.containEql(new Vector(3,3))
                v[0].should.containEql(new Vector(3,4))
                v[0].should.containEql(new Vector(3,5))
                v[0].should.containEql(new Vector(3,6))
                v[1].should.containEql(new Vector(4,2))
                v[1].should.containEql(new Vector(5,2))
                v[1].should.containEql(new Vector(6,2))
                v[2].should.containEql(new Vector(1,2))
                v[2].should.containEql(new Vector(2,2))
                v[3].should.containEql(new Vector(3,0))
                v[3].should.containEql(new Vector(3,1))
            })
        })
        describe("no checks", function() {
            it("should be a blank bitboard", function() {
                myboard = chess.board.fromTextBoard(
                    '........' +
                    '..q.br..' +
                    '........' +
                    '.....pn.' +
                    '........' +
                    '...K....' +
                    '........' +
                    '........'
                )
                myboard.getCheckingLanes(true).should.be.empty
            })
        })
    })
})
