var should = require("should"),
    chess = require("../lib/board.js")

describe("Chessboard", function() {
    it("should have 64 squares", function() {
        chess.squares.should.be.an.instanceof(Array).and.have.length.exactly(64)
    })

    it("should translate coords to array index", function() {
        chess.indexOf('a1').should.eql(0)
        chess.indexOf('h8').should.eql(64)
        chess.indexOf('a8').should.eql(7)
        chess.indexOf('b1').should.eql(8+0)
        chess.indexOf('c1').should.eql(8*2+0)
        chess.indexOf('d1').should.eql(8*3+0)
        chess.indexOf('e1').should.eql(8*4+0)
        chess.indexOf('f1').should.eql(8*5+0)
        chess.indexOf('g1').should.eql(8*6+0)
        chess.indexOf('h1').should.eql(8*7+0)
    });
})