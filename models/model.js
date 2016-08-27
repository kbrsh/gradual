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


var user = sequelize.define('USER', {
    username: { type: Sequelize.STRING(), unique: true, primaryKey: true },
    todos: Sequelize.STRING()
});

module.exports.addUser = function(username, password) {
  user.create({
      username: username,
      password: password,
      todos: ""
  })
}

sequelize.sync();
