var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Chessboard bitboards", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

    describe("setters", function() {
        var bit = chess.bitboard.fromBinary(
            '00000000' +
            '00000000' +
            '00100000' +
            '00001000' +
            '00000010' +
            '00000000' +
            '00000000' +
            '00000000', 'X'
        ), myboard
        describe("white", function() {
            before(function() {
                myboard = new chess.board
            })

            it("should set pawn bitboard", function() {
                var old = myboard.bitboards.P
                myboard.bitboards.P = bit
                myboard.bitboards.P.should.not.eql(old)
                myboard.bitboards.P.piece.should.eql('P', 'piece test')
                myboard.bitboards.P.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.P.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set rook bitboard", function() {
                var old = myboard.bitboards.R
                myboard.bitboards.R = bit
                myboard.bitboards.R.should.not.eql(old)
                myboard.bitboards.R.piece.should.eql('R', 'piece test')
                myboard.bitboards.R.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.R.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set knight bitboard", function() {
                var old = myboard.bitboards.N
                myboard.bitboards.N = bit
                myboard.bitboards.N.should.not.eql(old)
                myboard.bitboards.N.piece.should.eql('N', 'piece test')
                myboard.bitboards.N.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.N.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set bishop bitboard", function() {
                var old = myboard.bitboards.B
                myboard.bitboards.B = bit
                myboard.bitboards.B.should.not.eql(old)
                myboard.bitboards.B.piece.should.eql('B', 'piece test')
                myboard.bitboards.B.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.B.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set queen bitboard", function() {
                var old = myboard.bitboards.Q
                myboard.bitboards.Q = bit
                myboard.bitboards.Q.should.not.eql(old)
                myboard.bitboards.Q.piece.should.eql('Q', 'piece test')
                myboard.bitboards.Q.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.Q.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set king bitboard", function() {
                var old = myboard.bitboards.K
                myboard.bitboards.K = bit
                myboard.bitboards.K.should.not.eql(old)
                myboard.bitboards.K.piece.should.eql('K', 'piece test')
                myboard.bitboards.K.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.K.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
        })
        
        describe("black", function() {
            it("should set pawn bitboard", function() {
                var old = myboard.bitboards.p
                myboard.bitboards.p = bit
                myboard.bitboards.p.should.not.eql(old)
                myboard.bitboards.p.piece.should.eql('p', 'piece test')
                myboard.bitboards.p.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.p.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set rook bitboard", function() {
                var old = myboard.bitboards.r
                myboard.bitboards.r = bit
                myboard.bitboards.r.should.not.eql(old)
                myboard.bitboards.r.piece.should.eql('r', 'piece test')
                myboard.bitboards.r.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.r.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set knight bitboard", function() {
                var old = myboard.bitboards.n
                myboard.bitboards.n = bit
                myboard.bitboards.n.should.not.eql(old)
                myboard.bitboards.n.piece.should.eql('n', 'piece test')
                myboard.bitboards.n.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.n.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set bishop bitboard", function() {
                var old = myboard.bitboards.b
                myboard.bitboards.b = bit
                myboard.bitboards.b.should.not.eql(old)
                myboard.bitboards.b.piece.should.eql('b', 'piece test')
                myboard.bitboards.b.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.b.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set queen bitboard", function() {
                var old = myboard.bitboards.q
                myboard.bitboards.q = bit
                myboard.bitboards.q.should.not.eql(old)
                myboard.bitboards.q.piece.should.eql('q', 'piece test')
                myboard.bitboards.q.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.q.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should set king bitboard", function() {
                var old = myboard.bitboards.k
                myboard.bitboards.k = bit
                myboard.bitboards.k.should.not.eql(old)
                myboard.bitboards.k.piece.should.eql('k', 'piece test')
                myboard.bitboards.k.piece.should.not.eql(bit.piece, 'bit piece')
                myboard.bitboards.k.debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00001000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
        })
    })
})
