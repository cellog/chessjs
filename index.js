var chess = require('./lib/board.js')
var myboard = chess.board.fromTextBoard(
                '....B...' +
                '........' +
                '...k....' +
                '....B...' +
                '........' +
                '....b...' +
                '.....K..' +
                '........'
            )
            
//console.log(myboard.blackpieces.debugString("\n"),"\n")
//console.log(myboard.bitboards.k.orB(myboard.bitboards.P).debugString("\n"),"\n")
//console.log("attacking\n",myboard.bitboards.black[0].pawnAttackTargets(false).debugString("\n"),"\n")
//myboard.blackToMove()
console.log(myboard.getPotentialKingMoves().debugString("\n"))
