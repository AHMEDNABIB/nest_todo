const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Todo = require("../models/Todo");

const validationSchema = require("../validationSchema/todoValidationSchema");
const todoMiddleware = require("../middlewares/todoMiddleware");

const todoController = require("../controllers/todoController");

router
	.route("/")
	.get(todoController.getAllTodo)
	.post(todoMiddleware(validationSchema.todoPOST), todoController.createTodo);

router.get('/pagination', todoController.getAllTodoByPagination)

router
	.route("/:id")
	.get(todoController.getTodo)
	.patch(todoController.updateTodo)
	.delete(todoController.softDeleteTodo);

router.delete("/permanent/:id", todoController.permanentDeleteTodo);
router.patch("/restore/:id", todoController.restoreTodo);

router.patch("/important/:id", todoController.importantTodo);
router.patch("/unimportant/:id", todoController.unImportantTodo);
router.patch("/done/:id", todoController.doneTodo);
router.patch("/priority/:id", todoController.priorityTodo);
router.patch("/tags/:id", todoController.tagsTodo);

module.exports = router;
