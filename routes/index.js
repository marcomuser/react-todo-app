const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/", async (req, res, next) => {
  try {
    const todoItems = await Todo.find();
    res.status(200).json(todoItems);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { content } = req.body;
    const date = Date.now();
    const todoItem = await Todo.create({ content, date });
    res.status(200).json(todoItem);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
});

module.exports = router;
