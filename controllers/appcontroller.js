var fs = require('fs');

var template = fs.readFileSync("./views/app/app.html", "utf-8");

var render = function(name) {
  return template.replace(/{{name}}/g, name);
}

module.exports.render = render;
