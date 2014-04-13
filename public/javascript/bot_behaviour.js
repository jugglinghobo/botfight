function BotBehaviour(bot) {
  this.bot = bot;
  this.currentAction;
  this.currentDirection;
  this.movement = new BotMovement(this.bot);
  this.weaponSystem = new BotWeaponSystem(this.bot);
};

BotBehaviour.prototype.updateAction = function(action_hash) {
  this.currentAction = action_hash["action"];
  this.currentDirection = action_hash["direction"];
}

BotBehaviour.prototype.executeAction = function(rate) {
  console.log("executing action: "+this.currentAction);
  this[this.currentAction](rate, this.currentDirection);
};

BotBehaviour.prototype.move = function(rate, direction) {
  this.movement.move(rate, direction);
};

BotBehaviour.prototype.attack = function(direction) {
  this.weaponSystem.attack(direction);
};

BotBehaviour.prototype.render = function(context) {
  switch(this.currentAction) {
    case "move":
      this.movement.render(context);
      break;
    case "attack":
      this.weaponSystem.render(context);
      break;
  }
}
