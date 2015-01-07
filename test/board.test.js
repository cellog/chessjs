var should = require("should"),
    chess = require("../lib/board.js")

describe("Chessboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

    it("should have 64 squares", function() {
        myboard.squares.should.be.an.instanceof(Array)
        myboard.squares.length.should.eql(64)
    })

    it("should translate coords to array index", function() {
        myboard.indexOf('a1').should.eql(0)
        myboard.indexOf('h8').should.eql(64)
        myboard.indexOf('a8').should.eql(7)
        myboard.indexOf('b1').should.eql(8+0)
        myboard.indexOf('c1').should.eql(8*2+0)
        myboard.indexOf('d1').should.eql(8*3+0)
        myboard.indexOf('e1').should.eql(8*4+0)
        myboard.indexOf('f1').should.eql(8*5+0)
        myboard.indexOf('g1').should.eql(8*6+0)
        myboard.indexOf('h1').should.eql(8*7+0)
    });
})