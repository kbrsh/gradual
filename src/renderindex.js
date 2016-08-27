var fs = require('fs');

var template = fs.readFileSync("./views/index/index.html", "utf-8");

var render = function(username) {
  if(username) {
    return template.replace(/{{username}}/g, username);
  } else {
    return template;
  }
}

module.exports.render = render;
