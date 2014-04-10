$(document).ready(function() {
  var arena = new Arena();
  arena.draw();
});

function Arena(width, height) {
  this.initListeners();
  this.initGrid(width, height);
  this.bots = [];
};

Arena.prototype.initListeners = function() {
  var arena = this;
  $("#add_bot").on("change", function() {
    var bot_id = $(this).val();
    if (bot_id != "") {
      arena.addBot(bot_id);
    };
  });
};

Arena.prototype.addBot = function(bot_id) {
  var load_path = "/bots/"+bot_id+".json";
  var bot = new Bot(this, load_path);
  this.bots.push(bot);
  return bot;
};

Arena.prototype.getRandomTile = function() {
  var x = getRandomInt(0, this.width);
  var y = getRandomInt(0, this.height);
  return this.grid[x][y];
};

Arena.prototype.inBounds = function(bounds, position) {
  var maxBounds = this[bounds];
  if (position < 0) {
    return position + maxBounds + 1;
  } else if (position > maxBounds) {
    return position - maxBounds - 1;
  } else {
    return position;
  };
};

Arena.prototype.initGrid = function(width, height) {
  this.width = width || 20;
  this.height = height || 20;
  this.grid = [];
  for(var x = 0; x <= this.width; x++) {
    this.grid[x] = [];
    for (var y = 0; y <= this.height; y++) {
      var tile = new Tile(this, x, y);
      this.grid[x][y] = tile;
    };
  };
};
Arena.prototype.draw = function() {
  var container = document.getElementById("arena");
  container.innerHTML = this.toHtml();
};

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
};

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
