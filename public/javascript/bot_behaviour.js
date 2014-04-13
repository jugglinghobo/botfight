function BotBehaviour(bot) {
  this.bot = bot;
  this.action;
  this.direction;
  this.movement = new BotMovement(this.bot);
  this.weaponSystem = new BotWeaponSystem(this.bot);
};

BotBehaviour.prototype.finishTurn = function() {
  this.movement.finishTurn();
  this.weaponSystem.finishTurn();
}

BotBehaviour.prototype.updateAction = function(action_hash) {
  this.action = action_hash["action"];
  this.direction = action_hash["direction"];
  this.movement.updateAction(action_hash);
  this.weaponSystem.updateAction(action_hash);
}

BotBehaviour.prototype.executeAction = function(progress) {
  this[this.action](progress);
};

BotBehaviour.prototype.move = function(progress) {
  this.movement.move(progress);
};

BotBehaviour.prototype.attack = function(progress) {
  this.weaponSystem.attack(progress);
};


BotBehaviour.prototype.render = function(context) {
  switch(this.action) {
    case "move":
      this.movement.render(context);
      break;
    case "attack":
      this.weaponSystem.render(context);
      break;
  }
}
