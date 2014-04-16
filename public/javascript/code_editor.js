$(document).ready(function() {
  CodeEditor.initialize();
});

var CodeEditor = function() {
  var initCodeEditor = function(options) {
    var options = options || {};
    var editorClass = options["editor_class"] || "bot_code";
    var container = options["container"] || document;
    var opts = opts || {};
    //opts["keyMap"] = opts["keyMap"] || "vim";
    opts["theme"] = opts["theme"] || "ambiance";
    opts["lineNumbers"] = opts["lineNumbers"] || true;
    opts["mode"] = opts["mode"] || "javascript";
    opts["readOnly"] = opts["readOnly"] || false;
    opts["tabSize"] = opts["tabSize"] || 2;

    var codeMirrorAreas = container.getElementsByClassName(editorClass);
    var editors = {};
    for (var i = 0; i < codeMirrorAreas.length; ++i) {
      var codeMirrorArea = codeMirrorAreas[i];
      var data = $(codeMirrorArea).data();
      opts["readOnly"] = data ? data["readonly"] : opts["readonly"];

      var editor = CodeMirror.fromTextArea(codeMirrorArea, opts);
      var botNode = $(codeMirrorArea).parents(".bot");
      var botId = botNode.find(".bot_id").val();
      editors[botId] = editor;
    }
    return editors;
  };

  return {
    initialize: function(options) {
      return initCodeEditor(options);
    }
  }
}();

