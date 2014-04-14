function Bot(arena, loadPath) {
  this.tile = arena.getRandomFreeTile();
  this.x = this.tile.x;
  this.y = this.tile.y;
  this.width = arena.tileSize;
  this.height = arena.tileSize;


  var maxWidth = arena.width;
  var maxHeight = arena.height;

  this.data = new BotData(loadPath)
  this.brain = new BotBrain(this.data.code);


  var initialAction = this.brain.action(this.tile.surroundings());
  this.action = initialAction["action"];
  this.direction = initialAction["direction"];

  this.targetTile = this.tile[this.direction]();

  this.movement = new BotMovement(this, maxWidth, maxHeight);
  this.weaponSystem = new BotWeaponSystem(this);
};

Bot.prototype.startTurn = function() {
  this.updateAction();
  this.targetTile = this.tile[this.direction]();
}

Bot.prototype.finishTurn = function() {
  this.movement.finishTurn();
  this.weaponSystem.finishTurn();
}

Bot.prototype.updateAction = function() {
  var surroundings = this.tile.surroundings();
  var actionHash = this.brain.action(surroundings);
  this.action = actionHash["action"];
  this.direction = actionHash["direction"];
}

Bot.prototype.executeAction = function(progress) {
  this[this.action](progress);
};

Bot.prototype.move = function(progress) {
  this.movement.move(progress);
};

Bot.prototype.attack = function(progress) {
  this.weaponSystem.attack(progress);
};

Bot.prototype.render = function(context) {
  switch(this.action) {
    case "move":
      this.movement.render(context);
      break;
    case "attack":
      this.weaponSystem.render(context);
      break;
  }
}
