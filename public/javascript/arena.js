$(document).ready(function() {
  var arena = new Arena();
  arena.draw();
});

function Arena(width, height) {
  this.initListeners();

  this.width = width || 10;
  this.height = height || 10;
  this.grid = [];
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

  $("#start_game").on("click", function(e) {
    e.preventDefault();
    arena.startGame();
  });
};

Arena.prototype.startGame = function() {
  var fps = 50;
  var arena = this;
  arena.roundCounter = 0;
  arena.maxRounds = 100;

  arena.intervalId = setInterval(function() {
    if (arena.roundCounter > arena.maxRounds) {
      clearInterval(arena.intervalId);
    };
    arena.playRound();
    arena.roundCounter += 1;
  }, 10000/fps);
};

Arena.prototype.playRound = function() {
  this.bots.forEach(function(bot) {
    var directions = bot.behaviour.directions;
    var random_dir = directions[Math.floor(Math.random()*directions.length)]
    bot.action({"move": random_dir});
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
  for(var y = 0; y <= this.width; y++) {
    this.grid[y] = [];
    for (var x = 0; x <= this.height; x++) {
      var tile = new Tile(this, y, x);
      this.grid[y][x] = tile;
    };
  };
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
