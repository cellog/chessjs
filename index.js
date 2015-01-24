var chess = require('./lib/board.js')
var myboard = chess.board.fromTextBoard(
                '++++++++|' +
                '+N++++++|' +
                '+++k++++|' +
                '+++P+P++|' +
                '++++++p+|' +
                '++++bp++|' +
                '+r++K+++|' +
                '+++Q++++', '|'
            )
//console.log(myboard.blackpieces.debugString("\n"),"\n")
//console.log(myboard.bitboards.k.orB(myboard.bitboards.P).debugString("\n"),"\n")
//console.log("attacking\n",myboard.bitboards.black[0].pawnAttackTargets(false).debugString("\n"),"\n")
//myboard.blackToMove()
console.log(myboard.getPotentialKingMoves(false, myboard.bitboards.K, myboard.whitepieces).debugString("\n"))
