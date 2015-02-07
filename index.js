var chess = require('./lib/board.js'),
    Vector = chess.vector
myboard = chess.board.fromTextBoard(
                '........' +
                '..N.....' +
                '........' +
                '.....p..' +
                '........' +
                '..N.N...' +
                '........' +
                '........'
            )
            console.log(myboard.detectStartingSquare('Nxf5', myboard.bitboards.N, myboard.getLegalMoves(2, 'knight', true), 'f5',
                                              2, false, true))