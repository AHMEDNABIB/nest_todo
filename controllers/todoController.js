const mongoose = require("mongoose");

const Todo = require("../models/Todo");

exports.getAllTodo = async (req, res) => {
	try {
		const todo = await Todo.find({});
		res.status(200).json({
			status: "success",
			results: todo.length,
			data: todo,
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

exports.createTodo = async (req, res) => {
	try {
		const newTodo = new Todo(req.body);
		await newTodo.save();

		res.status(201).json({
			status: "success",
			data: newTodo,
		});
	} catch (error) {
		res.status(404).json({
			status: "failed",
			message: error,
		});
	}
};

exports.getTodo = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: todo,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

exports.updateTodo = async (req, res) => {
	try {
		const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: "success",
			data: todo,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

exports.permanentDeleteTodo = async (req, res) => {
	try {
		await Todo.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "success",
			message: "Todo was deleted successfully!",
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

exports.softDeleteTodo = async (req, res) => {
	try {
		const todoId = req.params.id;
		const todo = await Todo.findByIdAndUpdate(
			todoId,
			{
				isDeleted: true,
				expired_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
			
			},
			{ new: true }
		);

		if (!todo) {
			return res.status(404).json({ error: "Task not found" });
		}

		res.json(todo);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

exports.restoreTodo = async (req, res) => {
	try {
		const todoId = req.params.id;
		const restoredTodo = await Todo.findByIdAndUpdate(
			todoId,
			{ isDeleted: false, expired_at: null },
			{ new: true }
		);

		if (!restoredTodo) {
			return res.status(404).json({ error: "Task not found" });
		}

		res.json(restoredTodo);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
