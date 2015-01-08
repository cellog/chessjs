var should = require("should"),
    chess = require("../lib/board.js"),
    vector = require("../lib/vector.js").vector,
    Long = require("long")

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

        describe("whitepieces", function() {
            it("should return 0x000000000000ffff", function() {
                var b = myboard.blackpieces
                b.should.be.instanceof(chess.bitboard)
                b.debugString().should.eql(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '11111111' +
                    '11111111'
                )
            })
        })
        
        describe("both", function() {
            it("should return 0xffff00000000ffff", function() {
                var b = myboard.both
                b.should.be.instanceof(chess.bitboard)
                b.debugString().should.eql(
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
        })
        
        describe("emptysquares", function() {
            it("should return 0x0000ffffffff0000", function() {
                var b = myboard.emptysquares
                b.should.be.instanceof(chess.bitboard)
                b.debugString().should.eql(
                    '00000000' +
                    '00000000' +
                    '11111111' +
                    '11111111' +
                    '11111111' +
                    '11111111' +
                    '00000000' +
                    '00000000'
                )
            })
        })
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

describe("Bitboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });
    it("should return binary string representation for debugging", function() {
        myboard.bitboards.white[0].debugString().should
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
        new chess.bitboard(0xffff0000,0).debugString().should
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
