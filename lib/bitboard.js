module.exports = Bitboard

var notAFile = 0x7f7f7f7f>>>0,
    notHFile = 0xfefefefe>>>0,
    notABFile = 0x3f3f3f3f>>>0,
    notGHFile = 0xfcfcfcfc>>>0

function Bitboard() {
 var ret
 if (arguments[0] && arguments[0] instanceof Bitboard) {
  this.l = arguments[0].l|0
  this.h = arguments[0].h|0
  this.piece = arguments[1] || arguments[0].piece
 } else {
  this.l = arguments[0]|0
  this.h = arguments[1]|0
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
 get notAFile() { return notAFile },
 get notHFile() { return notHFile },
 get notABFile() { return notABFile },
 get notGHFile() { return  notGHFile },

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

 shl: function(b) {
  return new Bitboard(this.l << b, (this.h << b) | (this.l >>> 32-b), this.piece)
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
 
 fillOcclusion: function(p, func, d1, d2, d3)
 {
  var g = this
  g = g.orB(p.andB(func.bind(g, d1).call()))
  p = p.andB(func.bind(p, d1).call())
  g = g.orB(p.andB(func.bind(g, d2).call()))
  p = p.andB(func.bind(p, d2).call())
  return g.orB(p.andB(func.bind(g, d3).call()))
 },

 fillUpOcclusion: function(p) {
  return this.fillOcclusion(p, this.shr, 8, 16, 32)
 },
 fillDownOcclusion: function(p) {
  return this.fillOcclusion(p, this.shl, 8, 16, 32)
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
 rookMovesUp: function(empty) {
  return this.fillUpOcclusion(empty).andB(this.not())
 },
 rookMovesDown: function(empty) {
  return this.fillDownOcclusion(empty).andB(this.not())
 }
}