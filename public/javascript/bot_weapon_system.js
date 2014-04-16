function BotWeaponSystem(bot) {
  this.bot = bot;
  this.damage = 1;
  this.opponent;
  this.opponentRotation;
}

BotWeaponSystem.prototype.prepareTurn = function() {
  this.bot.targetTile = this.bot.tile[this.bot.direction]();
  this.opponent = this.bot.targetTile.occupant;
  if (this.opponent) {
    this.opponentRotation = this.opponent.rotation;
    return true;
  }
  return false;
};

BotWeaponSystem.prototype.finishTurn = function() {
  this.opponent.rotation = this.opponentRotation;
  this.opponent.takeDamage(this.damage);
  this.opponent = undefined;
};

BotWeaponSystem.prototype.action = function(progress) {
  var damageRotation = this.rotationForDamage(progress);
  this.opponent.rotation = this.opponentRotation + damageRotation;
};

BotWeaponSystem.prototype.rotationForDamage = function(progress) {
  var rad = 2*Math.PI*progress;
  return rad*(180/Math.PI);
}
