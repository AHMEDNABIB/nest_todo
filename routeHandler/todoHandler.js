const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

const todoController = require("./../controllers/todoController");

router
	.route("/")
	.get(todoController.getAllTodo)
	.post(todoController.createTodo);

router
	.route("/:id")
	.get(todoController.getTodo)
	.patch(todoController.updateTodo)
	.delete(todoController.deleteTodo);



module.exports = router;
