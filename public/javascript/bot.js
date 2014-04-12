function Bot(arena, load_path) {
  this.arena = arena;

  var data = this.load(load_path);
  this.id = data.id;
  this.name = data.name;
  this.author = data.author;
  this.code = data.code;


  this.brain = new BotBrain(this.code);
  this.behaviour = new BotBehaviour(this);
  this.currentTile = this.arena.getRandomFreeTile();
  this.currentTile.addBot(this);
  this.positionX = this.currentTile.positionX;
  this.positionY = this.currentTile.positionY;
  this.offset = 2;
  this.width = this.currentTile.width - this.offset;
  this.height = this.currentTile.height - this.offset;
}

Bot.prototype.action = function() {
  var surroundings = this.currentTile.surroundings();
  var chosenAction = this.brain.action(surroundings);
  var action = chosenAction["action"];
  var direction = chosenAction["direction"];
  this.behaviour.execute(action, direction);
}

Bot.prototype.render = function(context) {
  var bot = this;
  var icon = new Image();
  icon.src = "images/robot.png";
  icon.onload = function() {
    context.drawImage(icon, bot.positionX + bot.offset, bot.positionY + bot.offset);
  }
  var direction = this.brain.action(this.currentTile.surroundings())["direction"];
  var nextTile = this.currentTile[direction]();
  context.strokeRect(nextTile.positionX+5, nextTile.positionY+5, 5, 5);
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
