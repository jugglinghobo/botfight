$(document).ready(function() {
  var arena = new Arena();
});

function Arena(gridWidth, gridHeight, tileSize) {
  this.gridWidth = gridWidth || 5;
  this.gridHeight = gridHeight || 5;
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

  // add bot
  $("#add_bot").on("change", function() {
    var botId = $(this).val();
    if (botId != "") {
      arena.loadBot(botId);
    };
  });

  // remove bot
  $("#bot_list").on("click", ".remove_bot", function(e) {
    e.preventDefault();
    var botNode = $(this).parents(".bot");
    var botId = botNode.find(".bot_id").val();
    arena.removeBot(botId);
  });

  // toggle code visibility
  $("#bot_list").on("click", ".toggle_code", function(e) {
    e.preventDefault();
    var botNode = $(this).parents(".bot");
    toggleContent(botNode);
  });

  // update code
  $("#bot_list").on("submit", ".bot_form", function(e) {
    e.preventDefault();
    var botNode = $(this);
    var data = {};
    data["bot"] = {
      id: botNode.find(".bot_id").val(),
      name: botNode.find(".bot_name").val(),
      author: botNode.find(".bot_author").val(),
      color: botNode.find(".bot_color").val(),
      code: botNode.find(".bot_code").val(),
    };

    $.ajax({
      url: path = botNode.attr("action"),
      data: data,
      method: "post",
      dataType: "json",
      success: function(data) {
        var botId = data.id;
        arena.replaceBot(botId);
      },
    });
  });

  $("#start_game").on("click", function(e) {
    e.preventDefault();
    arena.startGame();
  });

  $("#stop_game").on("click", function(e) {
    e.preventDefault();
    arena.stopGame();
  });

};

Arena.prototype.startGame = function() {
  $("#start_game").css("display", "none");
  $("#stop_game").css("display", "inline-block");
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
      if (arena.activeBot) {
        arena.update();
        arena.render();
      };
    }, 1000/arena.fps);
  }
};

Arena.prototype.stopGame = function() {
  this.running = false;
  this.bots.forEach(function(bot) {
    bot.resetPosition();
  });
  this.render();
  clearInterval(this.intervalId);
  cancelAnimationFrame(this.requestId);
  $("#stop_game").css("display", "none");
  $("#start_game").css("display", "inline-block");
};

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
  this.activeBot.prepareTurn();
}

Arena.prototype.finishTurn = function() {
  this.activeBot.finishTurn();
  this.updateActiveBot();
  this.progress = 0;
}

Arena.prototype.render = function() {
  var arena = this;
  this.context.clearRect(0,0,arena.canvas.width,arena.canvas.height);
  this.renderGrid();
  this.bots.forEach(function(bot) {
    bot.render(arena.context);
  });
};

Arena.prototype.replaceBot = function(botId) {
  var wasRunning = this.running;
  this.stopGame();
  var oldBot = this.removeBot(botId, false);
  this.loadBot(botId, oldBot);
  if (wasRunning) {
    this.startGame();
  }

}

Arena.prototype.loadBot = function(botId, oldBot) {
  var botPath = "/bots/"+botId;
  var initialTile;
  if (oldBot) {
    initialTile = oldBot.tile;
  }
  var bot = new Bot(this, botPath+".json", initialTile);

  this.addToBots(bot);

  this.render();

  var arena = this;
  $.get(botPath+".html", function(botHtml) {
    var botNode = document.getElementById("bot_"+bot.data.id);
    if (oldBot) {
      $(botNode).replaceWith(botHtml);
    } else {
      $("#bot_list").prepend(botHtml);
    }
    // resetting because content changed
    var botNode = document.getElementById("bot_"+bot.data.id);
    var editor = CodeEditor.initialize({"container": botNode});
    $("#add_bot option[value="+bot.data.id+"]").remove();

    if (!oldBot) {
      toggleContent($(botNode));
    }
  });
  return bot;
};

Arena.prototype.removeBot = function(botId, removeHtml) {
  var bot = this.getBot(botId);
  var removeHtml = (removeHtml == undefined) ? true : removeHtml;
  if (bot) {
    bot.tile.removeBot(bot);
    this.removeFromBots(bot);
    if (this.activeBot == bot) {
      this.updateActiveBot();
    }
    if (removeHtml) {
      $("#add_bot").append("<option value='"+bot.data.id+"'>"+bot.data.name+"</option>");
      var botNode = $("#bot_"+bot.data.id);
      botNode.remove();
    }
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

Arena.prototype.getBot = function(botId) {
  return $.grep(this.bots, function(b){ return b.data.id == botId; })[0];
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

function getCodeEditor(container) {
  //Get a reference to the CodeMirror editor
  var editor = $(container).find('.CodeMirror')[0].CodeMirror;
  return editor;
}

function toggleContent(container) {
  var visible = container.find(".show");
  var hidden = container.find(".hidden");
  visible.removeClass("show").addClass("hidden");
  hidden.removeClass("hidden").addClass("show");
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
