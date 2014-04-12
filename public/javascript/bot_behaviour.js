function BotBehaviour(bot) {
  this.bot = bot;
  this.actions = ["move"];
  this.directions = ["up", "down", "left", "right"];
  this.maxWidth = this.bot.arena.width*this.bot.arena.tileSize;
  this.maxHeight = this.bot.arena.height*this.bot.arena.tileSize;
  this.stepSize = 1;
};

BotBehaviour.prototype.execute = function(action, direction) {
  this[action](direction);
};

BotBehaviour.prototype.move = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  if (nextTile.isOccupied()) {
    this.bot.hasFinishedAction = true;
  } else {
    // calls direction function
    this[direction](nextTile);

    if (this.bot.hasFinishedAction) {
      this.bot.currentTile = nextTile;
      currentTile.removeBot(this.bot);
      nextTile.addBot(this.bot);
    };
  };
};

BotBehaviour.prototype.up = function(nextTile) {
  this.bot.positionY -= this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  }
  if (this.bot.positionY < 0) {
    this.bot.positionY += this.maxHeight;
  };
};

BotBehaviour.prototype.down = function(nextTile) {
  this.bot.positionY += this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionY > this.maxHeight) {
    this.bot.positionY -= this.maxHeight;
  };
};

BotBehaviour.prototype.left = function(nextTile) {
  this.bot.positionX -= this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionX < 0) {
    this.bot.positionX += this.maxWidth;
  };
};

BotBehaviour.prototype.right = function(nextTile) {
  this.bot.positionX += this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionX > this.maxWidth) {
    this.bot.positionX -= this.maxWidth;
  };
};

BotBehaviour.prototype.botReachedTile = function(tile) {
  return ((tile.positionX-3 <= this.bot.positionX && tile.positionX+3 >= this.bot.positionX)
      && (tile.positionY-3 <= this.bot.positionY && tile.positionY+3 >= this.bot.positionY))
}


BotBehaviour.prototype.attack = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  nextTile.dealDamage();
};
