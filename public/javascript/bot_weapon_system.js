function BotWeaponSystem(bot) {
  this.bot = bot;
  this.damage = 1;
}

BotWeaponSystem.prototype.prepareTurn = function() {
  this.bot.targetTile = this.bot.tile[this.bot.direction]();
  this.bot.opponent = this.bot.targetTile.occupant;
  if (this.bot.opponent) {
    return true;
  }
  return false;
};

BotWeaponSystem.prototype.finishTurn = function() {
  if (this.bot.canExecuteAction) {
    this.bot.opponent.takeDamage(this.damage);
    this.bot.opponent = undefined;
  };
};

BotWeaponSystem.prototype.action = function(progress) {
  this.damageProgress = progress;
};

BotWeaponSystem.prototype.render = function(context) {
  if (this.bot.opponent) {
    var rad = this.radiansForDamageProgress();
    var offsetX = this.bot.opponent.width/2;
    var offsetY = this.bot.opponent.height/2;
    var centerX = this.bot.opponent.x+offsetX;
    var centerY = this.bot.opponent.y+offsetY;
    context.save();
    context.translate(centerX, centerY);
    context.rotate(rad);
    context.drawImage(this.bot.opponent.data.icon, 0-(offsetX-this.bot.opponent.data.offset), 0-(offsetY-this.bot.opponent.data.offset));
    context.restore();
  }
};

BotWeaponSystem.prototype.radiansForDamageProgress = function() {
  return 2*Math.PI*this.damageProgress;
}
