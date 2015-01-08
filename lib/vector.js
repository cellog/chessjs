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

Vector.prototype.toChessSquare = function() {
 if (this.x < 0 || this.x > 7 || this.y < 0 || this.y > 7) {
  throw new TypeError("Invalid chess square (" + this.x + "," + this.y + ")")
 }
 var col = String.fromCharCode(this.x + 97), row = String.fromCharCode(this.y + 49)
 return col + row
}

Vector.prototype.indexOf = function() {
 return this.y*8 + this.x
}

Vector.fromIndex = function(index) {
 if (index < 0 || index > 63) {
  throw new Error('"' + index + '" is not a valid chessboard index')
 }
 var y = Math.floor(index / 8), x = index % 8
 return new Vector(x, y)
}

Vector.prototype.plus = function (vec) {
 return new Vector(this.x + vec.x, this.y + vec.y);
}

Vector.prototype.toString = Vector.prototype.toChessSquare