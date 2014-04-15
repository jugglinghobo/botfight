function BotMotionSystem(bot) {
  this.bot = bot;
  this.maxHeight = bot.maxWidth();
  this.maxWidth = bot.maxHeight();
}

BotMotionSystem.prototype.prepareTurn = function() {
  this.bot.targetTile = this.bot.tile[this.bot.direction]();
  if (!this.bot.targetTile.isOccupied()) {
    return true;
  }
  return false;
}

BotMotionSystem.prototype.finishTurn = function() {
  if (this.bot.canExecuteAction) {
    this.bot.tile.removeBot(this.bot);
    this.bot.tile = this.bot.targetTile;
    this.bot.tile.addBot(this.bot);
  }
}

BotMotionSystem.prototype.action = function(progress) {
  if (!this.bot.targetTile.isOccupied()) {
    this[this.bot.direction](progress);
  };
};

BotMotionSystem.prototype.up = function(progress) {
  this.bot.y = this.bot.tile.y - this.stepSize(progress);

  // overflow handling
  if (this.bot.y < 0) {
    this.bot.y += this.maxHeight;
  };
};

BotMotionSystem.prototype.down = function(progress) {
  this.bot.y = this.bot.tile.y + this.stepSize(progress);

  // overflow handling
  if (this.bot.y > this.maxHeight-1) {
    this.bot.y -= this.maxHeight;
  };
};

BotMotionSystem.prototype.left = function(progress) {
  this.bot.x = this.bot.tile.x - this.stepSize(progress);

  // overflow handling
  if (this.bot.x < 0) {
    this.bot.x += this.maxWidth;
  };
};

BotMotionSystem.prototype.right = function(progress) {
  this.bot.x = this.bot.tile.x + this.stepSize(progress);

  //overflow handling
  if (this.bot.x > this.maxWidth-1) {
    this.bot.x -= this.maxWidth;
  };
};

BotMotionSystem.prototype.stepSize = function(progress) {
  return progress * this.bot.tile.size;
}

BotMotionSystem.prototype.render = function(context) {
  //var XA = this.bot.targetTile.x+8;
  //var YA = this.bot.targetTile.y+8;
  //var XE = this.bot.targetTile.size-8;
  //var YE = this.bot.targetTile.size-8;
  //context.fillStyle = "white";
  //context.fillRect(XA, YA, XE, YE);
  //context.fillStyle = "black";
}

