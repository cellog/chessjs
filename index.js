var chess = require('./lib/board.js'),
    Vector = chess.vector
myboard = chess.board.fromTextBoard(
                '........' +
                '........' +
                '.....p..' +
                '........' +
                '........' +
                '.BB..B..' +
                '........' +
                '........'
            )
            console.log(myboard.detectStartingSquare.bind(myboard, 'Bg7', myboard.bitboards.B, myboard.getLegalMoves(3, 'bishop', false), 'g7',
                                              3, false, false).call())