var should = require("should"),
    Vector = require("../lib/vector.js").vector

describe("Vector", function() {

    it("should accept x and y", function() {
        var v = new Vector(1,2)
        v.x.should.eql(1, 'x')
        v.y.should.eql(2, 'y')
    })

    describe("indexOf", function() {
        it ("should return 0 for 0 vector", function () {
            new Vector(0,0).indexOf().should.eql(0)
        })
        it ("should return 1 for 1,0 vector", function () {
            new Vector(1,0).indexOf().should.eql(1)
        })
        it ("should return 7 for 7,0 vector", function () {
            new Vector(7,0).indexOf().should.eql(7)
        })
        it ("should return 8 for 0,1 vector", function () {
            new Vector(0,1).indexOf().should.eql(8)
        })
        it ("should return 63 for 7,7 vector", function () {
            new Vector(7,7).indexOf().should.eql(63)
        })
    })

    describe("from64Index", function() {
        it ("should return 0 vector for 0", function () {
            var v = Vector.from64Index(0)
            v.should.be.instanceof(Vector)
            v.x.should.eql(0, 'x')
            v.y.should.eql(0, 'y')
        })
        it ("should return 1,0 vector for 1", function () {
            var v = Vector.from64Index(1)
            v.should.be.instanceof(Vector)
            v.x.should.eql(1, 'x')
            v.y.should.eql(0, 'y')
        })
        it ("should return 7,0 vector for 7", function () {
            var v = Vector.from64Index(7)
            v.should.be.instanceof(Vector)
            v.x.should.eql(7, 'x')
            v.y.should.eql(0, 'y')
        })
        it ("should return 0,1 vector for 8", function () {
            var v = Vector.from64Index(8)
            v.should.be.instanceof(Vector)
            v.x.should.eql(0, 'x')
            v.y.should.eql(1, 'y')
        })
        it ("should return 7,7 vector for 63", function () {
            var v = Vector.from64Index(63)
            v.should.be.instanceof(Vector)
            v.x.should.eql(7, 'x')
            v.y.should.eql(7, 'y')
        })
        it ("should fail on invalid input", function() {
            Vector.from64Index.bind(null, -1).should.throw('"-1" is not a valid chessboard index')
            Vector.from64Index.bind(null, 64).should.throw('"64" is not a valid chessboard index')
        })
    })

    describe("toAlgebraic", function() {
        it ("should return 'a1' for 0 vector", function () {
            new Vector(0,0).toAlgebraic().should.eql('a1')
        })
        it ("should return 'b1' for 1,0 vector", function () {
            new Vector(1,0).toAlgebraic().should.eql('b1')
        })
        it ("should return 'h1' for 7,0 vector", function () {
            new Vector(7,0).toAlgebraic().should.eql('h1')
        })
        it ("should return 'a2' for 0,1 vector", function () {
            new Vector(0,1).toAlgebraic().should.eql('a2')
        })
        it ("should return 'h8' for 7,7 vector", function () {
            new Vector(7,7).toAlgebraic().should.eql('h8')
        })
        it ("should fail on invalid input", function() {
            var z = new Vector(-1,0);
            z.toAlgebraic.bind(z).should.throw("Invalid chess square (-1,0)")
            z.set(0,-1)
            z.toAlgebraic.bind(z).should.throw("Invalid chess square (0,-1)")
            z.set(8,0)
            z.toAlgebraic.bind(z).should.throw("Invalid chess square (8,0)")
            z.set(0,8)
            z.toAlgebraic.bind(z).should.throw("Invalid chess square (0,8)")
        })
    })

    describe("plus", function() {
        it ("should return 2,3 when adding 1,1 and 1,2", function() {
            var v = new Vector(1,1)
            v1 = v.plus(new Vector(1,2))
            v1.should.be.instanceof(Vector)
            v1.x.should.eql(2, 'x')
            v1.y.should.eql(3, 'y')
        })
    })

    describe("toBitboard", function() {
        it ("should return a bitboard with a single bit", function() {
            new Vector(1,1).toBitboard().debugString("\n").should.eql(
                '00000000' + "\n" + 
                '00000000' + "\n" + 
                '00000000' + "\n" + 
                '00000000' + "\n" + 
                '00000000' + "\n" + 
                '00000000' + "\n" + 
                '01000000' + "\n" + 
                '00000000'
            )
        })
    })
})