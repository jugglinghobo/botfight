function BotWeaponSystem(bot) {
  this.bot = bot;
  this.damage = 1;
  this.opponent;
}

BotWeaponSystem.prototype.startTurn = function() {
  this.opponent = this.bot.targetTile.occupant;
};

BotWeaponSystem.prototype.finishTurn = function() {
  if (this.opponent) {
    this.opponent.takeDamage(this.damage);
    this.opponent = undefined;
  };
};

BotWeaponSystem.prototype.action = function(progress) {
  this.damageProgress = progress;
};

BotWeaponSystem.prototype.render = function(context) {
  if (this.opponent) {
    var rad = this.radiansForDamageProgress();
    var offsetX = this.opponent.width/2;
    var offsetY = this.opponent.height/2;
    var centerX = this.opponent.x+offsetX;
    var centerY = this.opponent.y+offsetY;
    context.save();
    context.translate(centerX, centerY);
    context.rotate(rad);
    context.drawImage(this.opponent.data.icon, 0-(offsetX-this.opponent.data.offset), 0-(offsetY-this.opponent.data.offset));
    context.restore();
  }
};

BotWeaponSystem.prototype.radiansForDamageProgress = function() {
  return 2*Math.PI*this.damageProgress;
}
