$(document).ready(function() {
  var arena = new Arena();
});

function Arena(width, height) {
  this.initListeners();
  this.width = width || 10;
  this.height = height || 10;
  this.bots = [];
  this.grid = [];
  this.initGrid();
};

Arena.prototype.initListeners = function() {
  var arena = this;
  $("#add_bot").on("change", function() {
    var bot_id = $(this).val();
    if (bot_id != "") {
      arena.addBot(bot_id);
    };
  });

  $("#start_game").on("click", function(e) {
    e.preventDefault();
    arena.startGame();
    $(this).css("display", "none");
    $("#stop_game").css("display", "inline-block");
  });

  $("#stop_game").on("click", function(e) {
    e.preventDefault();
    arena.stopGame();
    $(this).css("display", "none");
    $("#start_game").css("display", "inline-block");
  });
};

Arena.prototype.startGame = function() {
  var fps = 50;
  var arena = this;
  arena.roundCounter = 0;
  arena.maxRounds = 100;
  this.lastTime;
  this.run();
};

Arena.prototype.run = function() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  this.playRound(dt);
  this.draw();
  lastTime = now;
  requestAnimationFrame(this.run.bind(this));
}

Arena.prototype.playRound = function(delta) {
  this.bots.forEach(function(bot) {
    bot.action();
  });
};

Arena.prototype.stopGame = function() {
  clearInterval(this.intervalId);
}

Arena.prototype.addBot = function(bot_id) {
  var load_path = "/bots/"+bot_id+".json";
  var bot = new Bot(this, load_path);
  this.bots.push(bot);
  this.draw();
  return bot;
};

Arena.prototype.getRandomFreeTile = function() {
  var tile = this.getRandomTile();
  while (tile.isOccupied()) {
    tile = this.getRandomTile();
  }
  return tile;
};

Arena.prototype.getRandomTile = function() {
  var x = getRandomInt(0, this.width);
  var y = getRandomInt(0, this.height);
  return this.grid[x][y];
}

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

Arena.prototype.initGrid = function() {
  var tileSize = 20;
  for(var y = 0; y <= this.width; y++) {
    this.grid[y] = [];
    for (var x = 0; x <= this.height; x++) {
      // inverted for correct x/y layout
      var tileX = y*tileSize;
      var tileY = x*tileSize;
      var tile = new Tile(this, tileX, tileY);
      this.grid[y][x] = tile;
    };
  };
  var canvas = this.getCanvas();
  this.context = canvas.getContext("2d");
  canvas.width = this.width*tileSize;
  canvas.height = this.height*tileSize;
  this.draw();
};

Arena.prototype.draw = function() {
  var arena = this;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      tile.draw(arena.context);
    });
  });
};

Arena.prototype.toHtml = function() {
  var string = "";
  this.grid.forEach(function(row) {
    string += "<div class='tile_row'>"
    row.forEach(function(tile) {
      string += tile.toHtml();
    });
    string += "</div>"
  });
  return string;
};

Arena.prototype.getCanvas = function() {
  return document.getElementById("arena");
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
