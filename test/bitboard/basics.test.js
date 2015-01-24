var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard basics", function() {
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
                ), emptyboard = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '11111111' +
                    '11111111' +
                    '11111111' +
                    '11111111' +
                    '00000000' +
                    '00000000'
                );

    describe("debugString", function() {
        it("should return binary string representation for debugging", function() {
            chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '11111111' +
                    '00000000'
                ).debugString("\n").should
                .eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '11111111' + "\n" +
                    '00000000'
                )
            new chess.bitboard(0x0000ffff,0).debugString("\n").should
                .eql(
                    '11111111' + "\n" +
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
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

    describe("fromAlgebraic", function() {
        it("c3", function() {
            chess.bitboard.fromAlgebraic('c3').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00100000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("a8", function() {
            chess.bitboard.fromAlgebraic('a8').debugString("\n").should.eql(
                '10000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000'
            )
        })
        it("h1", function() {
            chess.bitboard.fromAlgebraic('h1').debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000001'
            )
        })
        it("fail to parse", function() {
            chess.bitboard.fromAlgebraic.bind(null, 'q4').should.throw('Unknown coordinate: "q4"')
        })
    })
    describe("toAlgebraic", function() {
        it("c3", function() {
            chess.bitboard.fromAlgebraic('c3').toAlgebraic().should.eql('c3')
        })
        it("a8", function() {
            chess.bitboard.fromAlgebraic('a8').toAlgebraic().should.eql('a8')
        })
        it("h1", function() {
            chess.bitboard.fromAlgebraic('h1').toAlgebraic().should.eql('h1')
        })
        it("a7,f4", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000'
            ).toAlgebraic().should.eql('a7, f4')
        })
        it("a7,f4 as array", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000'
            ).toAlgebraic(true).should.eql(['a7', 'f4'])
        })
        it("empty bitboard", function() {
            new chess.bitboard().toAlgebraic().should.eql('')
            new chess.bitboard().toAlgebraic(true).should.eql([])
        })
    })
    describe("movePieces", function() {
        it("should transpose all passed pieces to new squares", function() {
            var start = chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '01111000' +
                '00000000'
            ),
            from = chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000'
            ), to = chess.bitboard.fromBinary(
                '00100000' +
                '00000000' +
                '00000000' +
                '00001000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000'
            )
            start.movePieces(from, to).debugString("\n").should.eql(
                '00100000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00001000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '01111000' + "\n" +
                '00000000'
            )
        })
        it("should fail if new squares are occupied", function() {
            var start = chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '01111000' +
                '00000000'
            ),
            from = chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000'
            ), to = chess.bitboard.fromBinary(
                '00100000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000'
            )
            start.movePieces.bind(start, from, to).should.throw('Cannot move to spaces that are already occupied (d2)')
        })
        it("should fail if from and to are the same", function() {
            var foo = new chess.bitboard(0,0)
            foo.movePieces.bind(foo,foo,foo).should.throw('Cannot move from and to the same space ()')
        })
    })
    describe("movePieceAlgebraic", function() {
        it("should work with b2 to a5", function() {
            var start = chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '01111000' +
                '00000000'
            )
            start.movePieceAlgebraic("b2", "a5").debugString("\n").should.eql(
                '00000000' + "\n" +
                '10000000' + "\n" +
                '00000000' + "\n" +
                '10000000' + "\n" +
                '00000100' + "\n" +
                '00000000' + "\n" +
                '00111000' + "\n" +
                '00000000'
            )
        })
    })
    describe("toString", function() {
        it("should display all info", function() {
            new chess.bitboard(1,0, 'R').toString().should.eql('{high: 0, low: 1, piece: R binary representation:' +
                "\n" +
                '00000001' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00000000' + "\n" + '}'
                )
        })
    })
    describe("verticalFlip", function() {
        it("should put the board upside down", function() {
            chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '01111000' +
                '00000000'
            ).verticalFlip().debugString("\n").should.eql(
                '00000000' + "\n" + 
                '01111000' + "\n" + 
                '00000000' + "\n" + 
                '00000100' + "\n" + 
                '00000000' + "\n" + 
                '00000000' + "\n" + 
                '10000000' + "\n" + 
                '00000000'
            )
        })
    })
}) // Bitboard
