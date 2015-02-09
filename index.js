var chess = require('./lib/board.js'),
    Vector = chess.vector
var myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '........' +
                '....pP..' +
                '...P.P..' +
                '........' +
                '.P......' +
                '........'
            )
console.log(myboard.parseAlgebraicNotation('bxc3'))