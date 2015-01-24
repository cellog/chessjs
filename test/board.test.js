var should = require("should"),
    chess = require("../lib/board.js"),
    vector = require("../lib/vector.js").vector

describe("Chessboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });
    
    describe("bitboards", function() {
        it("should exist", function() {
            myboard.bitboards.should.have.ownProperty('white').and.is.instanceof(Array).and.length(6)
            myboard.bitboards.should.have.ownProperty('black').and.is.instanceof(Array).and.length(6)
        })
    })
})
