const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  content: String,
  date: String,
});

const Todo = mongoose.model("Post", todoSchema);
module.exports = Todo;