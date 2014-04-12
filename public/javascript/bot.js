function Bot(arena, load_path) {
  this.arena = arena;

  var data = this.load(load_path);
  this.id = data.id;
  this.name = data.name;
  this.author = data.author;
  this.code = data.code;


  this.brain = new BotBrain(this.code);
  this.behaviour = new BotBehaviour(this);
  this.currentTile = this.arena.getRandomTile();
  this.currentTile.addBot(this);
}

Bot.prototype.action = function() {
  var surroundings = this.currentTile.surroundings();
  var chosenAction = this.brain.action(surroundings);
  var action = chosenAction["action"];
  var direction = chosenAction["direction"];
  this.behaviour.execute(action, direction);
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
  return "<div id='#bot_"+this.id+"' class='bot'></div>"
};
