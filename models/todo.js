const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define schema
let TodoSchema = new Schema({
  task: String,
  description: String
});

//generate a model
let Todo = mongoose.model('Todo', TodoSchema);

//export
module.exports = Todo;
