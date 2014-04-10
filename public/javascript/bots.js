$(document).ready(function() {
  Bots.initialize();
});

var Bots = function() {
  var initCodeMirror = function() {
    var codeMirrorArea = document.getElementById("bot_code");
    if (codeMirrorArea) {
      var data = $(codeMirrorArea).data();
      var readOnly = data ? data["readonly"] : false

      var options = {
        keyMap: "vim",
        theme: "ambiance",
        lineNumbers: true,
        mode: "javascript",
        readOnly: readOnly,
      };
      var myCodeMirror = CodeMirror.fromTextArea(codeMirrorArea, options);
    }
  };

  return {
    initialize: function() {
      initCodeMirror();
    }
  }
}();
