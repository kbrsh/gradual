var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'admin', 'pass', {
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  logging: false,

  storage: 'database.sqlite'
});


var USER = sequelize.define('USER', {
    username: { type: Sequelize.STRING(), unique: true, primaryKey: true },
    password: Sequelize.STRING(),
    todos: Sequelize.STRING()
});

module.exports.getUser = function(id) {
    return USER.findById(id);
}

module.exports.addUser = function(username, password) {
  return USER.create({
      username: username,
      password: password,
      todos: ""
  });
}

module.exports.addUser("kbr", "1234")


sequelize.sync();
