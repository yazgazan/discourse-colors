(function () {
  var colors = function (text) {
    //Expression to find.
    var re = /\[color=\s*([a-zA-Z0-9-#]+)]/;
    // Adjust text.
    var adjusted = text.replace(re, "<font color=" + "$1" + ">");

    text.replace("[/color]", "</font>");

    return adjusted;
  }

  var images = function (text) {
    //Expression to find.
    var re = /\[img\](.*?)\[\/img\]/;
    // Adjust text.
    var adjusted = text.replace(re, "<a href=\"$1\"><img src=\"$1\"></a>");

    return adjusted;
  }

  var center = function (text) {
    //Expression to find.
    var re = /\[center\](.*?)\[\/center\]/;
    // Adjust text.
    var adjusted = text.replace(re, '<div style="text-align: center">$1</div>');

    return adjusted;
  }

  Discourse.Dialect.postProcessText(function (text) {
    text = [].concat(text);
    for (var i = 0; i < text.length; i++) {
      if (text[i].length > 0 && text[i][0] !== "<") {
        text[i] = center(text[i]);
        text[i] = colors(text[i]);
        text[i] = images(text[i]);
      }
    }
    return text;
  });
})()
