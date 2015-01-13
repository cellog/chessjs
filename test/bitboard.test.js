var should = require("should"),
    chess = require("../lib/board.js")

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
    
    before(function() {
        myboard = new chess.board;
    });

    describe("constants", function() {
        it("notAFile", function() {
            var c = new chess.bitboard()
            c.notAFile.should.eql(0x7f7f7f7f)
            new chess.bitboard(c.notAFile, c.notAFile)
                .debugString("\n").should.eql(
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111' + "\n" +
                    '01111111'
                )
        })
        it("notHFile", function() {
            var c = new chess.bitboard()
            c.notHFile.should.eql(0xfefefefe>>>0)
            new chess.bitboard(c.notHFile, c.notHFile)
                .debugString("\n").should.eql(
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110' + "\n" +
                    '11111110'
                )
        })
        it("notABFile", function() {
            var c = new chess.bitboard()
            c.notABFile.should.eql(0x3f3f3f3f)
            new chess.bitboard(c.notABFile, c.notABFile)
                .debugString("\n").should.eql(
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111' + "\n" +
                    '00111111'
                )
        })
        it("notGHFile", function() {
            var c = new chess.bitboard()
            c.notGHFile.should.eql(0xfcfcfcfc>>>0)
            new chess.bitboard(c.notGHFile, c.notGHFile)
                .debugString("\n").should.eql(
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100' + "\n" +
                    '11111100'
                )
        })
        it("rank4", function() {
            var c = new chess.bitboard()
            c.rank4.should.eql({l: 0, h: 0xff,piece: 'X'})
            c.rank4
                .debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
        })
        it("rank5", function() {
            var c = new chess.bitboard()
            c.rank5.should.eql({l: 0xff000000>>>0, h: 0, piece: 'X'})
            c.rank5
                .debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
        })
    })

    describe("or", function() {
        it("should combine a value with a bitboard", function() {
            bitboard.or(0xff).debugString("\n").should.eql(
                '11111111' + "\n" +
                '00000000' + "\n" +
                '00000100' + "\n" +
                '00000010' + "\n" +
                '11111111' + "\n" +
                '00010000' + "\n" +
                '01100000' + "\n" +
                '00000000'
            )
        })
    })

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
    }) // pawn moves
    
    describe("knight moves", function() {
        it("should have correct corners", function() {
            chess.bitboard.fromBinary(
                    '10000001' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '10000001'
                ).knightJumps().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00100100' + "\n" +
                    '01000010' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '01000010' + "\n" +
                    '00100100' + "\n" +
                    '00000000'
                )
        })
        it("should have correct sides", function() {
            chess.bitboard.fromBinary(
                    '00001000' +
                    '00000000' +
                    '00000000' +
                    '10000000' +
                    '00000001' +
                    '00000000' +
                    '00000000' +
                    '00010000'
                ).knightJumps().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '01100010' + "\n" +
                    '00110110' + "\n" +
                    '00000100' + "\n" +
                    '00100000' + "\n" +
                    '01101100' + "\n" +
                    '01000110' + "\n" +
                    '00000000'
                )
        })
        it("should have correct centers", function() {
            chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000000' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ).knightJumps().debugString("\n").should.eql(
                    '00101000' + "\n" +
                    '01000100' + "\n" +
                    '00000000' + "\n" +
                    '01010100' + "\n" +
                    '00101010' + "\n" +
                    '00000000' + "\n" +
                    '00100010' + "\n" +
                    '00010100'
                )
        })
    }) // knight moves
    
    describe("king moves", function() {
        it("should have correct corners", function() {
            chess.bitboard.fromBinary(
                    '10000001' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '10000001'
                ).kingMoves().debugString("\n").should.eql(
                    '01000010' + "\n" +
                    '11000011' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '00000000' + "\n" +
                    '11000011' + "\n" +
                    '01000010'
                )
        })
        it("should have correct sides", function() {
            chess.bitboard.fromBinary(
                    '00001000' +
                    '00000000' +
                    '00000000' +
                    '10000000' +
                    '00000001' +
                    '00000000' +
                    '00000000' +
                    '00010000'
                ).kingMoves().debugString("\n").should.eql(
                    '00010100' + "\n" +
                    '00011100' + "\n" +
                    '11000000' + "\n" +
                    '01000011' + "\n" +
                    '11000010' + "\n" +
                    '00000011' + "\n" +
                    '00111000' + "\n" +
                    '00101000'
                )
        })
        it("should have correct centers", function() {
            chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000000' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ).kingMoves().debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '00111000' + "\n" +
                    '00101000' + "\n" +
                    '00111000' + "\n" +
                    '00011100' + "\n" +
                    '00010100' + "\n" +
                    '00011100' + "\n" +
                    '00000000'
                )
        })
    }) // king moves

    describe("sliding piece moves", function() {
        describe("occluded fills", function() {
            it("should fill up with occlusion", function() {
                var rook = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '01000000'
                ), empty = chess.bitboard.fromBinary(
                    '01001010' +
                    '01011010' +
                    '01000010' +
                    '01001000' +
                    '01001000' +
                    '01000000' +
                    '01000000' +
                    '00000000'
                )
                rook.fillUpOcclusion(empty).debugString("\n").should.eql(
                    '01000000' + "\n" +
                    '01010000' + "\n" +
                    '01010000' + "\n" +
                    '01001000' + "\n" +
                    '01001010' + "\n" +
                    '01001000' + "\n" +
                    '01000000' + "\n" +
                    '01000000'
                )
            })
            it("should fill down with occlusion", function() {
                var rook = chess.bitboard.fromBinary(
                    '01000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '00001010' +
                    '01011010' +
                    '01000010' +
                    '01011000' +
                    '01001000' +
                    '01000000' +
                    '01001010' +
                    '01010010'
                )
                rook.fillDownOcclusion(empty).debugString("\n").should.eql(
                    '01000000' + "\n" +
                    '01000000' + "\n" +
                    '01010000' + "\n" +
                    '01010000' + "\n" +
                    '01000010' + "\n" +
                    '01001000' + "\n" +
                    '01001000' + "\n" +
                    '01000000'
                )
            })
            it("should fill e with occlusion", function() {
                var rook = chess.bitboard.fromBinary(
                    '10000000' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '01111111' +
                    '00000000' +
                    '00000111' +
                    '00000000' +
                    '00000001' +
                    '00000101' +
                    '00000000' +
                    '00000000'
                )
                rook.fillEastOcclusion(empty).debugString("\n").should.eql(
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '00000000' + "\n" +
                    '00000011' + "\n" +
                    '00001100' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should fill w with occlusion", function() {
                var rook = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '11111110' +
                    '00000000' +
                    '01100000' +
                    '00000000' +
                    '01011000' +
                    '11110000' +
                    '00000000' +
                    '00000000'
                )
                rook.fillWestOcclusion(empty).debugString("\n").should.eql(
                    '11111111' + "\n" +
                    '00000000' + "\n" +
                    '01110000' + "\n" +
                    '00000000' + "\n" +
                    '00000010' + "\n" +
                    '11111000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should fill sw with occlusion", function() {
                var bishop = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '01000000' +
                    '10000010' +
                    '01100100' +
                    '00101001' +
                    '01010100' +
                    '00100110' +
                    '01000001' +
                    '10010000'
                )
                bishop.fillSouthwestOcclusion(empty).debugString("\n").should.eql(
                    '00000001' + "\n" +
                    '00000010' + "\n" +
                    '00010100' + "\n" +
                    '00101000' + "\n" +
                    '01010010' + "\n" +
                    '00101100' + "\n" +
                    '01000000' + "\n" +
                    '10000000'
                )
            })
            it("should fill nw with occlusion", function() {
                var bishop = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '01000000' +
                    '10000010' +
                    '01100100' +
                    '00101001' +
                    '01010100' +
                    '00100110' +
                    '01000001' +
                    '10010000'
                )
                bishop.fillNorthwestOcclusion(empty).debugString("\n").should.eql(
                    '00000001' + "\n" +
                    '10000000' + "\n" +
                    '01010000' + "\n" +
                    '00100000' + "\n" +
                    '00010010' + "\n" +
                    '00001000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
            it("should fill se with occlusion", function() {
                var bishop = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '01000000' +
                    '10000010' +
                    '01100100' +
                    '00101001' +
                    '01010100' +
                    '00100110' +
                    '01000001' +
                    '10010000'
                )
                bishop.fillSoutheastOcclusion(empty).debugString("\n").should.eql(
                    '00000001' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '00001000' + "\n" +
                    '00000110' + "\n" +
                    '00001010' + "\n" +
                    '00000001' + "\n" +
                    '00000000'
                )
            })
            it("should fill ne with occlusion", function() {
                var bishop = chess.bitboard.fromBinary(
                    '00000001' +
                    '00000000' +
                    '00010000' +
                    '00000000' +
                    '00000010' +
                    '00001000' +
                    '00000000' +
                    '00000000'
                ), empty = chess.bitboard.fromBinary(
                    '01000000' +
                    '10000010' +
                    '01100100' +
                    '00101001' +
                    '01010100' +
                    '00100110' +
                    '01000001' +
                    '10010000'
                )
                bishop.fillNortheastOcclusion(empty).debugString("\n").should.eql(
                    '00000001' + "\n" +
                    '00000000' + "\n" +
                    '00010000' + "\n" +
                    '00000001' + "\n" +
                    '00000110' + "\n" +
                    '00001000' + "\n" +
                    '00000000' + "\n" +
                    '00000000'
                )
            })
        })
        it("should have correct rook moves", function() {
            var rook = chess.bitboard.fromBinary(
                '00000001' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000010' +
                '00001000' +
                '00000000' +
                '00000000'
            ), empty = chess.bitboard.fromBinary(
                '00011110' +
                '00010001' +
                '11101011' +
                '00000011' +
                '01011000' +
                '11110111' +
                '00001011' +
                '00001011'
            )
            rook.rookMoves(empty).debugString("\n").should.eql(
                '00011110' + "\n" +
                '00010001' + "\n" +
                '11101011' + "\n" +
                '00000011' + "\n" +
                '00001000' + "\n" +
                '11110111' + "\n" +
                '00001010' + "\n" +
                '00001010'
            )
        })
        it("should have correct bishop moves", function() {
            var bishop = chess.bitboard.fromBinary(
                '00000001' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000010' +
                '00001000' +
                '00000000' +
                '00000000'
            ), empty = chess.bitboard.fromBinary(
                '01000000' +
                '10000010' +
                '01100100' +
                '00101001' +
                '01010100' +
                '00100110' +
                '01000001' +
                '10010000'
            )
            bishop.bishopMoves(empty).debugString("\n").should.eql(
                '00000000' + "\n" +
                '10000010' + "\n" +
                '01000100' + "\n" +
                '00101001' + "\n" +
                '01010100' + "\n" +
                '00100110' + "\n" +
                '01000001' + "\n" +
                '10000000'
            )
        })
        it("should have correct queen moves", function() {
            var queen = chess.bitboard.fromBinary(
                '00000001' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000010' +
                '00001000' +
                '00000000' +
                '00000000'
            ), empty = chess.bitboard.fromBinary(
                '11111110' +
                '10000011' +
                '01100101' +
                '00101001' +
                '01010100' +
                '00100110' +
                '01000001' +
                '10010000'
            )
            queen.queenMoves(empty).debugString("\n").should.eql(
                '11111110' + "\n" +
                '10000011' + "\n" +
                '01100101' + "\n" +
                '00101001' + "\n" +
                '01010100' + "\n" +
                '00100110' + "\n" +
                '01000001' + "\n" +
                '10000000'
            )
        })
        describe("attack bitboards", function() {
            describe("king", function() {
                it("should be same as king moves.  We can and it against enemy|empty later in the process", function() {
                    var king = chess.bitboard.fromBinary(
                '00000000' +
                '00000000' +
                '00010000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000' +
                '00000000')
                king.kingAttackTargets().should.eql(king.kingMoves())
                })
            })
            describe("rook", function() {
                it("should be all the rook moves minus pieces in the way plus 1 square", function() {
                    var rook = chess.bitboard.fromBinary(
                        '00000001' +
                        '00000000' +
                        '00010000' +
                        '00000000' +
                        '00000010' +
                        '00001000' +
                        '00000000' +
                        '00000000'
                    ), empty = chess.bitboard.fromBinary(
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00001001' +
                        '00000000' +
                        '00000000' +
                        '10010000'
                    ).not()
                    rook.rookAttackTargets(empty).debugString("\n").should.eql(
                        '11111110' + "\n" +
                        '00010011' + "\n" +
                        '11101111' + "\n" +
                        '00010011' + "\n" +
                        '00011101' + "\n" +
                        '11110111' + "\n" +
                        '00011010' + "\n" +
                        '00011010'
                    )
                })
            })
            describe("bishop", function() {
                it("should be all the bishop moves minus pieces in the way plus 1 square", function() {
                    var bishop = chess.bitboard.fromBinary(
                        '00000001' +
                        '00000000' +
                        '00010000' +
                        '00000000' +
                        '00000010' +
                        '00001000' +
                        '00000000' +
                        '00000000'
                    ), empty = chess.bitboard.fromBinary(
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00100000' +
                        '00010000' +
                        '00000000' +
                        '00000000' +
                        '00000000'
                    ).not()
                    bishop.bishopAttackTargets(empty).debugString("\n").should.eql(
                        '01100100' + "\n" +
                        '00111010' + "\n" +
                        '00001101' + "\n" +
                        '00101111' + "\n" +
                        '00010100' + "\n" +
                        '00000111' + "\n" +
                        '00011101' + "\n" +
                        '00110010'
                    )
                })
            })
            describe("queen", function() {
                it("should be all the queen moves minus pieces in the way plus 1 square", function() {
                    var queen = chess.bitboard.fromBinary(
                        '00000001' +
                        '00000000' +
                        '00010000' +
                        '00000000' +
                        '00000010' +
                        '00001000' +
                        '00000000' +
                        '00000000'
                    ), empty = chess.bitboard.fromBinary(
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00100000' +
                        '00010000' +
                        '00000000' +
                        '00000000' +
                        '00000000'
                    ).not()
                    queen.queenAttackTargets(empty).debugString("\n").should.eql(
                        '11111110' + "\n" +
                        '00111011' + "\n" +
                        '11101111' + "\n" +
                        '00111111' + "\n" +
                        '00011101' + "\n" +
                        '11110111' + "\n" +
                        '00011111' + "\n" +
                        '00111011'
                    )
                })
            })
        }) // attack bitboards
    }) // sliding piece moves

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

    describe("inCheck", function() {
        var king = chess.bitboard.fromBinary(
            '00000000' +
            '00000000' +
            '00000000' +
            '00000000' +
            '00010000' +
            '00000000' +
            '00000000' +
            '00000000'
        ), empty = new chess.bitboard(0,0)
        describe("pawns", function() {
            it("should handle white pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                ), checkingpawn = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, true).should.eql({
                    pawn: checkingpawn
                })
            })
            it("should handle black pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, false).should.eql({
                    pawn: p
                })
            })
            it("should handle invalid white pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00100010' +
                    '00000000' +
                    '00100000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, true).should.be.false
            })
            it("should handle invalid black pawn checks", function() {
                var p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00100010' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(p).not(), p, empty, empty, empty, empty, false).should.be.false
            })
        })
        describe("rook", function() {
            it("should handle rook checks vertically", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00010000' +
                    '00000000'
                )
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, true).should.eql({
                    rook: r
                })
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, false).should.eql({
                    rook: r
                })
            })
            it("should handle rook checks horizontally", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, true).should.eql({
                    rook: r
                })
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, false).should.eql({
                    rook: r
                })
            })
            it("should handle invalid rook checks", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000'
                )
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, true).should.be.false
                king.inCheck(king.orB(r).not(), empty, r, empty, empty, empty, false).should.be.false
            })
        })
        describe("bishop", function() {
            it("should handle bishop checks", function() {
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '01000100' +
                    '00000000'
                )
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, true).should.eql({
                    bishop: b
                })
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, false).should.eql({
                    bishop: b
                })
            })
            it("should handle invalid bishop checks", function() {
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '01000000' +
                    '00000010' +
                    '00000000' +
                    '00000000' +
                    '01000000' +
                    '00000000' +
                    '00000100'
                )
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, true).should.be.false
                king.inCheck(king.orB(b).not(), empty, empty, empty, b, empty, false).should.be.false
            })
        })
        describe("knight", function() {
            it("should handle knight checks", function() {
                var n = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00101000' +
                    '01000100' +
                    '00000000' +
                    '01000100' +
                    '00101000' +
                    '00000000'
                )
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, true).should.eql({
                    knight: n
                })
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, false).should.eql({
                    knight: n
                })
            })
            it("should handle invalid knight checks", function() {
                var n = chess.bitboard.fromBinary(
                    '00000000' +
                    '00101000' +
                    '01000100' +
                    '00000000' +
                    '01000100' +
                    '00101000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, true).should.be.false
                king.inCheck(king.orB(n).not(), empty, empty, n, empty, empty, false).should.be.false
            })
        })
        describe("queen", function() {
            it("should handle queen checks", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '00000000'
                )
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '01000100' +
                    '00000000'
                ),q=r.orB(b)
                king.inCheck(king.orB(b).not(), empty, empty, empty, empty, q, true).should.eql({
                    queen: q
                })
                king.inCheck(king.orB(b).not(), empty, empty, empty, empty, q, false).should.eql({
                    queen: q
                })
            })
            it("should handle invalid queen checks", function() {
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '01000000' +
                    '00000010' +
                    '00000000' +
                    '00000000' +
                    '01000000' +
                    '00000000' +
                    '00000100'
                )
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '01000000'
                ),q=r.orB(b)
                king.inCheck(king.orB(q).not(), empty, empty, empty, empty, q, true).should.be.false
                king.inCheck(king.orB(q).not(), empty, empty, empty, empty, q, false).should.be.false
            })
        })
        describe("multiple checks (theoretical)", function() {
            it("should return every valid check", function() {
                var r = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000010' +
                    '00000000' +
                    '00010000' +
                    '00000000'
                )
                var b = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000010' +
                    '01000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '01000100' +
                    '00000000'
                ),q=r.orB(b),
                n = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00101000' +
                    '01000100' +
                    '00000000' +
                    '01000100' +
                    '00101000' +
                    '00000000'
                ),P = chess.bitboard.fromBinary(
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00100000' +
                        '00000000' +
                        '00000000' +
                        '00000000' +
                        '00000000'
                ),p = chess.bitboard.fromBinary(
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00000000' +
                    '00100000' +
                    '00000000' +
                    '00000000'
                )
                king.inCheck(king.orB(b).not(), P, r, n, b, q, true).should.eql({
                    pawn: P,
                    knight: n,
                    rook: r,
                    bishop: b,
                    queen: q
                })
                king.inCheck(king.orB(b).not(), p, r, n, b, q, false).should.eql({
                    pawn: p,
                    knight: n,
                    rook: r,
                    bishop: b,
                    queen: q
                })
            })
        })
    })
}) // Bitboard
