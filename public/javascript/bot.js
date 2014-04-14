function Bot(arena, load_path) {
  this.arena = arena;
  this.animationTime = 5;

  var data = this.load(load_path);
  this.id = data.id;
  this.name = data.name;
  this.author = data.author;
  this.code = data.code;
  this.icon = new Image();
  this.icon.src = "images/arrow.jpeg";

  this.tile = this.arena.getRandomFreeTile();
  this.offset = 2;

  this.x = this.tile.x + this.offset;
  this.y = this.tile.y + this.offset;
  this.width = this.tile.width - this.offset;
  this.height = this.tile.height - this.offset;

  this.brain = new BotBrain(this.code);
  this.behaviour = new BotBehaviour(this);
  this.updateAction();
}

Bot.prototype.finishTurn = function() {
  this.updateAction();
  this.behaviour.finishTurn();
}

Bot.prototype.updateAction = function() {
  console.log("UPDATE ACTION");
  var surroundings = this.tile.surroundings();
  var roundCounter = this.arena.roundCounter;
  var chosenAction = this.brain.action(surroundings);
  this.behaviour.updateAction(chosenAction);
}

Bot.prototype.action = function(progress) {
  this.behaviour.executeAction(progress);
}

Bot.prototype.render = function(context) {
  this.behaviour.render(context)
}

Bot.prototype.load = function(load_path) {
  var data;
  $.ajax({
    url: load_path,
    dataType: 'json',
    async: false,
  }).success(function(response) {
    data = response;
  });
  return data;
};
