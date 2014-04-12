function BotWeaponSystem(bot) {
  this.bot = bot;
  this.damage = 1;
  this.attackDuration = 15;
}

BotWeaponSystem.prototype.attack = function() {
  var currentTile = this.bot.currentTile;
  var nextTile = currentTile[direction]();
  if (nextTile.isOccupied()) {
    nextTile.dealDamage()
  };
  // calls direction function
  this[direction](nextTile);

  if (this.bot.hasFinishedAction) {
    this.bot.currentTile = nextTile;
    this.bot.positionX = this.bot.currentTile.positionX;
    this.bot.positionY = this.bot.currentTile.positionY;
    currentTile.removeBot(this.bot);
    nextTile.addBot(this.bot);
  };
}
