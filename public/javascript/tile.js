function Tile(x, y) {
  this.x = x;
  this.y = y;
  this.isOccupied = false;
};

Tile.prototype.toHtml = function() {
  return "<div id='x_"+this.x+"_y_"+this.y+"' class='tile'></div>"
}

