var chess = require('./lib/board.js')
var f = chess.bitboard.fromBinary(
                '00000000' +
                '10000000' +
                '00000000' +
                '00000000' +
                '00000100' +
                '00000000' +
                '00000000' +
                '00000000'
            )
console.log(f+'',f.toAlgebraic())