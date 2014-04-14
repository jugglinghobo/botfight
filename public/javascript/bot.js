function Bot(arena, loadPath, tile) {
  this.arena = arena;
  this.tile = tile || arena.getRandomFreeTile();
  this.tile.addBot(this);
  this.targetTile;

  this.x = this.tile.x;
  this.y = this.tile.y;
  this.width = arena.tileSize;
  this.height = arena.tileSize;

  this.action;
  this.direction;

  this.lives = 3;

  this.data = new BotData(loadPath)
  this.brain = new BotBrain(this.data.code);
  this.modules = {"move": new BotMovement(this), "attack": new BotWeaponSystem(this)};
};

Bot.prototype.startTurn = function() {
  var surroundings = this.tile.surroundings();
  var actionHash = this.brain.action(surroundings);
  this.action = actionHash["action"];
  this.direction = actionHash["direction"];
  this.targetTile = this.tile[this.direction]();

  // calls module responsible for action
  this.modules[this.action].startTurn();
}

Bot.prototype.finishTurn = function() {
  this.modules[this.action].finishTurn();
}

Bot.prototype.executeAction = function(progress) {
  this.modules[this.action].action(progress);
};

Bot.prototype.takeDamage = function(damage) {
  this.lives -= damage;
}

Bot.prototype.resetPosition = function() {
  this.x = this.tile.x;
  this.y = this.tile.y;
}

Bot.prototype.maxWidth = function() {
  return this.arena.width;
}

Bot.prototype.maxHeight = function() {
  return this.arena.height;
}

Bot.prototype.render = function(context) {
  if (this.direction) {
    this.modules[this.action].render(context);
  }
  // render self
  var rad = this.radiansForDirection();
  var offsetX = this.width/2;
  var offsetY = this.height/2;
  var centerX = this.x+offsetX;
  var centerY = this.y+offsetY;
  context.save();
  context.translate(centerX, centerY);
  context.rotate(rad);
  context.drawImage(this.data.icon, 0-(offsetX-this.data.offset), 0-(offsetY-this.data.offset));
  context.restore();
}

Bot.prototype.radiansForDirection = function() {
  var degrees = {"up": 0, "down": 180, "left": 270, "right": 90};
  return degrees[this.direction]*Math.PI/180;
}
