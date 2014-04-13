function BotWeaponSystem(bot) {
  this.bot = bot;
  this.damage = 1;
  this.attackDuration = 15;
}

BotWeaponSystem.prototype.attack = function() {
  var tile = this.bot.tile;
  var nextTile = tile[direction]();
  if (nextTile.isOccupied()) {
    nextTile.dealDamage()
  };
  // calls direction function
  this[direction](nextTile);

  if (this.bot.hasFinishedAction) {
    this.bot.tile = nextTile;
    this.bot.x = this.bot.tile.x;
    this.bot.y = this.bot.tile.y;
    tile.removeBot(this.bot);
    nextTile.addBot(this.bot);
  };
}

BotWeaponSystem.prototype.updateAction = function(action_hash) {
  this.action = action_hash["action"];
  this.direction = action_hash["direction"];
}

BotWeaponSystem.prototype.finishTurn = function() {
  this.tile = this.bot.tile;
}
