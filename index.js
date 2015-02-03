var chess = require('./lib/board.js'),
    Vector = chess.vector
myboard = chess.board.fromTextBoard(
                '........' +
                '...r....' +
                '........' +
                '........' +
                '........' +
                '...K....' +
                '........' +
                '........'
            )
            console.log(myboard.getCheckingLanes(true))