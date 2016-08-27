var fs = require('fs');

var template = fs.readFileSync("./views/index/index.html", "utf-8");

var render = function(username) {
    return template.replace(/{{username}}/g, username);
}

module.exports.render = render;
