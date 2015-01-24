var should = require("should"),
    chess = require("../../lib/board.js"),
    vector = require("../../lib/vector.js").vector

describe("Chessboard basics", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

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

    describe("fromTextBoard", function() {
        it("should read a text board with no divider", function() {
            chess.board.fromTextBoard(
                '++++++++' +
                '+N++++++' +
                '+++k++++' +
                '+++P+P++' +
                '++++++p+' +
                '++++bp++' +
                '+r++K+++' +
                '+++Q++++'
            ).textBoard("\n", ".").should.eql(
                '........' + "\n" +
                '.N......' + "\n" +
                '...k....' + "\n" +
                '...P.P..' + "\n" +
                '......p.' + "\n" +
                '....bp..' + "\n" +
                '.r..K...' + "\n" +
                '...Q....'
            )
        })
        it("should read a text board with a divider", function() {
            chess.board.fromTextBoard(
                '++++++++|' +
                '+N+++N++|' +
                '+++k++++|' +
                '+++P+P++|' +
                '++++++p+|' +
                '++++bp++|' +
                '+r++K+++|' +
                '+++Q++++', '|'
            ).textBoard("\n", ".").should.eql(
                '........' + "\n" +
                '.N...N..' + "\n" +
                '...k....' + "\n" +
                '...P.P..' + "\n" +
                '......p.' + "\n" +
                '....bp..' + "\n" +
                '.r..K...' + "\n" +
                '...Q....'
            )
        })
    })
})
