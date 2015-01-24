var should = require("should"),
    chess = require("../lib/board.js"),
    vector = require("../lib/vector.js").vector

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
    })


    describe("all possible attacks", function() {
        it("calculate white", function() {
            board = new chess.board
            board.bitboards.p = chess.bitboard.fromBinary(
                '00000000' +
                '10011111' +
                '01000000' +
                '00000000' +
                '01000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
            board.bitboards.P = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '01110110' +
                '00000000'
            )
            board.bitboardAttacks(true).debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000001' + "\n" +
                    '11000001' + "\n" +
                    '01000001' + "\n" +
                    '10100011' + "\n" +
                    '10110101' + "\n" +
                    '10001001' + "\n" +
                    '00000000'
            )
        })
        it("calculate black", function() {
            board = new chess.board
            board.bitboards.P = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00000000' +
                '01000000' +
                '00000000' +
                '01000000' +
                '10011111' +
                '00000000'
            )
            board.bitboards.p = chess.bitboard.fromBinary(
                '00000000' +
                '01110110' +
                '00000000' +
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
            board.bitboardAttacks(false).debugString("\n").should.eql(
                '00000000' + "\n" +
                '10001001' + "\n" +
                '10110101' + "\n" +
                '10100011' + "\n" +
                '01000001' + "\n" +
                '11000001' + "\n" +
                '00000001' + "\n" +
                '00000000'
            )
        })
    })

    describe("getLegalMoves", function() {
        var myboard = new chess.board
        describe("should return a bitboard representing legal pawn moves", function() {
            beforeEach(function() {
                myboard = chess.board.fromTextBoard(
                    '0000k000' +
                    '0ppp0Pp0' +
                    'NN000000' +
                    'p0000000' +
                    'PK000000' +
                    '000n00nn' + 
                    '0PPP00P0' +
                    '00000000')
            })
            describe("captures", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(0, "pawn", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00010001' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(0, "pawn", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '11000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
            })
            describe("moves", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(0, "pawn", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000100' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00100000' + "\n" +
                        '01100000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(0, "pawn", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00110010' + "\n" +
                        '00110010' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
            })
        })
        describe("should return a bitboard representing legal rook moves", function() {
           beforeEach(function() {
                myboard = chess.board.fromTextBoard(
                    '00000000' +
                    '000r00K0' +
                    '00kp0000' +
                    '00000000' +
                    '00000000' +
                    '00000r00' +
                    'p0RPPP00' +
                    '000NRN00')
            })
            describe("captures", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(1, "rook", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '10000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(1, "rook", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000100' + "\n" +
                        '00000000'
                    )
                })
            })
            describe("moves", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(1, "rook", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00100000' + "\n" +
                        '00100000' + "\n" +
                        '00100000' + "\n" +
                        '01000000' + "\n" +
                        '00100000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(1, "rook", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00010100' + "\n" +
                        '11101100' + "\n" +
                        '00000100' + "\n" +
                        '00000100' + "\n" +
                        '00000100' + "\n" +
                        '11111011' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
            })
        })
        describe("should return a bitboard representing legal queen moves", function() {
           beforeEach(function() {
                myboard = chess.board.fromTextBoard(
                    '00000000' +
                    '000q00K0' +
                    '00kp0000' +
                    '00000000' +
                    '0000p000' +
                    '00000q00' +
                    'p0QPPP00' +
                    '000NQN00')
            })
            describe("captures", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(4, "queen", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000000' + "\n" +
                        '10000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(4, "queen", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00001100' + "\n" +
                        '00000000'
                    )
                })
            })
            describe("moves", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(4, "queen", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00100000' + "\n" +
                        '10100000' + "\n" +
                        '01110000' + "\n" +
                        '01000000' + "\n" +
                        '01100000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(4, "queen", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00111100' + "\n" +
                        '11101100' + "\n" +
                        '00001100' + "\n" +
                        '00000101' + "\n" +
                        '00000110' + "\n" +
                        '11111011' + "\n" +
                        '00000010' + "\n" +
                        '00000001'
                    )
                })
            })
        })
        describe("should return a bitboard representing legal king moves", function() {
           beforeEach(function() {
                myboard = chess.board.fromTextBoard(
                    '00000000' +
                    '0N000000' +
                    '000k0000' +
                    '000P0P00' +
                    '000000p0' +
                    '0000bp00' +
                    '0r00K000' +
                    '00000000')
            })
            describe("captures", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(5, "king", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(5, "king", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00010000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
            })
            describe("moves", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(5, "king", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00010000' + "\n" +
                        '00000000' + "\n" +
                        '00011100'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(5, "king", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00111000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
            })
        })
        describe("should return a bitboard representing legal bishop moves", function() {
           beforeEach(function() {
                myboard = chess.board.fromTextBoard(
                    '00000000' +
                    '000b00K0' +
                    '00kp0000' +
                    '00000000' +
                    '0000p000' +
                    '00000b00' +
                    'p0BPPP00' +
                    '000NBN00')
            })
            describe("captures", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(3, "bishop", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(3, "bishop", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000000'
                    )
                })
            })
            describe("moves", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(3, "bishop", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '10000000' + "\n" +
                        '01010000' + "\n" +
                        '00000000' + "\n" +
                        '01000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(3, "bishop", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00101000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000101' + "\n" +
                        '00000010' + "\n" +
                        '00000001' + "\n" +
                        '00000010' + "\n" +
                        '00000001'
                    )
                })
            })
        })
        describe("should return a bitboard representing legal knight moves", function() {
           beforeEach(function() {
                myboard = chess.board.fromTextBoard(
                    '+++NNn++' +
                    '+++++++K' +
                    '++kp++++' +
                    '++++++++' +
                    '++++p+n+' +
                    '++++++++' +
                    'p++PPP++' +
                    '++++++++'
                )
            })
            describe("captures", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(2, "knight", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00010000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(2, "knight", true)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000100' + "\n" +
                        '00000000'
                    )
                })
            })
            describe("moves", function() {
                it("white", function() {
                    myboard.whiteToMove()
                    var b = myboard.getLegalMoves(2, "knight", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '01100110' + "\n" +
                        '00001100' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00000000'
                    )
                })
                it("black", function() {
                    myboard.blackToMove()
                    var b = myboard.getLegalMoves(2, "knight", false)
                    b.should.be.instanceof(chess.bitboard)
                    b.debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00010000' + "\n" +
                        '00001111' + "\n" +
                        '00001000' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '00000001' + "\n" +
                        '00000000'
                    )
                })
            })
        })
    })
})
