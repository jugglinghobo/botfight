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


  this.brain = new BotBrain(this.code);
  this.behaviour = new BotBehaviour(this);
  this.currentTile = this.arena.getRandomFreeTile();
  this.currentTile.addBot(this);
  this.positionX = this.currentTile.positionX;
  this.positionY = this.currentTile.positionY;
  this.offset = 2;
  this.width = this.currentTile.width - this.offset;
  this.height = this.currentTile.height - this.offset;
  this.hasFinishedAction = true;
  this.updateAction();
}

Bot.prototype.updateAction = function() {
  var surroundings = this.currentTile.surroundings();
  var chosenAction = this.brain.action(surroundings);
  this.behaviour.updateAction(chosenAction);
  console.log("updated action:");
  console.log(chosenAction);
}

Bot.prototype.action = function(rate) {
  if (this.rate == 1) {
    this.updateAction();
  }
  this.behaviour.executeAction(rate);
}

Bot.prototype.takeDamage = function(damage) {
  console.log("++++++++++++++++++++++++++++");
  console.log(""+this.name+": "+damage+" DAMAGE!");
  console.log("++++++++++++++++++++++++++++")
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
