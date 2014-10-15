function Bot(arena, loadPath, tile) {
  this.arena = arena;
  this.tile = tile || arena.getRandomFreeTile();
  this.tile.addBot(this);
  this.targetTile;
  this.opponent;

  this.x = this.tile.x;
  this.y = this.tile.y;
  this.rotation;
  this.width = arena.tileSize;
  this.height = arena.tileSize;

  this.action;
  this.direction;
  this.canExecuteAction;
  this.destroyed = false;

  this.lives = 3;

  this.data = new BotData(loadPath)
  this.brain = new BotBrain(this.data.code);
  this.modules = {"move": new BotMotionSystem(this), "attack": new BotWeaponSystem(this)};
};

Bot.prototype.prepareTurn = function() {
  var surroundings = this.tile.surroundings();
  var actionHash = this.brain.action(surroundings);
  this.action = actionHash["action"];
  this.direction = actionHash["direction"];
  this.rotation = this.rotationForDirection(this.direction);
  this.canExecuteAction = this.modules[this.action].prepareTurn();
}

Bot.prototype.finishTurn = function() {
  if (this.canExecuteAction) {
    this.modules[this.action].finishTurn();
  }
  this.canExecuteAction = false;
}

Bot.prototype.executeAction = function(progress) {
  if (this.canExecuteAction) {
    this.modules[this.action].action(progress);
  };
};

Bot.prototype.takeDamage = function(damage) {
  this.lives -= damage;
  if (this.lives <= 0) {
    this.die();
  }
}

Bot.prototype.die = function() {
  this.destroyed = true;
  arena.destroyBot(this);
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
  var rad = this.rotation*Math.PI/180;
  var offsetX = this.width/2;
  var offsetY = this.height/2;
  var tileOffset = this.tile.size/2;
  var centerX = this.x+offsetX;
  var centerY = this.y+offsetY;
  context.save();
  context.translate(centerX, centerY);
  // draw color floor
  context.fillStyle = this.data.color;
  context.fillRect(0-tileOffset, 0-tileOffset, this.tile.size, this.tile.size);
  context.fillStyle = "black";

  context.rotate(rad);

  // draw bot icon
  context.drawImage(this.data.icon, 0-(offsetX-this.data.offset), 0-(offsetY-this.data.offset));
  context.restore();
}

Bot.prototype.rotationForDirection = function() {
  var rotation = {"up": 0, "down": 180, "left": 270, "right": 90};
  return rotation[this.direction];
}
