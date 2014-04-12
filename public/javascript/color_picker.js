$(document).ready(function() {
  ColorPicker.initialize();
});

var ColorPicker = function() {
  var initColorPicker = function() {
    $(".color input").colorpicker().on("changeColor", function(ev) {
      $(this).val(ev.color.toHex());
      $(this).parents(".input-group").find(".input-group-addon").css("background-color", ev.color.toHex());
    });
    $(".color .input-group-addon").on("click", function() {
      $(this).parents(".input-group").find("input").colorpicker("show");
    });
  }

  var initListeners = function() {

  }

  return {
    initialize: function() {
      initColorPicker();
      initListeners();
    }
  }
}();
