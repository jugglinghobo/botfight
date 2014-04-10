function Tile(arena, x, y) {
  this.arena = arena;
  this.x = x;
  this.y = y;
  this.isOccupied = false;
  this.occupants = [];
  this.adjacentTiles = new AdjacentTiles(this);
};

Tile.prototype.field = function() {
  return document.getElementById("x_"+this.x+"_y_"+this.y+"");
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
  this.occupants.push(bot);
  var field = this.field();
  field.outerHTML = this.toHtml();
}

Tile.prototype.removeBot = function(bot) {
  this.field.innerHTML = "";
}

Tile.prototype.toHtml = function() {
  var string = "<div id='x_"+this.x+"_y_"+this.y+"' class='tile'>";
  this.occupants.forEach(function(occupant) {
    string += occupant.toHtml();
  });
  string += "</div>";
  return string;
}

