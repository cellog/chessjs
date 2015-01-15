var should = require("should"),
    chess = require("../../lib/board.js")

describe("Bitboard fill functions", function() {
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

}) // Bitboard
