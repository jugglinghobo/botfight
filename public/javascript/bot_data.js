function BotData(load_path) {
  this.arena = arena;

  var data = this.load(load_path);
  this.id = data.id;
  this.name = data.name;
  this.author = data.author;
  this.code = data.code;
  this.icon = new Image();
  this.icon.src = "images/arrow.jpeg";
  this.offset = 5;
}

BotData.prototype.load = function(load_path) {
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
