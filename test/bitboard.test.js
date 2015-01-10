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
                    var myboard = new chess.board
                    myboard.bitboards.p = chess.bitboard.fromBinary(
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
                        myboard.blackPawnEastAttackTargets().debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '00010000' + "\n" +
                        '00000010' + "\n" +
                        '00000001' + "\n" +
                        '00000000' + "\n" +
                        '00001000' + "\n" +
                        '01110000'
                        )
                    })
                    it("should detect west targets", function() {
                        myboard.blackPawnWestAttackTargets().debugString("\n").should.eql(
                        '00000000' + "\n" +
                        '00000000' + "\n" +
                        '01000000' + "\n" +
                        '00001000' + "\n" +
                        '00000100' + "\n" +
                        '00000010' + "\n" +
                        '00100000' + "\n" +
                        '11000000'
                        )
                    })
                    it("should detect any targets", function() {
                        myboard.blackPawnAttackTargets().debugString("\n").should.eql(
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
        }) // pawn pushes
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
            it("should fill left with occlusion")
            it("should fill right with occlusion")
            it("should fill ne with occlusion")
            it("should fill nw with occlusion")
            it("should fill se with occlusion")
            it("should fill sw with occlusion")
        })
        describe("should have correct rook moves", function() {
            it("should have correct north moves", function() {
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
                rook.rookMovesUp(empty).debugString("\n").should.eql(
                    '01000000' + "\n" +
                    '01010000' + "\n" +
                    '01000000' + "\n" +
                    '01001000' + "\n" +
                    '01001000' + "\n" +
                    '01000000' + "\n" +
                    '01000000' + "\n" +
                    '00000000'
                )
            })

            it("should have correct south moves", function() {
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
                rook.rookMovesDown(empty).debugString("\n").should.eql(
                    '00000000' + "\n" +
                    '01000000' + "\n" +
                    '01000000' + "\n" +
                    '01010000' + "\n" +
                    '01000000' + "\n" +
                    '01000000' + "\n" +
                    '01001000' + "\n" +
                    '01000000'
                )
            })
        })
        it("should have correct bishop moves")
        it("should have correct queen moves")
    })
}) // Bitboard
