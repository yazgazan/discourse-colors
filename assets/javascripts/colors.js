function colors(text) {
  //Expression to find.
  var re = /\[color=\s*([a-zA-Z0-9-#]+)]/;
  // Adjust text.
  var adjusted = text.replace(re, "<font color=" + "$1" + ">");
  
  text.replace("[/color]", "</font>");

  return adjusted;
}

Discourse.Dialect.postProcessText(function (text) {
  text = [].concat(text);
  for (var i = 0; i < text.length; i++) {
    if (text[i].length > 0 && text[i][0] !== "<") {
      text[i] = colors(text[i]);
    }
  }
  return text;
});
