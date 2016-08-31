var fs = require('fs');

var template = fs.readFileSync("./views/index/index.html", "utf-8");

var render = function() {
  return template;
}

module.exports.render = render;
