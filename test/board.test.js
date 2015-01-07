var should = require("should"),
    chess = require("../lib/board.js")

describe("Chessboard", function() {
    it("should have 64 squares", function() {
        chess.squares.should.be.an.instanceof(Array).and.have.length.exactly(64);
    })
})