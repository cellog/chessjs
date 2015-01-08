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
        myboard.bitboards.should.have.ownProperty('white').and.is.instanceof(Array).and.length(7)
        myboard.bitboards.should.have.ownProperty('black').and.is.instanceof(Array).and.length(7)
        myboard.bitboards.should.have.ownProperty('empty').and.is.instanceof(Long)
        myboard.bitboards.should.have.ownProperty('both').and.is.instanceof(Long)
        chess.bitboardString(myboard.bitboards.both).should.eql(
            '11111111' +
            '11111111' +
            '00000000' +
            '00000000' +
            '00000000' +
            '00000000' +
            '11111111' +
            '11111111'
        )
    })
    
    describe("toIndex", function () {
        it("should return 0 for a1", function() {
            myboard.toIndex('a1').should.eql(0)
        })
        it("should return 63 for h8", function() {
            myboard.toIndex('h8').should.eql(63)
        })
        it("should work for vector", function() {
            myboard.toIndex(new vector(1,1)).should.eql(9)
        })
        it("should fail on invalid input", function() {
            myboard.toIndex.bind(null, 'w9').should.throw('Invalid input "w9"')
            myboard.toIndex.bind(null, 'a-').should.throw('Invalid input "a-"')
            myboard.toIndex.bind(null, 89).should.throw('Invalid input "89"')
        })
    })
    
})

describe("bitboardString", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });
    it("should return binary string representation for debugging", function() {
        chess.bitboardString(myboard.bitboards.white[0]).should
            .equal(
                '00000000' +
                '11111111' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
        chess.bitboardString(myboard.bitboards.white[6]).should
            .equal(
                '11111111' +
                '11111111' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
    })
})
