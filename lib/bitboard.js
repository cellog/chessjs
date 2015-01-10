module.exports = Bitboard

var notAFile = 0x7f7f7f7f>>>0,
    notHFile = 0xfefefefe>>>0,
    notABFile = 0x3f3f3f3f>>>0,
    notGHFile = 0xfcfcfcfc>>>0

function Bitboard() {
 var ret
 if (!!arguments[0] && arguments[0].isBitboard) {
  this.l = arguments[0].l>>>0
  this.h = arguments[0].h>>>0
  this.piece = arguments[1] || arguments[0].piece
 } else {
  this.l = arguments[0]>>>0
  this.h = arguments[1]>>>0
  this.piece = arguments[2] || 'X'
 }
}

Bitboard.fromBinary = function(bin, piece) {
 var high = parseInt(bin.slice(0,32), 2), low = parseInt(bin.slice(-32), 2),
     // flip the board so a1 is in the lower right
     flip = Bitboard.verticalFlip(low, high)
 high = flip.high
 low = flip.low
 return new Bitboard(low, high, piece)
}

Bitboard.verticalFlip = function (low, high) {
 var newhigh = 0, newlow = 0
 // swap 1st/8th
 newhigh |= low << 24
 newlow  |= high >>> 24
 // swap 2nd/7th
 newhigh |= low << 8 & 0x00ff0000
 newlow  |= high >>> 8 & 0xff00
 // swap 3rd/6th
 newhigh |= low >>> 8 & 0x00ff00
 newlow  |= high << 8 & 0xff0000
 // swap 4th/5th
 newhigh |= low >>> 24
 newlow |= high << 24
 return {high: newhigh, low: newlow}
}
Bitboard.prototype = {
 get isBitboard() { return true },
 get notAFile() { return notAFile },
 get notHFile() { return notHFile },
 get notABFile() { return notABFile },
 get notGHFile() { return  notGHFile },
 get rank4() { return new Bitboard(rank4) },
 get rank5() { return new Bitboard(rank5) },

 debugString: function(divider) {
  var upper = this.l,
      lower = this.h,
      pad = '00000000',
      // flip the board so a1 is in the lower right
      flip = Bitboard.verticalFlip(lower, upper)
  lower = flip.low
  upper = flip.high
  lower = (lower >>> 0).toString(2)
  upper = (upper >>> 0).toString(2)
  pad += pad
  pad += pad
  var thing = (pad + lower).slice(-32) + (pad + upper).slice(-32)
  if (divider) {
   return thing.match(/.{8}/g).join(divider)
  }
  return thing
 },
 toArray: function() {
  return this.debugString().replace(/0/g, ' ').replace(/1/g, this.piece).split('')
 },

 BIGshl: function(b) {
  return new Bitboard(0, (this.l << (b-32)), this.piece)
 },
 shl: function(b) {
  return new Bitboard(this.l << b, (this.h << b) | (this.l >>> (32-b)), this.piece)
 },
 BIGshr: function(b) {
  return new Bitboard(this.h >>> (b-32), 0, this.piece)
 },
 shr: function(b) {
  return new Bitboard((this.l >>> b) | (this.h << (32-b)), this.h >>> b, this.piece)
 },
 and: function(a) {
  return new Bitboard(this.l & a, this.h & a, this.piece)
 },
 andB: function(a) {
  return new Bitboard((this.l & a.l) >>> 0, (this.h & a.h) >>> 0, this.piece)
 },
 or: function(a) {
  return new Bitboard(this.l | a, this.h | a, this.piece)
 },
 orB: function(a) {
  return new Bitboard(this.l | a.l, this.h | a.h, this.piece)
 },
 not: function() {
  return new Bitboard(~this.l >>> 0, ~this.h >>> 0, this.piece)
 },
 southFill: function() {
  var l1 = this.shl(8).orB(this),
      l2 = l1.shl(16).orB(l1)
  return l2.orB({l:0, h:l2.l})
 },
 northFill: function() {
  var l1 = this.shr(8).orB(this),
      l2 = l1.shr(16).orB(l1)
  return l2.orB({l:l2.h, h:0})
 },
 southOne: function() {
  return this.shl(8)
 },
 northOne: function() {
  return this.shr(8)
 },
 westOne: function() {
  return this.shl(1).and(notHFile)
 },
 northwestOne: function() {
  return this.shr(7).and(notHFile)
 },
 southwestOne: function() {
  return this.shl(9).and(notHFile)
 },
 eastOne: function() {
  return this.shr(1).and(notAFile)
 },
 northeastOne: function() {
  return this.shr(9).and(notAFile)
 },
 southeastOne: function() {
  return this.shl(7).and(notAFile)
 },
 
 fillOcclusion: function(p, func, d1, d2, d3, d4)
 {
  var g = this, last = d4 || func
  g = g.orB(p.andB(func.bind(g, d1).call()))
  p = p.andB(func.bind(p, d1).call())
  g = g.orB(p.andB(func.bind(g, d2).call()))
  p = p.andB(func.bind(p, d2).call())
  return g.orB(p.andB(last.bind(g, d3).call()))
 },

 fillUpOcclusion: function(p) {
  return this.fillOcclusion(p, this.shr, 8, 16, 32)
 },
 fillDownOcclusion: function(p) {
  return this.fillOcclusion(p, this.shl, 8, 16, 32)
 },
 fillEastOcclusion: function(p) {
  return this.fillOcclusion(p.and(notAFile), this.shr, 1, 2, 4)
 },
 fillWestOcclusion: function(p) {
  return this.fillOcclusion(p.and(notHFile), this.shl, 1, 2, 4)
 },
 fillNortheastOcclusion: function(p) {
  return this.fillOcclusion(p.and(notAFile), this.shr, 9, 18, 36, this.BIGshr)
 },
 fillSouthwestOcclusion: function(p) {
  return this.fillOcclusion(p.and(notHFile), this.shl, 9, 18, 36, this.BIGshl)
 },
 fillSoutheastOcclusion: function(p) {
  return this.fillOcclusion(p.and(notAFile), this.shl, 7, 14, 28)
 },
 fillNorthwestOcclusion: function(p) {
  return this.fillOcclusion(p.and(notHFile), this.shr, 7, 14, 28)
 },

 pawnSingleMoves: function(empty, white) {
  var op = !!white ? this.northOne : this.southOne
  return op.bind(this)().andB(empty)
 },
 pawnDoubleMoves: function(empty, white) {
  var op = !!white ? this.northOne : this.southOne,
      rank = !!white ? rank4 : rank5,
      start = op.bind(this)().andB(empty)
  return op.bind(start)().andB(rank).andB(empty)
 },
 pushablePawns: function(empty, white) {
  var op = !!white ? this.southOne : this.northOne
  return this.andB(op.bind(empty)())
 },
 pawnAttackTargets: function(white) {
  if (!!white) {
   return this.northeastOne().orB(this.northwestOne())
  } else {
   return this.southeastOne().orB(this.southwestOne())
  }
 },
 attackingPawns: function(enemies, white) {
  return enemies.pawnAttackTargets(!white).andB(this)
 },
 
 knightJumps: function() {
  var m = this
      l1 = m.shr(1).and(notAFile),
      l2 = m.shr(2).and(notABFile),
      r1 = m.shl(1).and(notHFile),
      r2 = m.shl(2).and(notGHFile),
      h1 = l1.orB(r1),
      h2 = l2.orB(r2),
      res = h1.shl(16).orB(h1.shr(16)).orB(h2.shl(8)).orB(h2.shr(8))
  
  return new Bitboard(res.l, res.h, this.piece)
 },
 kingMoves: function() {
  var m = this,
      h = m.shr(1).and(notAFile).orB(m.shl(1)).and(notHFile),
      v = m.shl(8).orB(m.shr(8)),
      res = h.shl(8).orB(h).orB(h.shr(8)).orB(v)
  return new Bitboard(res.l, res.h, this.piece)
 },
 rookMoves: function(empty) {
  return this.fillUpOcclusion(empty)
         .orB(this.fillDownOcclusion(empty))
         .orB(this.fillEastOcclusion(empty))
         .orB(this.fillWestOcclusion(empty))
         .andB(this.not())
 },
 bishopMoves: function(empty) {
  return this.fillNortheastOcclusion(empty)
         .orB(this.fillSoutheastOcclusion(empty))
         .orB(this.fillSouthwestOcclusion(empty))
         .orB(this.fillNorthwestOcclusion(empty))
         .andB(this.not())
 },
 queenMoves: function(empty) {
  return this.fillUpOcclusion(empty)
         .orB(this.fillDownOcclusion(empty))
         .orB(this.fillEastOcclusion(empty))
         .orB(this.fillWestOcclusion(empty))
         .orB(this.fillNortheastOcclusion(empty))
         .orB(this.fillSoutheastOcclusion(empty))
         .orB(this.fillSouthwestOcclusion(empty))
         .orB(this.fillNorthwestOcclusion(empty))
         .andB(this.not())
 },
 pawnMoves: function(empty, enemies, white) {
  return this.pawnSingleMoves(empty, white).orB(this.pawnDoubleMoves(empty, white))
         .orB(enemies.attackingPawns(this, !white))
 },

 kingAttackTargets: function() {
  return this.kingMoves()
 },
 rookAttackTargets: function(empty) {
  return this.fillUpOcclusion(empty).northOne()
         .orB(this.fillDownOcclusion(empty).southOne())
         .orB(this.fillEastOcclusion(empty).eastOne())
         .orB(this.fillWestOcclusion(empty).westOne())
 },
 bishopAttackTargets: function(empty) {
  return this.fillNortheastOcclusion(empty).northeastOne()
         .orB(this.fillSoutheastOcclusion(empty).southeastOne())
         .orB(this.fillSouthwestOcclusion(empty).southwestOne())
         .orB(this.fillNorthwestOcclusion(empty).northwestOne())
 },
 queenAttackTargets: function(empty) {
  return this.fillUpOcclusion(empty).northOne()
         .orB(this.fillDownOcclusion(empty).southOne())
         .orB(this.fillEastOcclusion(empty).eastOne())
         .orB(this.fillWestOcclusion(empty).westOne())
         .orB(this.fillNortheastOcclusion(empty).northeastOne())
         .orB(this.fillSoutheastOcclusion(empty).southeastOne())
         .orB(this.fillSouthwestOcclusion(empty).southwestOne())
         .orB(this.fillNorthwestOcclusion(empty).northwestOne())
 }
}

var rank4 = new Bitboard(0,0xff),
    rank5 = new Bitboard(0xff000000>>>0)
