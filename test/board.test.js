var should = require("should"),
    chess = require("../lib/board.js"),
    vector = require("../lib/vector.js").vector,
    Long = require("long")

describe("Chessboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

    it("bitboards should exist", function() {
        myboard.bitboards.should.have.ownProperty('white').and.is.instanceof(Array).and.length(6)
        myboard.bitboards.should.have.ownProperty('black').and.is.instanceof(Array).and.length(6)
        myboard.bitboards.should.have.ownProperty('empty').and.is.instanceof(Long)
        myboard.bitboards.should.have.ownProperty('both').and.is.instanceof(Long)
    })
    
    describe("squareToBit", function () {
        it("should return 0 for a1", function() {
            myboard.squareToBit('a1').should.eql(0)
        })
        it("should return 63 for h8", function() {
            myboard.squareToBit('h8').should.eql(63)
        })
    })
})