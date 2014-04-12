$(document).ready(function() {
  var arena = new Arena();
});

function Arena(width, height) {
  this.initListeners();
  this.width = width || 10;
  this.height = height || 10;
  this.bots = [];
  this.grid = [];
  this.drawGrid();
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
  this.run();
};

Arena.prototype.run = function() {
  this.playRound();
  this.draw();
  requestAnimationFrame(this.run.bind(this));
}

Arena.prototype.playRound = function() {
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

Arena.prototype.drawGrid = function() {
  for(var y = 0; y <= this.width; y++) {
    this.grid[y] = [];
    for (var x = 0; x <= this.height; x++) {
      var tile = new Tile(this, y, x);
      this.grid[y][x] = tile;
    };
  };
  this.draw();
};

Arena.prototype.draw = function() {
  var container = document.getElementById("arena");
  container.innerHTML = this.toHtml();
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

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
