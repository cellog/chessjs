var chess = require('./lib/board.js'),
    Vector = chess.vector
var myboard = chess.board.fromTextBoard(
                '........' +
                '.p......' +
                '........' +
                '...p.p..' +
                '..P.P.P.' +
                '........' +
                '.P......' +
                '........'
            ), unused = new chess.bitboard(0,0)
console.log(myboard.detectStartingSquare('e4xd5', myboard.bitboards.P, unused, 'd5', 0, 'e4', true))