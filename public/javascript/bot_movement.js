function BotMovement(bot) {
  this.bot = bot;
  this.maxHeight = bot.maxWidth();
  this.maxWidth = bot.maxHeight();
}

BotMovement.prototype.startTurn = function() {
}

BotMovement.prototype.finishTurn = function() {
  if (this.bot.action == "move") {
    this.bot.tile.removeBot(this.bot);
    this.bot.tile = this.bot.targetTile;
    this.bot.tile.addBot(this.bot);
  }
}

BotMovement.prototype.action = function(progress) {
  if (!this.bot.targetTile.isOccupied()) {
    this[this.bot.direction](progress);
  };
};

BotMovement.prototype.up = function(progress) {
  this.bot.y = this.bot.tile.y - this.stepSize(progress);

  // overflow handling
  if (this.bot.y < 0) {
    this.bot.y += this.maxHeight;
  };
};

BotMovement.prototype.down = function(progress) {
  this.bot.y = this.bot.tile.y + this.stepSize(progress);

  // overflow handling
  if (this.bot.y > this.maxHeight) {
    this.bot.y -= this.maxHeight;
  };
};

BotMovement.prototype.left = function(progress) {
  this.bot.x = this.bot.tile.x - this.stepSize(progress);

  // overflow handling
  if (this.bot.x < 0) {
    this.bot.x += this.maxWidth;
  };
};

BotMovement.prototype.right = function(progress) {
  this.bot.x = this.bot.tile.x + this.stepSize(progress);

  //overflow handling
  if (this.bot.x > this.maxWidth) {
    this.bot.x -= this.maxWidth;
  };
};

BotMovement.prototype.stepSize = function(progress) {
  return progress * this.bot.tile.size;
}

BotMovement.prototype.render = function(context) {
}

