var chess = require('./lib/board.js'),
    Vector = chess.vector
console.log(new Vector(1,1).toBitboard().debugString("\n"))