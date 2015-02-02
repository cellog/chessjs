var Bitboard = require('./bitboard.js')
var chess = exports
chess.vector = Vector;

function Vector(x, y) {
 this.x = x
 this.y = y
}

Vector.prototype.set = function(x,y) {
 this.x = x
 this.y = y
}

Vector.prototype.toAlgebraic = function() {
 if (this.x < 0 || this.x > 7 || this.y < 0 || this.y > 7) {
  throw new TypeError("Invalid chess square (" + this.x + "," + this.y + ")")
 }
 var col = String.fromCharCode(this.x + 97), row = String.fromCharCode(this.y + 49)
 return col + row
}

Vector.prototype.toBitboard = function(otherVectors) {
 if (otherVectors) {
  otherVectors.push(this)
  return otherVectors.reduce(function(t,i) {return t.orB(Bitboard.from64Index(i.indexOf()))}, new Bitboard(0,0))
 }
 return Bitboard.from64Index(this.indexOf())
}

Vector.prototype.indexOf = function() {
 return this.y*8 + this.x
}

Vector.from64Index = function(index) {
 if (index < 0 || index > 63) {
  throw new Error('"' + index + '" is not a valid chessboard index')
 }
 var y = Math.floor(index / 8), x = index % 8
 return new Vector(x, y)
}

Vector.prototype.plus = function (vec) {
 return new Vector(this.x + vec.x, this.y + vec.y);
}

Vector.prototype.toString = Vector.prototype.toAlgebraic

Vector.fromBitboard = function(bitboard) {
 var squares = bitboard.to64Index(true)
 if (squares.length > 1) {
  return squares.map(function(i) {return Vector.from64Index(i)})
 }
 return [Vector.from64Index(squares[0])]
}

Vector.prototype.getConnectedRooks = function(squares) {
 if (!(squares instanceof Array)) {
  squares = [squares]
 }
 var _this = this
 return squares.reduce(function(t,i) {
  if (_this.x == i.x || _this.y == i.y) {
   t.push(i)
  }
  return t
 }, [])
}

Vector.prototype.getConnectedBishops = function(squares) {
 if (!(squares instanceof Array)) {
  squares = [squares]
 }
 var _this = this
 return squares.reduce(function(t,i) {
  if (Math.abs(_this.x - i.x) == Math.abs(_this.y - i.y)) {
   t.push(i)
  }
  return t
 }, [])
}

Vector.prototype.getConnectedQueens = function(squares) {
 if (!(squares instanceof Array)) {
  squares = [squares]
 }
 var _this = this
 return squares.reduce(function(t,i) {
  if (Math.abs(_this.x - i.x) == Math.abs(_this.y - i.y) || _this.x == i.x || _this.y == i.y) {
   t.push(i)
  }
  return t
 }, [])
}