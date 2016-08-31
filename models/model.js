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
    email: { type: Sequelize.STRING(), unique: true, primaryKey: true },
    password: Sequelize.STRING(),
    todos: Sequelize.STRING()
});

function randomStr() {
    var tempStr = Math.random().toString(36).slice(-7);
    if(tempStr.length !== 7) {
        tempStr = Math.random().toString(36).slice(-7);
    }
    return tempStr;
}

/* generate UNIQUE id */

function gen() {
    var id = randomStr();
    return USER.findById(id).then(result => result ? gen() : id);
}


module.exports.getUser = function(id) {
    return USER.findById(id);
}

module.exports.getUserByCredentials = function(email, password) {
  return USER.find({where: {email:email, password:password}});
}


module.exports.addUser = (email, password) => gen().then(id => USER.create({
    id: id,
    email: email,
    password: password,
    todos: ""
}));

module.exports.addUser("kbr@kabir.ml", "1234")


sequelize.sync();
