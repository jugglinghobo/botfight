function BotBehaviour(bot) {
  this.bot = bot;
  this.currentAction;
  this.currentDirection;
  this.movement = new BotMovement(this.bot);
  this.weaponSystem = new BotWeaponSystem(this.bot);
};

BotBehaviour.prototype.execute = function(action, direction) {
  this.currentAction = action;
  this.currentDirection = direction;
  this[action](direction);
};

BotBehaviour.prototype.move = function(direction) {
  this.movement.move(direction);
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
