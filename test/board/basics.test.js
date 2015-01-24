var should = require("should"),
    chess = require("../../lib/board.js"),
    vector = require("../../lib/vector.js").vector

describe("Chessboard basics", function() {
    var myboard;
    
    before(function() {
        myboard = new chess.board;
    });

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
