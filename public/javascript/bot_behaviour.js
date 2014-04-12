function BotBehaviour(bot) {
  this.bot = bot;
  this.actions = ["move"];
  this.directions = ["up", "down", "left", "right"];
};

BotBehaviour.prototype.execute = function(action, direction) {
  this[action](direction);
};

BotBehaviour.prototype.move = function(direction) {
  var bot = this.bot;
  var currentTile = bot.currentTile;
  var nextTile = currentTile[direction]();
  if (!nextTile.isOccupied()) {
    var animation = {};
    animation[direction] = '20px';
    $(bot.domElement()).animate(animation, function() {
      currentTile.removeBot(bot);
      nextTile.addBot(bot);
      bot.currentTile = nextTile;
    });
  };
};

BotBehaviour.prototype.attack = function(direction) {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  nextTile.dealDamage();
}
