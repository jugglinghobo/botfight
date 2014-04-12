$(document).ready(function() {
  var arena = new Arena();
});

function Arena(width, height, tileSize) {
  this.width = width || 10;
  this.height = height || 10;
  this.tileSize = tileSize || 20;
  this.bots = [];
  this.grid = [];
  this.initGrid();
  this.initListeners();
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
  var fps = 4;
  var arena = this;
  arena.roundCounter = 0;
  arena.maxRounds = 100;
  this.lastTime = 0;
  this.run();
};

function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
        // Drawing code goes here
    }, 1000 / fps);
}

Arena.prototype.run = function() {
  var arena = this;
  setTimeout(function() {
    arena.requestId = requestAnimationFrame(arena.run.bind(arena));

    arena.render();
    arena.update();
  }, 1000/arena.fps);
}

Arena.prototype.update = function(delta) {
  if (this.activeBot.hasFinishedAction) {
    this.bots.push(this.activeBot);
    this.activeBot = this.bots.shift();
  };
  this.activeBot.action();
};

Arena.prototype.stopGame = function() {
  this.bots.push(this.activeBot);
  cancelAnimationFrame(this.requestId);
}

Arena.prototype.render = function() {
  this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  this.renderGrid();
  this.activeBot.render(this.context);
};


Arena.prototype.addBot = function(bot_id) {
  var load_path = "/bots/"+bot_id+".json";
  var bot = new Bot(this, load_path);
  this.activeBot = bot;
  this.render();
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
  var y = getRandomInt(0, this.width);
  return this.grid[x][y];
}

Arena.prototype.inBounds = function(bounds, position) {
  var maxBounds = this[bounds];
  if (position < 0) {
    return position + maxBounds;
  } else if (position > maxBounds) {
    return position - maxBounds;
  } else {
    return position;
  };
};

Arena.prototype.initGrid = function() {
  for(var x = 0; x < this.width; x++) {
    this.grid[x] = [];
    for (var y = 0; y < this.height; y++) {
      var tile = new Tile(this, x, y, this.tileSize);
      this.grid[x][y] = tile;
    };
  };
  this.canvas = this.getCanvas();
  this.context = this.canvas.getContext("2d");
  this.canvas.width = this.grid.length*this.tileSize;
  this.canvas.height = this.grid.length*this.tileSize;
  this.renderGrid();
};

Arena.prototype.renderGrid = function() {
  var arena = this;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      tile.render(arena.context);
    });
  });
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
