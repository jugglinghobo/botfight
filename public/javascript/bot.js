function Bot(load_path) {
  load(load_path)
}

Bot.prototype.load = function(load_path) {
  $.getJSON(load_path, function(data) {
    this.name = data.name;
    this.author = data.author;
    this.code = data.code;
  });
  debugger;
}
