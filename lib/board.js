var chess = exports,
    Bitboard = require('./bitboard.js')
chess.board = board
chess.bitboard = Bitboard

var Pawn = 0,
    Rook = 1,
    Knight = 2,
    Bishop = 3,
    Queen = 4,
    King = 5,
    All = 6

function board(setup) {
 this.bitboards = {
  white: [
   new Bitboard(0x00000000,0x00ff0000, 'P'), // white pawns
   new Bitboard(0x00000000,0x81000000, 'R'), // white rooks
   new Bitboard(0x00000000,0x42000000, 'N'), // white knights
   new Bitboard(0x00000000,0x24000000, 'B'), // white bishops
   new Bitboard(0x00000000,0x10000000, 'Q'), // white queens
   new Bitboard(0x00000000,0x08000000, 'K'), // white king
  ],
  black: [
   new Bitboard(0x0000ff00,0x00000000, 'p'), // black pawns
   new Bitboard(0x00000081,0x00000000, 'r'), // black rooks
   new Bitboard(0x00000042,0x00000000, 'n'), // black knights
   new Bitboard(0x00000024,0x00000000, 'b'), // black bishops
   new Bitboard(0x00000010,0x00000000, 'q'), // black queens
   new Bitboard(0x00000008,0x00000000, 'k'), // black king
  ],
  cache: {
   empty: null,
   both: null,
   white: null,
   black: null
  },
  get p() {return this.black[0]},
  get P() {return this.white[0]},
  get r() {return this.black[1]},
  get R() {return this.white[1]},
  get n() {return this.black[2]},
  get N() {return this.white[2]},
  get b() {return this.black[3]},
  get B() {return this.white[3]},
  get q() {return this.black[4]},
  get Q() {return this.white[4]},
  get k() {return this.black[5]},
  get K() {return this.white[5]},

  set p(t) {this.black[0] = new Bitboard(t, 'p')},
  set P(t) {this.white[0] = new Bitboard(t, 'P')},
  set r(t) {this.black[1] = new Bitboard(t, 'r')},
  set R(t) {this.white[1] = new Bitboard(t, 'R')},
  set n(t) {this.black[2] = new Bitboard(t, 'n')},
  set N(t) {this.white[2] = new Bitboard(t, 'N')},
  set b(t) {this.black[3] = new Bitboard(t, 'b')},
  set B(t) {this.white[3] = new Bitboard(t, 'B')},
  set q(t) {this.black[4] = new Bitboard(t, 'q')},
  set Q(t) {this.white[4] = new Bitboard(t, 'Q')},
  set k(t) {this.black[5] = new Bitboard(t, 'k')},
  set K(t) {this.white[5] = new Bitboard(t, 'K')},
 }
}

board.prototype = {
 toIndex: function(square) {
  square = square.toString()
  if (square.length != 2 || !square.match(/[a-h][1-8]/)) {
   throw new Error("Invalid input \"" + square + "\"");
  }
  return square.toLowerCase().charCodeAt(0) - 97 + (square.charCodeAt(1) - 49)*8
 },

 squareName: function(index) {
  var file = index % 8,
      rank = Math.floor(index / 8)
  return String.fromCharCode(file + 97) + String.fromCharCode(rank + 49)
 },

 get whitepieces() {
  if (!!this.bitboards.cache.white) {
   return this.bitboards.cache.white
  }
  return this.bitboards.cache.white = this.bitboards.white.reduce(function(total, val) {
   return total.orB(val)
  })
 },

 get blackpieces() {
  if (!!this.bitboards.cache.black) {
   return this.bitboards.cache.black
  }
  return this.bitboards.cache.black = this.bitboards.black.reduce(function(total, val) {
   return total.orB(val)
  })
 },

 get both() {
  if (!!this.bitboards.cache.both) {
   return this.bitboards.cache.both
  }
  return this.bitboards.cache.both = this.whitepieces.orB(this.blackpieces)
 },
 get emptysquares() {
  if (!!this.bitboards.cache.empty) {
   return this.bitboards.cache.empty
  }
  return this.bitboards.cache.empty = this.both.not()
 },

 textBoard: function(divider) {
  divider = divider || ''
  var boards = this.bitboards.white.concat(this.bitboards.black).map(function(i) {
   return i.toArray()
  });
  ret = '';
  for (var i = 0; i < 64; i++) {
   if (i > 0 && (i % 8 == 0)) {
    ret += divider
   }
   ret += boards.reduce(function(t, item) {
    if (item[i] !=  ' ') return item[i]
    return t
   }, ' ')
  }
  return ret
 },

 get mapBoard() {
  var board = this.textBoard().match(/.{8}/g).reverse().join('')
  var ret = {}
  for (var i = 0; i < board.length; i++) {
   ret[this.squareName(i)] = board[i]
  }
  return ret
 }
}
