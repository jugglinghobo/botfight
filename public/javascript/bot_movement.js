function BotMovement(bot) {
  this.bot = bot;
  this.directions = ["up", "down", "left", "right"];
  this.maxWidth = this.bot.arena.width*this.bot.arena.tileSize;
  this.maxHeight = this.bot.arena.height*this.bot.arena.tileSize;
  this.stepSize = 1;
}

BotMovement.prototype.move = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  if (nextTile.isOccupied()) {
    this.bot.hasFinishedAction = true;
  } else {
    // calls direction function
    this[direction](nextTile);

    if (this.bot.hasFinishedAction) {
      this.bot.currentTile = nextTile;
      this.bot.positionX = this.bot.currentTile.positionX;
      this.bot.positionY = this.bot.currentTile.positionY;
      currentTile.removeBot(this.bot);
      nextTile.addBot(this.bot);
    };
  };
};

BotMovement.prototype.up = function(nextTile) {
  this.bot.positionY -= this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  }
  if (this.bot.positionY < 0) {
    this.bot.positionY += this.maxHeight;
  };
};

BotMovement.prototype.down = function(nextTile) {
  this.bot.positionY += this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionY > this.maxHeight) {
    this.bot.positionY -= this.maxHeight;
  };
};

BotMovement.prototype.left = function(nextTile) {
  this.bot.positionX -= this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionX < 0) {
    this.bot.positionX += this.maxWidth;
  };
};

BotMovement.prototype.right = function(nextTile) {
  this.bot.positionX += this.stepSize;
  if (this.botReachedTile(nextTile)) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionX > this.maxWidth) {
    this.bot.positionX -= this.maxWidth;
  };
};

BotMovement.prototype.botReachedTile = function(tile) {
  return ((tile.positionX-2 <= this.bot.positionX && tile.positionX+2 >= this.bot.positionX)
      && (tile.positionY-2 <= this.bot.positionY && tile.positionY+2 >= this.bot.positionY))
}


