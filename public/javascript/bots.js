$(document).ready(function() {
  Bots.initialize();
});

var Bots = function() {
  var initCodeMirror = function() {
    var codeMirrorArea = document.getElementById("bot_code");
    var data = $(codeMirrorArea).data();

    var options = {
      keyMap: "vim",
      theme: "ambiance",
      lineNumbers: true,
      mode: "javascript",
      readOnly: (data["readonly"] || false),
    };
    var myCodeMirror = CodeMirror.fromTextArea(codeMirrorArea, options);
  };

  return {
    initialize: function() {
      initCodeMirror();
    }
  }
}();
