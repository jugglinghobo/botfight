$(document).ready(function() {
  CodeEditor.initialize();
});

var CodeEditor = function() {
  var initCodeEditor = function() {
    var codeMirrorAreas = document.getElementsByClassName("bot_code");
    for (var i = 0; i < codeMirrorAreas.length; ++i) {
      var codeMirrorArea = codeMirrorAreas[i];
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
      initCodeEditor();
    }
  }
}();

