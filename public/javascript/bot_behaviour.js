function BotBehaviour(bot) {
  this.bot = bot;
  this.movement = new BotMovement(this.bot);
};

BotBehaviour.prototype.execute = function(action, direction) {
  this[action](direction);
};

BotBehaviour.prototype.move = function(direction) {
  this.movement.move(direction);
};

BotBehaviour.prototype.attack = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  nextTile.dealDamage();
};
