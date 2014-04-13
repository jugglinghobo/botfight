function BotMovement(bot) {
  this.bot = bot;
  this.directions = ["up", "down", "left", "right"];
  this.currentTile;
  this.nextTile;
  this.currentDirection;
  this.maxWidth = this.bot.arena.width*this.bot.arena.tileSize;
  this.maxHeight = this.bot.arena.height*this.bot.arena.tileSize;
  this.stepSize = 1;
}

BotMovement.prototype.move = function(rate, direction) {
  this.currentDirection = direction;
  this.currentTile = this.bot.currentTile;
  this.nextTile = this.currentTile[direction]();

  if (!this.nextTile.isOccupied()) {
    this[direction](rate);

    if (rate == 1) {
      this.bot.currentTile = this.nextTile;
      this.bot.positionX = this.bot.currentTile.positionX;
      this.bot.positionY = this.bot.currentTile.positionY;
      this.currentTile.removeBot(this.bot);
      this.nextTile.addBot(this.bot);
    };
  };
};

BotMovement.prototype.up = function(rate) {
  this.bot.positionY -= this.stepSize;
  if (this.botReachedTile()) {
    this.bot.hasFinishedAction = true;
  }
  if (this.bot.positionY < 0) {
    this.bot.positionY += this.maxHeight;
  };
};

BotMovement.prototype.down = function() {
  this.bot.positionY += this.stepSize;
  if (this.botReachedTile()) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionY > this.maxHeight) {
    this.bot.positionY -= this.maxHeight;
  };
};

BotMovement.prototype.left = function() {
  this.bot.positionX -= this.stepSize;
  if (this.botReachedTile()) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionX < 0) {
    this.bot.positionX += this.maxWidth;
  };
};

BotMovement.prototype.right = function() {
  this.bot.positionX += this.stepSize;
  if (this.botReachedTile()) {
    this.bot.hasFinishedAction = true;
  };
  if (this.bot.positionX > this.maxWidth) {
    this.bot.positionX -= this.maxWidth;
  };
};

BotMovement.prototype.botReachedTile = function() {
  return ((this.nextTile.positionX-2 <= this.bot.positionX && this.nextTile.positionX+2 >= this.bot.positionX)
      && (this.nextTile.positionY-2 <= this.bot.positionY && this.nextTile.positionY+2 >= this.bot.positionY))
}

// turn face direction
BotMovement.prototype.render = function(context) {
  var degrees = this.degreesForDirection();
  var rad = degrees*Math.PI/180;
  context.save();
  context.translate(this.bot.positionX, this.bot.positionY);
  context.rotate(rad);
  context.drawImage(this.bot.icon, 0+this.bot.offset, 0+this.bot.offset);
  context.restore();
}

BotMovement.prototype.degreesForDirection = function() {
  var degrees = {"up": 270, "down": 90, "left": 180, "right": 0};
  return degrees[this.currentDirection];
}

