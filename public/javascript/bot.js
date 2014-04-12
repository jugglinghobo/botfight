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
  this.offset = 2;
}

Bot.prototype.action = function() {
  var surroundings = this.currentTile.surroundings();
  var chosenAction = this.brain.action(surroundings);
  var action = chosenAction["action"];
  var direction = chosenAction["direction"];
  this.behaviour.execute(action, direction);
}

Bot.prototype.draw = function(context) {
  var bot = this;
  var icon = new Image();
  icon.src= "images/robot.png";
  icon.onload = function() {
    context.drawImage(icon, bot.x(), bot.y());
  }
}

var drawImage = function(context, icon, x, y) {
}

Bot.prototype.x = function() {
  return (this.currentTile.x + this.offset);
}

Bot.prototype.y = function() {
  return (this.currentTile.y + this.offset);
}

Bot.prototype.domElement = function() {
  return document.getElementById("bot_"+this.id);
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

Bot.prototype.toHtml = function() {
  return "<div id='bot_"+this.id+"' class='bot'></div>"
};
