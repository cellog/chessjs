var should = require("should"),
    chess = require("../lib/board.js"),
    vector = require("../lib/vector.js").vector

describe("Chessboard", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

    it("should have 64 squares", function() {
        myboard.squares.should.be.an.instanceof(Array)
        myboard.squares.length.should.eql(64)
    })

    describe("indexOf", function() {
        
        it("should translate coords to array index", function() {
            "purely descriptive".should.be.ok
        })
        it("a1 should be 0", function () {
            myboard.indexOf('a1').should.eql(0)
        })
        it("h8 should be 63", function () {
            myboard.indexOf('h8').should.eql(63)
        })
        it("h1 should be 7", function () {
            myboard.indexOf('h1').should.eql(7)
        })
        it("a2 should be 8", function () {
            myboard.indexOf('a2').should.eql(8)
        })
        it("a3 should be 16", function () {
            myboard.indexOf('a3').should.eql(16)
        })
        it("a4 should be 24", function () {
            myboard.indexOf('a4').should.eql(24)
        })
        it("a5 should be 32", function () {
            myboard.indexOf('a5').should.eql(32)
        })
        it("a6 should be 40", function () {
            myboard.indexOf('a6').should.eql(40)
        })
        it("a7 should be 47", function () {
            myboard.indexOf('a7').should.eql(48)
        })
        it("a8 should be 56", function () {
            myboard.indexOf('a8').should.eql(56)
        })
        it("should accept a vector", function() {
            myboard.indexOf(new vector(0,1)).should.eql(8)
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

    it("should ask pieces how they move", function() {
    })

    it("should ask pieces how they move", function() {
    })
})