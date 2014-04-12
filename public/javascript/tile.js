function Tile(arena, x, y) {
  this.arena = arena;
  this.width = 20;
  this.height = 20;
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.occupant = null;
  this.adjacentTiles = new AdjacentTiles(this);
};

Tile.prototype.domElement = function() {
  return document.getElementById("x_"+this.x+"_y_"+this.y+"");
}

Tile.prototype.surroundings = function() {
  return {"up": this.up(), "down": this.down(), "left": this.left(), "right": this.right()};
}

Tile.prototype.up = function() {
  return this.adjacentTiles.u();
}

Tile.prototype.down = function() {
  return this.adjacentTiles.d();
}

Tile.prototype.left = function() {
  return this.adjacentTiles.l();
}

Tile.prototype.right = function() {
  return this.adjacentTiles.r();
}

Tile.prototype.addBot = function(bot) {
  this.occupant = bot;
}

Tile.prototype.removeBot = function(bot) {
  this.occupant = null;
}

Tile.prototype.dealDamage = function() {
  var field = this.domElement();
  $(field).addClass("explosion");
}

Tile.prototype.isOccupied = function() {
  return !!(this.occupant);
}

Tile.prototype.draw = function(context) {
  context.strokeRect(this.x, this.y, this.width, this.height);
  if (this.isOccupied()) {
    this.occupant.draw(context);
  }
}

Tile.prototype.toHtml = function() {
  var string = "<div id='x_"+this.x+"_y_"+this.y+"' class='tile'>";
  if (this.isOccupied()) {
    string += this.occupant.toHtml();
  }
  string += "</div>";
  return string;
}

