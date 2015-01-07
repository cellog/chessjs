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
        myboard.indexOf('a1').should.eql(0, 'a1')
        myboard.indexOf('h8').should.eql(63, 'h8')
        myboard.indexOf('h1').should.eql(7, 'h1')
        myboard.indexOf('a2').should.eql(8+0, 'a1')
        myboard.indexOf('a3').should.eql(8*2+0, 'a3')
        myboard.indexOf('a4').should.eql(8*3+0, 'a4')
        myboard.indexOf('a5').should.eql(8*4+0, 'a5')
        myboard.indexOf('a6').should.eql(8*5+0, 'a6')
        myboard.indexOf('a7').should.eql(8*6+0, 'a7')
        myboard.indexOf('a8').should.eql(8*7+0, 'a8')
    })

    it("should fail on invalid input", function() {
        myboard.indexOf.bind(null, 'q')
            .should.throw('"q" is not a valid coordinate')
        myboard.indexOf.bind(null, 'z1')
            .should.throw('"z" is not a valid column (a-h)')
        myboard.indexOf.bind(null, 'ag')
            .should.throw('"g" is not a valid row (1-8)')
    })
})