$(document).ready(function() {
  BotForm.initialize();
});

var BotForm = function() {
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
