function AdjacentTiles(tile) {
  this.tile = tile;
}

AdjacentTiles.prototype.up = function() {
  if (!this.u) {
    this.u = this.tile.arena.grid[this.tile.arena.inBounds("gridWidth", this.tile.gridX)][this.tile.arena.inBounds("gridHeight", this.tile.gridY-1)];
  };
  return this.u;
}

AdjacentTiles.prototype.down = function() {
  if (!this.d) {
    this.d = this.tile.arena.grid[this.tile.arena.inBounds("gridWidth", this.tile.gridX)][this.tile.arena.inBounds("gridHeight", this.tile.gridY+1)];
  };
  return this.d;
}

AdjacentTiles.prototype.left = function() {
  if (!this.l) {
    this.l = this.tile.arena.grid[this.tile.arena.inBounds("gridWidth", this.tile.gridX-1)][this.tile.arena.inBounds("gridHeight", this.tile.gridY)];
  };
  return this.l;
}

AdjacentTiles.prototype.right = function() {
  if (!this.r) {
    this.r = this.tile.arena.grid[this.tile.arena.inBounds("gridWidth", this.tile.gridX+1)][this.tile.arena.inBounds("gridHeight", this.tile.gridY)];
  };
  return this.r;
}

