const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Todo = require("../models/Todo");

const validationSchema = require("../validationSchema/todoValidationSchema");
const todoMiddleware = require("../middleware/todoMiddleware");

const todoController = require("../controllers/todoController");

router
	.route("/")
	.get(todoController.getAllTodo)
	.post(todoMiddleware(validationSchema.todoPOST), todoController.createTodo);

router
	.route("/:id")
	.get(todoController.getTodo)
	.patch(todoController.updateTodo)
	.delete(todoController.softDeleteTodo);

router.delete("/permanent/:id", todoController.permanentDeleteTodo);

router.put("/restore/:id", todoController.restoreTodo);

module.exports = router;
