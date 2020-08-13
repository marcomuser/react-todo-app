const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  content: String,
  date: Date,
});

const Todo = mongoose.model("Post", todoSchema);
module.exports = Todo;
