function Tile(arena, x, y, tileSize) {
  this.arena = arena;
  this.x = x;
  this.y = y;
  this.positionX = x*tileSize;
  this.positionY = y*tileSize;
  this.width = tileSize;
  this.height = tileSize;
  this.occupant = null;
  this.adjacentTiles = new AdjacentTiles(this);
};

Tile.prototype.surroundings = function() {
  return {"up": this.up(), "down": this.down(), "left": this.left(), "right": this.right()};
}

Tile.prototype.up = function() {
  return this.adjacentTiles.up();
}

Tile.prototype.down = function() {
  return this.adjacentTiles.down();
}

Tile.prototype.left = function() {
  return this.adjacentTiles.left();
}

Tile.prototype.right = function() {
  return this.adjacentTiles.right();
}

Tile.prototype.addBot = function(bot) {
  this.occupant = bot;
}

Tile.prototype.removeBot = function(bot) {
  this.occupant = null;
}

Tile.prototype.dealDamage = function(damage) {
  this.occupant.takeDamage(damage);
}

Tile.prototype.isOccupied = function() {
  return !!(this.occupant);
}

Tile.prototype.render = function(context) {
  context.strokeRect(this.positionX, this.positionY, this.width, this.height);
}
