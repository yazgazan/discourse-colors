(function () {
  var colors = function (text) {
    //Expression to find.
    var re = /\[color=\s*([a-zA-Z0-9-#]+)]/gi;
    // Adjust text.
    var adjusted = text.replace(re, '');

    adjusted = adjusted.replace(/\[\/color\]/gi, "");

    return adjusted;
  }

  var size = function (text) {
    //Expression to find.
    var re = /\[size=\s*([a-zA-Z0-9-#]+)]/gi;
    // Adjust text.
    var adjusted = text.replace(re, '');

    adjusted = adjusted.replace(/\[\/size\]/gi, "");

    return adjusted;
  }

  var images = function (text) {
    //Expression to find.
    var re = /\[img\](.*?)\[\/img\]/gi;
    // Adjust text.
    var adjusted = text.replace(re, '<a href="$1"><img src="$1" alt="$1"></a>');

    return adjusted;
  }

  var center = function (text) {
    //Expression to find.
    var re = /\[center\](.*?)\[\/center\]/;
    // Adjust text.
    var adjusted = text.replace(/\[center\]/gi, '');
    adjusted = adjusted.replace(/\[\/center\]/gi, '');

    return adjusted;
  }

  Discourse.Dialect.postProcessText(function (text) {
    text = [].concat(text);
    for (var i = 0; i < text.length; i++) {
      if (text[i].length > 0 && text[i][0] !== "<") {
        text[i] = center(text[i]);
        text[i] = colors(text[i]);
        text[i] = size(text[i]);
        text[i] = images(text[i]);
      }
    }
    return text;
  });
})()
