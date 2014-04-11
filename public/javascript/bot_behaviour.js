function BotBehaviour(bot) {
  this.bot = bot;
  this.actions = ["move"];
  this.directions = ["u", "d", "l", "r"];
};

BotBehaviour.prototype.execute = function(action, direction) {
  this[action](direction);
};

BotBehaviour.prototype.move = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  currentTile.removeBot(this.bot);
  nextTile.addBot(this.bot);
  this.bot.currentTile = nextTile;
};
