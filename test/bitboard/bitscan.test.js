var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard bitscanning functions", function() {
    describe("least significant bit detection", function() {
        before(function() {
            bit = new chess.bitboard(0,0)
        })
        it("should return 64 for empty bitboard", function() {
            bit.lsb().should.eql(64)
        })
        it("should detect lowest bits", function() {
            var bit = new chess.bitboard(0,0)
            for (var i = 0;i < 31;i++) {
                it("test " + i, function() {
                    bit.l = 1 << i
                    bit.lsb().should.eql(i)
                })
            }
            it("test 31", function() {
                bit.l = 1 << 31
                bit.lsb().should.eql(31)
            })
        })
        it("should detect highest bits", function() {
            for (var i = 0;i < 31;i++) {
                it("test " + i, function() {
                    bit.h = 1 << i
                    bit.lsb().should.eql(i+32)
                })
            }
            it("test 31", function() {
                bit.h = 1 << 31
                bit.lsb().should.eql(63)
            })
        })
    })

    describe("bitscan", function() {
        var bit = new chess.bitboard(0,0)
        it("detect all the bits are belong to us", function() {
            var allthebasearebelongtous = []
            for (var i=0;i<64;i++) allthebasearebelongtous.push(i)
            bit.l = bit.h = 0xffffffff
            bit.bitscan().should.eql(allthebasearebelongtous)
        })
        it("detect bits with zeros and stuff", function() {
            var bit = chess.bitboard.fromBinary(
                '00001000' +
                '00001000' +
                '00001000' +
                '11111111' +
                '00001000' +
                '00001000' +
                '00001000' +
                '11111111'
            )
            bit.bitscan().should.eql([3,11,19,24,25,26,27,28,29,30,31,
                                      35,43,51,56,57,58,59,60,61,62,63])
        })
        it("zero returns []", function() {
            bit.h = bit.l = 0
            bit.bitscan().should.eql([])
        })
    })

}) // Bitboard
