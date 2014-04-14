function BotMovement(bot, maxWidth, maxHeight) {
  this.bot = bot;
  this.maxHeight = maxWidth;
  this.maxWidth = maxHeight;
}

BotMovement.prototype.finishTurn = function() {
  this.bot.tile.removeBot(this.bot);
  this.bot.tile = this.bot.targetTile;
  this.bot.tile.addBot(this.bot);
}

BotMovement.prototype.move = function(progress) {
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

// turn face direction
BotMovement.prototype.render = function(context) {
  var degrees = this.degreesForDirection();
  var rad = degrees*Math.PI/180;
  var offsetX = this.bot.width/2;
  var offsetY = this.bot.height/2;
  var centerX = this.bot.x+offsetX;
  var centerY = this.bot.y+offsetY;
  context.save();
  context.translate(centerX, centerY);
  context.rotate(rad);
  context.drawImage(this.bot.data.icon, 0-(offsetX-this.bot.data.offset), 0-(offsetY-this.bot.data.offset));
  context.restore();
  //var XA = this.bot.targetTile.x+8;
  //var YA = this.bot.targetTile.y+8;
  //var XE = this.bot.targetTile.size-8;
  //var YE = this.bot.targetTile.size-8;
  //context.fillRect(XA, YA, XE, YE);
}

BotMovement.prototype.degreesForDirection = function() {
  var degrees = {"up": 0, "down": 180, "left": 270, "right": 90};
  return degrees[this.bot.direction];
}
