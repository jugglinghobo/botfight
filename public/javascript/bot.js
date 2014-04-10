function Bot(arena, load_path) {
  this.arena = arena;
  this.load(load_path);
  this.behaviour = new BotBehaviour(this);
  this.setPosition();
  console.log(this.currentTile);
}

Bot.prototype.move = function(direction) {
  this.behaviour.move(direction);
}

Bot.prototype.setPosition = function() {
  this.currentTile = this.arena.getRandomTile();
  this.currentTile.addBot(this);
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
  this.id = data.id;
  this.name = data.name;
  this.author = data.author;
  this.code = data.code;
};

// unused
Bot.prototype.validate = function() {
  if (this.name && this.author && this.code) {
    return true;
  };
  return false;
};

Bot.prototype.toHtml = function() {
  return "<div id='#bot_"+this.id+"' class='bot'></div>"
};
