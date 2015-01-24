var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard bitboard getters", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });


    describe("white pawns", function() {
        it("should return 0x000000000000ff00", function() {
            var b = myboard.bitboards.white[0]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '11111111' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.P)
        })
    })

    describe("black pawns", function() {
        it("should return 0x000000000000ff00", function() {
            var b = myboard.bitboards.black[0]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '11111111' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.p)
        })
    })

    describe("white rooks", function() {
        it("should return 0x0000000000000018", function() {
            var b = myboard.bitboards.white[1]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '10000001'
            )
            b.should.be.equal(myboard.bitboards.R)
        })
    })

    describe("black rooks", function() {
        it("should return 0x0000000000000018", function() {
            var b = myboard.bitboards.black[1]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '10000001' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.r)
        })
    })

    describe("white knights", function() {
        it("should return 0x0000000000000024", function() {
            var b = myboard.bitboards.white[2]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '01000010'
            )
            b.should.be.equal(myboard.bitboards.N)

        })
    })

    describe("black knights", function() {
        it("should return 0x0000000000000024", function() {
            var b = myboard.bitboards.black[2]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '01000010' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.n)
        })
    })

    describe("white bishops", function() {
        it("should return 0x0000000000000042", function() {
            var b = myboard.bitboards.white[3]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00100100'
            )
            b.should.be.equal(myboard.bitboards.B)
        })
    })

    describe("black bishops", function() {
        it("should return 0x0000000000000042", function() {
            var b = myboard.bitboards.black[3]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00100100' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.b)
        })
    })

    describe("white queens", function() {
        it("should return 0x0000000000000010", function() {
            var b = myboard.bitboards.white[4]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00010000'
            )
            b.should.be.equal(myboard.bitboards.Q)
        })
    })

    describe("black queens", function() {
        it("should return 0x0000000000000010", function() {
            var b = myboard.bitboards.black[4]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00010000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.q)
        })
    })

    describe("white king", function() {
        it("should return 0x0000000000000008", function() {
            var b = myboard.bitboards.white[5]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000'
            )
            b.should.be.equal(myboard.bitboards.K)
        })
    })

    describe("black king", function() {
        it("should return 0x0000000000000008", function() {
            var b = myboard.bitboards.black[5]
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00001000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
            b.should.be.equal(myboard.bitboards.k)
        })
    })

    describe("blackpieces", function() {
        it("should return 0x000000000000ffff", function() {
            var b = myboard.blackpieces
            b.should.be.instanceof(chess.bitboard)
            b.debugString().should.eql(
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
        it("should hit cache", function() {
            var b = myboard.blackpieces, c = myboard.blackpieces
            b.should.be.equal(c)
        })
    })

    describe("whitepieces", function() {
        it("should return 0x000000000000ffff", function() {
            var b = myboard.whitepieces
            b.should.be.instanceof(chess.bitboard)
            b.debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '11111111' + "\n" +
                '11111111'
            )
        })
        it("should hit cache", function() {
            var b = myboard.whitepieces, c = myboard.whitepieces
            b.should.be.equal(c)
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
        it("should hit cache", function() {
            var b = myboard.both, c = myboard.both
            b.should.be.equal(c)
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
        it("should hit cache", function() {
            var b = myboard.emptysquares, c = myboard.emptysquares
            b.should.be.equal(c)
        })
    })
})
