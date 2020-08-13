var express = require("express");
var router = express.Router();
const Todo = require("../models/Todo");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const todoItems = await Todo.find();
    res.status(200).json(todoItems);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const date = Date.now();
    const todoItem = await Todo.create({content, date});
    res.status(200).json(todoItem);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todoList = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(todoList);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
