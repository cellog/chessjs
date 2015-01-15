var should = require("should"),
    chess = require("../../../lib/board.js")

describe("Bitboard pawn move functions", function() {
    var bitboard = chess.bitboard.fromBinary(
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

    describe("pawn pushes", function() {
        describe("target squares", function() {
            it("white", function() {
                bitboard.pawnSingleMoves(emptyboard, true).debugString("\n").should.eql(
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
                bitboard.pawnDoubleMoves(emptyboard, true).debugString("\n").should.eql(
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
                bitboard.pawnSingleMoves(emptyboard).debugString("\n").should.eql(
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
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
                )
                bit.pawnDoubleMoves(emptyboard).debugString("\n").should.eql(
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
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
                )
                bit.pushablePawns(emptyboard, true).debugString("\n").should.eql(
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
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '01100000' +
                    '00000000'
                )
                bit.pushablePawns(emptyboard).debugString("\n").should.eql(
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
    }) // pawn pushes
    
    describe("pawn captures", function() {            
        describe("pawns able to capture", function() {
            describe("white pawns", function() {
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000001' +
                    '00010000' +
                    '11100000' +
                    '00000000'
                )
                it("should detect white targets", function() {
                    bit.pawnAttackTargets(true).debugString("\n").should.eql(
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
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000001' +
                    '00010000' +
                    '11100000' +
                    '00000000'
                )
                it("should detect black targets", function() {
                    bit.pawnAttackTargets().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '01010000' + "\n" +
                    '00001010' + "\n" +
                    '00000101' + "\n" +
                    '00000010' + "\n" +
                    '00101000' + "\n" +
                    '11110000'
                    )
                })
            }) // black pawns
        }) // pawns able to capture
        describe("pawns that are attacking enemy pieces", function() {
            it("white pawns", function() {
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000001' +
                    '00010000' +
                    '11100000' +
                    '00000000'
                ),
                enemies = chess.bitboard.fromBinary(
                    '01000000' +
                    '00101110' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                it("should detect white pawns with targets", function() {
                    bit.attackingPawns(enemies, true).debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00000100' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                    )
                })
            })
            it("black pawns", function() {
                var bit = chess.bitboard.fromBinary(
                    '00000000' +
                    '00100000' +
                    '00000100' +
                    '00000010' +
                    '00000001' +
                    '00010000' +
                    '11100000' +
                    '00000000'
                ),
                enemies = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '01000000' +
                    '00000000' +
                    '00100000' +
                    '00000010' +
                    '00000000' +
                    '01000000'
                )
                
                it("should detect black targets", function() {
                    bit.attackingPawns(enemies).debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00100000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000001' + "\n" +
                    '00000000' + "\n" +
                    '10100000' + "\n" +
                    '00000000'
                    )
                })
            })
        }) // pawns
    }) // pawn captures
    describe("all pawn moves and captures", function() {
        describe("white pawns", function() {
            var bit = chess.bitboard.fromBinary(
                '00000000' +
                '00100000' +
                '00000100' +
                '00000010' +
                '00000001' +
                '00010000' +
                '11100000' +
                '00000000'
            ),
            enemies = chess.bitboard.fromBinary(
                '01000000' +
                '00001110' +
                '00000000' +
                '00000000' +
                '00100000' +
                '00000000' +
                '00000000' +
                '00000000'
            ),
            empty = chess.bitboard.fromBinary(
                '01000000' +
                '00101110' +
                '00000100' +
                '00000010' +
                '00100001' +
                '00010000' +
                '11100000' +
                '00000000'
            ).not()
            it("should detect white pawn moves and possible attacks", function() {
                bit.pawnMoves(empty, enemies, true).debugString("\n").should.eql(
                '01100000' + "\n" +
                '00001010' + "\n" +
                '00000010' + "\n" +
                '00000001' + "\n" +
                '11110000' + "\n" +
                '11100000' + "\n" +
                '00000000' + "\n" +
                '00000000'
                )
            })
        })
        describe("black pawns", function() {
            var bit = chess.bitboard.fromBinary(
                '00000000' +
                '00100000' +
                '00000100' +
                '00000010' +
                '00000001' +
                '00010000' +
                '11100000' +
                '00000000'
            ),
            enemies = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000'
            ),
            emptyboard = bit.andB(enemies).not()
            it("should detect black moves and possible attacks", function() {
                bit.pawnMoves(emptyboard, enemies, false).debugString("\n").should.eql(
                '00000000' + "\n" +
                '00000000' + "\n" +
                '00110000' + "\n" +
                '00100100' + "\n" +
                '00000110' + "\n" +
                '00000001' + "\n" +
                '00010000' + "\n" +
                '11100000'
                )
            })
        })
    })
}) // Bitboard
