var chess = require('./lib/board.js'),
    Vector = chess.vector
myboard = chess.board.fromTextBoard(
                '..Q...Q.' +
                '........' +
                '.Q...p..' +
                '........' +
                '........' +
                '........' +
                '..Q.....' +
                '........'
            )
            console.log(myboard.detectStartingSquare('Qcg6', myboard.bitboards.Q, myboard.getLegalMoves(4, 'queen', false), 'g6',
                                              4, 'c', false))