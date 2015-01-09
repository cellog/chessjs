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

        describe("textBoard", function() {
            it("should return a rudimentary chess board", function() {
                myboard.textBoard().should.eql(
                    'rnbqkbnr' +
                    'pppppppp' +
                    '        ' +
                    '        ' +
                    '        ' +
                    '        ' +
                    'PPPPPPPP' +
                    'RNBQKBNR'
                )
            })
            it("test divider", function() {
                myboard.textBoard("\n").should.eql(
                    'rnbqkbnr' + "\n" +
                    'pppppppp' + "\n" +
                    '        ' + "\n" +
                    '        ' + "\n" +
                    '        ' + "\n" +
                    '        ' + "\n" +
                    'PPPPPPPP' + "\n" +
                    'RNBQKBNR'
                )
            })
        })

        describe("mapBoard", function() {
            it("should return a map of coordinate => piece", function() {
                myboard.mapBoard.should.eql({
                    a1: 'R', b1: 'N', c1: 'B', d1: 'Q', e1: 'K', f1: 'B', g1: 'N', h1: 'R',
                    a2: 'P', b2: 'P', c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'P', h2: 'P',
                    a3: ' ', b3: ' ', c3: ' ', d3: ' ', e3: ' ', f3: ' ', g3: ' ', h3: ' ',
                    a4: ' ', b4: ' ', c4: ' ', d4: ' ', e4: ' ', f4: ' ', g4: ' ', h4: ' ',
                    a5: ' ', b5: ' ', c5: ' ', d5: ' ', e5: ' ', f5: ' ', g5: ' ', h5: ' ',
                    a6: ' ', b6: ' ', c6: ' ', d6: ' ', e6: ' ', f6: ' ', g6: ' ', h6: ' ',
                    a7: 'p', b7: 'p', c7: 'p', d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
                    a8: 'r', b8: 'n', c8: 'b', d8: 'q', e8: 'k', f8: 'b', g8: 'n', h8: 'r'
                })
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
    it("should accept existing piece when passed a bitboard without an argument", function() {
        var a = new chess.bitboard(1,2,"Y"), b
        b = new chess.bitboard(a)
        b.piece.should.be.eql(a.piece)
    })
    var myboard, bitboard = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
                );
    
    before(function() {
        myboard = new chess.board;
    });
    describe("debugString", function() {
        it("should return binary string representation for debugging", function() {
            myboard.bitboards.P.debugString().should
                .eql(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '11111111' +
                    '00000000'
                )
            new chess.bitboard(0x0000ffff,0).debugString().should
                .eql(
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
    
    describe("toArray", function() {
        it("should return a beautiful array of p", function() {
            var t = new chess.bitboard(0x0000ff00,0, 'P').toArray();
            t.length.should.eql(64)
            t.should
                .eql(
                    [
                    ' ',' ',' ',' ',' ',' ',' ',' ',
                    'P','P','P','P','P','P','P','P',
                    ' ',' ',' ',' ',' ',' ',' ',' ',
                    ' ',' ',' ',' ',' ',' ',' ',' ',
                    ' ',' ',' ',' ',' ',' ',' ',' ',
                    ' ',' ',' ',' ',' ',' ',' ',' ',
                    ' ',' ',' ',' ',' ',' ',' ',' ',
                    ' ',' ',' ',' ',' ',' ',' ',' ']
                )
        })
    })

    describe("fromBinary", function() {
        it("should return a correct bitboard", function() {
            chess.bitboard.fromBinary(
                    '01000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000010'
                ).debugString("\n").should.eql(
                    '01000000' + "\n" +
                    '00100000' + "\n" +
                    '00000100' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '01100000' + "\n" +
                    '00000010'
                )
        })
    })

    describe("vertical fill", function() {
        describe("north fill", function() {
            it("should fill northly", function() {
                bitboard.northFill().debugString("\n").should.eql(
                    '01110110' + "\n" +
                    '01110110' + "\n" +
                    '01110110' + "\n" +
                    '01110010' + "\n" +
                    '01110000' + "\n" +
                    '01110000' + "\n" +
                    '01100000' + "\n" +
                    '00000000'  
                )
            })
        })

        describe("south fill", function() {
            it("should fill southly", function() {
                bitboard.southFill().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000100' + "\n" +
                    '00000110' + "\n" +
                    '00000110' + "\n" +
                    '00010110' + "\n" +
                    '01110110' + "\n" +
                    '01110110'
                )
            })
        })
    })

    describe("pawn moves", function() {
        describe("pawn pushes", function() {
            describe("bitboard shift", function() {
                it("north one square", function() {
                    bitboard.northOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000100' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '01100000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
                it("south one square", function() {
                    bitboard.southOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000100' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '01100000'
                    )
                })
                it("east one square", function() {
                    bitboard.eastOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000010' + "\n" +
                    '00000001' + "\n" +
                    '00000000' + "\n" +
                    '00001000' + "\n" +
                    '00110000' + "\n" +
                    '00000000'
                    )
                })
                it("northeast one square", function() {
                    bitboard.northeastOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000010' + "\n" +
                    '00000001' + "\n" +
                    '00000000' + "\n" +
                    '00001000' + "\n" +
                    '00110000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
                it("southeast one square", function() {
                    bitboard.southeastOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000010' + "\n" +
                    '00000001' + "\n" +
                    '00000000' + "\n" +
                    '00001000' + "\n" +
                    '00110000'
                    )
                })
                it("west one square", function() {
                    bitboard.westOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00001000' + "\n" +
                    '00000100' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '11000000' + "\n" +
                    '00000000'
                    )
                })
                it("southwest one square", function() {
                    bitboard.southwestOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00001000' + "\n" +
                    '00000100' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '11000000'
                    )
                })
                it("northwest one square", function() {
                    bitboard.northwestOne().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00001000' + "\n" +
                    '00000100' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '11000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
            })

            describe("target squares", function() {
                it("white", function() {
                    var myboard = new chess.board
                    myboard.bitboards.P = bitboard
                    myboard.whitePawnPushTargets().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '01100000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
                it("white double", function() {
                    var myboard = new chess.board
                    myboard.bitboards.P = bitboard
                    myboard.whiteDoublePawnPushTargets().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '01100000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
                
                it("black", function() {
                    var myboard = new chess.board
                    myboard.bitboards.p = bitboard
                    myboard.blackPawnPushTargets().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000100' + "\n" +
                    '00000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
                it("black double", function() {
                    var myboard = new chess.board
                    myboard.bitboards.p = chess.bitboard.fromBinary(
                        '00000000' +
                        '00100000' +
                        '00000100' +
                        '00000010' +
                        '00000000' +
                        '00010000' +
                        '01100000' +
                        '00000000'
                    )
                    myboard.blackDoublePawnPushTargets().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
            }) // target squares
            
            describe("pawns able to move", function() {
                it("should find white pawns with legal moves", function() {
                    var myboard = new chess.board
                    myboard.bitboards.P = chess.bitboard.fromBinary(
                        '00000000' +
                        '00100000' +
                        '00000100' +
                        '00000010' +
                        '00000000' +
                        '00010000' +
                        '01100000' +
                        '00000000'
                    )
                    myboard.whitePawnsAbleToPush().debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000010' + "\n" +
                        '00000000' + "\n" +
                        '00010000' + "\n" +
                        '01100000' + "\n" +
                        '00000000'
                    )
                })
                it("should find black pawns with legal moves", function() {
                    var myboard = new chess.board
                    myboard.bitboards.p = chess.bitboard.fromBinary(
                        '00000000' +
                        '00100000' +
                        '00000100' +
                        '00000010' +
                        '00000000' +
                        '00010000' +
                        '01100000' +
                        '00000000'
                    )
                    myboard.blackPawnsAbleToPush().debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00100000' + "\n" +
                        '00000100' + "\n" +
                        '00000010' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
            })
            
            describe("pawns able to capture", function() {
                describe("white pawns", function() {
                    var myboard = new chess.board
                    myboard.bitboards.P = chess.bitboard.fromBinary(
                        '00000000' +
                        '00100000' +
                        '00000100' +
                        '00000010' +
                        '00000001' +
                        '00010000' +
                        '11100000' +
                        '00000000'
                    )
                    it("should detect east targets", function() {
                        myboard.whitePawnEastAttackTargets().debugString("\n").should.eql(
                        '00010000' + "\n" +
                        '00000010' + "\n" +
                        '00000001' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '01110000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                        )
                    })
                    it("should detect west targets", function() {
                        myboard.whitePawnWestAttackTargets().debugString("\n").should.eql(
                        '01000000' + "\n" +
                        '00001000' + "\n" +
                        '00000100' + "\n" +
                        '00000010' + "\n" +
                        '00100000' + "\n" +
                        '11000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                        )
                    })
                    it("should detect any targets", function() {
                        myboard.whitePawnAttackTargets().debugString("\n").should.eql(
                        '01010000' + "\n" +
                        '00001010' + "\n" +
                        '00000101' + "\n" +
                        '00000010' + "\n" +
                        '00101000' + "\n" +
                        '11110000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                        )
                    })
                })

                describe("black pawns", function() {
                    it("should detect east targets")
                    it("should detect west targets")
                    it("should detect any targets")
                })
            })
        })
    })
})
