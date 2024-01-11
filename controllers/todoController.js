const mongoose = require("mongoose");


const Todo= require('../models/Todo')

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
		const newTodo = await Todo.create(req.body);
		res.status(201).json({
			status: "success",
			data:newTodo,
			
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
			data:todo,
			
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

exports.deleteTodo = async (req, res) => {
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




