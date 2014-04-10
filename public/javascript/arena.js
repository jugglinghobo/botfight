$(document).ready(function() {
  var arena = new Arena();
  arena.draw();
});

function Arena(gridWidth, gridHeight) {
  this.gridWidth = gridWidth || 20;
  this.gridHeight = gridHeight || 20;
  this.grid = [];
  for(var x = 0; x <= this.gridWidth; x++) {
    this.grid[x] = []
    for (var y = 0; y <= this.gridHeight; y++) {
      var tile = new Tile(x, y);
      this.grid[x][y] = tile;
    }
  }
};

Arena.prototype.draw = function() {
  var container = document.getElementById("arena");
  container.innerHTML = this.toHtml();
}

Arena.prototype.toHtml = function() {
  var string = "";
  this.grid.forEach(function(column) {
    string += "<div class='tile_row'>"
    column.forEach(function(tile) {
      string += tile.toHtml();
    });
    string += "</div>"
  });
  return string;
}
