$(document).ready(function() {
  CodeEditor.initialize();
});

var CodeEditor = function() {
  var editors = [];
  var initCodeEditor = function(container, options) {
  var container = container || document;
  var options = options || {};
  options["keyMap"] = options["keyMap"] || "vim";
  options["theme"] = options["theme"] || "ambiance";
  options["lineNumbers"] = options["lineNumbers"] || true;
  options["mode"] = options["mode"] || "javascript";
  options["readOnly"] = options["readOnly"] || false;
  options["tabSize"] = options["tabSize"] || 2;
  var codeMirrorAreas = container.getElementsByClassName("bot_code");
  for (var i = 0; i < codeMirrorAreas.length; ++i) {
    var codeMirrorArea = codeMirrorAreas[i];
    var data = $(codeMirrorArea).data();
    options["readOnly"] = data ? data["readonly"] : options["readonly"];

    var editor = CodeMirror.fromTextArea(codeMirrorArea, options);
    editors.push(editor);
  }
  return editors;
};

return {
  initialize: function(container, options) {
    return initCodeEditor(container, options);
  }
}
}();

