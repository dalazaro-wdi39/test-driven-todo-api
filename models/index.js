let mongoose = require('mongoose');
mongoose.connect(process.env.DBPORT || 'mongodb://localhost/todo-app');

//filepath for todo.js
let Todo = require('./todo');
// let Puppy = require('./puppy');
// let Taco = require('./taco');

let db = {
  Todo: Todo,
  // Puppy: Puppy,
  // Taco: Taco
}

module.exports = db;

// alternate
// module.exports = {
//   Todo: require('./todo'),
//   Puppy: require('./puppy'),
//   Taco: require('./taco')
// };
//
// alternate
// module.exports.Todo = require('./todo');
// module.exports.Puppy = require('./puppy');
// module.exports.Taco = require('./taco');
