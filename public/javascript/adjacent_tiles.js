function AdjacentTiles(tile) {
  this.tile = tile;
}

AdjacentTiles.prototype.up = function() {
  if (!this.u) {
    this.u = this.tile.arena.grid[this.tile.arena.inBounds("width", this.tile.x)][this.tile.arena.inBounds("height", this.tile.y-1)];
  };
  return this.u;
}

AdjacentTiles.prototype.down = function() {
  if (!this.d) {
    this.d = this.tile.arena.grid[this.tile.arena.inBounds("width", this.tile.x)][this.tile.arena.inBounds("height", this.tile.y+1)];
  };
  return this.d;
}

AdjacentTiles.prototype.left = function() {
  if (!this.l) {
    this.l = this.tile.arena.grid[this.tile.arena.inBounds("width", this.tile.x-1)][this.tile.arena.inBounds("height", this.tile.y)];
  };
  return this.l;
}

AdjacentTiles.prototype.right = function() {
  if (!this.r) {
    this.r = this.tile.arena.grid[this.tile.arena.inBounds("width", this.tile.x+1)][this.tile.arena.inBounds("height", this.tile.y)];
  };
  return this.r;
}

