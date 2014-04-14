$(document).ready(function() {
  var arena = new Arena();
});

function Arena(gridWidth, gridHeight, tileSize) {
  this.gridWidth = gridWidth || 10;
  this.gridHeight = gridHeight || 10;
  this.tileSize = tileSize || 30;
  this.width = this.gridWidth * this.tileSize;
  this.height = this.gridHeight * this.tileSize;
  this.bots = [];
  this.grid = [];
  this.initGrid();
  this.initListeners();
  window.arena = this;
};

Arena.prototype.initListeners = function() {
  var arena = this;
  $("#add_bot").on("change", function() {
    var bot_id = $(this).val();
    if (bot_id != "") {
      var bot = arena.loadBot(bot_id);
      $.get("/bots/"+bot.data.id+".html", function(data) {
        $("#bot_list").prepend(data);
        var bot_node = document.getElementById("bot_"+bot.id);
        var editor = CodeEditor.initialize({"container": bot_node});
        $("#add_bot option[value="+bot.data.id+"]").remove();
        $(bot_node).find(".toggle").toggle();
        $(bot_node).find(".detoggle").toggle();
      });
    };
  });

  $("#bot_list").on("click", ".toggle_code", function(e) {
    e.preventDefault();
    var bot_node = $(this).parents(".bot");
    bot_node.find(".toggle").toggle();
    bot_node.find(".detoggle").toggle();
  });

  $("#bot_list").on("click", ".remove_bot", function(e) {
    e.preventDefault();
    var bot_node = $(this).parents(".bot");
    var bot_id = bot_node.attr("id").match(/\d+/g)[0];
    var bot_name = bot_node.find(".name").text();
    var bot = arena.removeBot(bot_id);
    if (bot) {
      $("#add_bot").append("<option value='"+bot_id+"'>"+bot_name+"</option>");
      bot_node.remove();
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
  this.fps = 20;
  this.roundCounter = 0;
  this.maxRounds = 100;
  this.progress = 0;
  this.running = true;
  this.updateActiveBot();
  this.run();
};

Arena.prototype.run = function() {
  if (this.running) {
    var arena = this;
    this.intervalId = setInterval(function() {
      //arena.requestId = requestAnimationFrame(arena.run.bind(arena));

      arena.update();
      arena.render();

    }, 1000/arena.fps);
  }
}

Arena.prototype.update = function() {
  if (this.progress == 0) {
    this.startTurn();
  }

  if (this.progress >= 1) {
    this.finishTurn();
  } else {
    this.activeBot.executeAction(this.progress);
    this.progress+=0.1;
  };

};

Arena.prototype.startTurn = function() {
  this.activeBot.startTurn();
}

Arena.prototype.finishTurn = function() {
  this.activeBot.finishTurn();
  this.updateActiveBot();
  this.progress = 0;
}

Arena.prototype.stopGame = function() {
  this.running = false;
  clearInterval(this.intervalId);
  cancelAnimationFrame(this.requestId);
}

Arena.prototype.render = function() {
  var arena = this;
  this.context.clearRect(0,0,arena.canvas.width,arena.canvas.height);
  this.renderGrid();
  this.bots.forEach(function(bot) {
    bot.render(arena.context);
  });
};


Arena.prototype.loadBot = function(bot_id) {
  var load_path = "/bots/"+bot_id+".json";
  var bot = new Bot(this, load_path);
  this.addToBots(bot);
  this.render();
  return bot;
};

Arena.prototype.removeBot = function(bot_id) {
  var bot = $.grep(this.bots, function(b){ return b.data.id == bot_id; })[0];
  if (bot) {
    bot.tile.removeBot(bot);
    this.removeFromBots(bot);
    if (this.activeBot == bot) {
      this.updateActiveBot();
    }
    delete bot;
  }
  this.render();
  return bot;
}

Arena.prototype.addToBots = function(bot) {
  this.bots.push(bot);
};

Arena.prototype.removeFromBots = function(bot) {
  var index = this.bots.indexOf(bot);
  if (index >= 0) {
    this.bots.splice(index, 1);
  };
  return bot;
}

Arena.prototype.updateActiveBot = function() {
  this.activeBot = this.bots.shift();
  if (this.activeBot) {
    this.bots.push(this.activeBot);
  } else {
    this.stopGame();
  }
  return this.activeBot;
}

Arena.prototype.getRandomFreeTile = function() {
  var tile = this.getRandomTile();
  while (tile.isOccupied()) {
    tile = this.getRandomTile();
  }
  return tile;
};

Arena.prototype.getRandomTile = function() {
  var x = getRandomInt(0, this.gridWidth-1);
  var y = getRandomInt(0, this.gridHeight-1);
  return this.grid[x][y];
}

Arena.prototype.inBounds = function(orientation, position) {
  var maxBounds = this[orientation];
  var pos;
  if (position < 0) {
    pos = position + maxBounds;
  } else if (position > maxBounds-1) {
    pos = position - maxBounds;
  } else {
    pos = position;
  };
  return pos;
};

Arena.prototype.initGrid = function() {
  for(var x = 0; x < this.gridWidth; x++) {
    this.grid[x] = [];
    for (var y = 0; y < this.gridHeight; y++) {
      var tile = new Tile(this, x, y, this.tileSize);
      this.grid[x][y] = tile;
    };
  };
  this.canvas = this.getCanvas();
  this.context = this.canvas.getContext("2d");
  this.canvas.width = this.width+10;
  this.canvas.height = this.width+10;
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
