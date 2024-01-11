const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Todo Validation
const validationSchema = require("../validationSchema/todoValidationSchema");
const todoMiddleware = require("../middleware/todoMiddleware");

// Controller
const todoController = require("../controllers/todoController");

router
	.route("/")
	.get(todoController.getAllTodo)
	.post(todoMiddleware(validationSchema.todoPOST), todoController.createTodo);

router
	.route("/:id")
	.get(todoController.getTodo)
	.patch(todoController.updateTodo)
	.delete(todoController.deleteTodo);

module.exports = router;
