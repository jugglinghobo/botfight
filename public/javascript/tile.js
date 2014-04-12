function Tile(arena, x, y) {
  this.arena = arena;
  this.x = x;
  this.y = y;
  this.occupant = null;
  this.adjacentTiles = new AdjacentTiles(this);
};

Tile.prototype.field = function() {
  return document.getElementById("x_"+this.x+"_y_"+this.y+"");
}

Tile.prototype.surroundings = function() {
  return {"up": this.u(), "down": this.d(), "left": this.l(), "right": this.r()};
}

Tile.prototype.u = function() {
  return this.adjacentTiles.u();
}

Tile.prototype.d = function() {
  return this.adjacentTiles.d();
}

Tile.prototype.l = function() {
  return this.adjacentTiles.l();
}

Tile.prototype.r = function() {
  return this.adjacentTiles.r();
}

Tile.prototype.addBot = function(bot) {
  this.occupant = bot;
  var field = this.field();
  field.outerHTML = this.toHtml();
}

Tile.prototype.removeBot = function(bot) {
  this.occupant = null;
  var field = this.field();
  field.innerHTML = "";
}

Tile.prototype.isOccupied = function() {
  return !!(this.occupant);
}

Tile.prototype.toHtml = function() {
  var string = "<div id='x_"+this.x+"_y_"+this.y+"' class='tile'>";
  if (this.isOccupied()) {
    string += this.occupant.toHtml();
  }
  string += "</div>";
  return string;
}

