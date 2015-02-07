var chess = require('./lib/board.js'),
    Vector = chess.vector
var myboard = chess.board.fromTextBoard(
                'Q...QQ..' +
                '....p...' +
                'p.......' +
                'Q.......' +
                '........' +
                '........' +
                '....Q...' +
                '........'
            )
console.log(myboard.parseAlgebraicNotation('Qe6'))