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
    this.moveTo(nextTile);
    if (this.bot.positionX == nextTile.positionX && this.bot.positionY == nextTile.positionY) {
      this.bot.hasFinishedAction = true;
      currentTile.removeBot(this.bot);
      nextTile.addBot(this.bot);
      this.bot.currentTile = nextTile;
    };
  };
};

BotBehaviour.prototype.moveTo = function(nextTile) {
  var movementX = (nextTile.positionX - this.bot.positionX);
  var movementY = (nextTile.positionY - this.bot.positionY);
  var newPositionX = this.bot.positionX;
  var newPositionY = this.bot.positionY;
  if (movementX > 0) {
    newPositionX = (this.bot.positionX += this.stepSize) % this.maxWidth;
  }
  if (movementX < 0) {
    newPositionX = (this.bot.positionX -= this.stepSize) % this.maxWidth;
  }
  if (movementY > 0) {
    newPositionY = (this.bot.positionY += this.stepSize) % this.maxWidth;
  }
  if (movementY < 0) {
    newPositionY = (this.bot.positionY -= this.stepSize) % this.maxWidth;
  }
  this.bot.positionX = newPositionX;
  this.bot.positionY = newPositionY;
}

BotBehaviour.prototype.attack = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  nextTile.dealDamage();
}
