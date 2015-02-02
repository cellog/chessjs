var should = require("should"),
    chess = require("../../../lib/board.js"),
    vector = require("../../../lib/vector.js").vector

describe("Chessboard vector basics", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

    describe("fromTextBoard", function() {
        it("should populate the vector pieces", function() {
            var c = chess.board.fromTextBoard(
                '++++++++' +
                '+N++++++' +
                '+++k++++' +
                '+++P+P++' +
                '++++++p+' +
                '++++bp++' +
                '+r++K+++' +
                '+++Q++++'
            )
            c.pieces.N.length.should.eql(1)
            c.pieces.N[0].toAlgebraic().should.eql('b7')
            c.pieces.k.length.should.eql(1)
            c.pieces.k[0].toAlgebraic().should.eql('d6')
            c.pieces.P.length.should.eql(2)
            c.pieces.P[0].toAlgebraic().should.eql('f5')
            c.pieces.P[1].toAlgebraic().should.eql('d5')
            c.pieces.p.length.should.eql(2)
            c.pieces.p[0].toAlgebraic().should.eql('f3')
            c.pieces.p[1].toAlgebraic().should.eql('g4')
            c.pieces.b.length.should.eql(1)
            c.pieces.b[0].toAlgebraic().should.eql('e3')
            c.pieces.r.length.should.eql(1)
            c.pieces.r[0].toAlgebraic().should.eql('b2')
            c.pieces.Q.length.should.eql(1)
            c.pieces.Q[0].toAlgebraic().should.eql('d1')
        })
    })
})
