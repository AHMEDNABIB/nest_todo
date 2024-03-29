const mongoose = require("mongoose");

const Todo = require("../models/Todo");


exports.getStatus = async (req, res) => {

	
	let status = req.params.status;

	 const statusQuery =
		status === "inprogress" ? ["inprogress", "done"] : status;
	
	console.log(statusQuery)

	

	  const page = parseInt(req.query.page);
	  const limit = parseInt(req.query.limit);

	  const startIndex = (page - 1) * limit;
	  const endIndex = page * limit;
	
	  console.log(startIndex,endIndex)
	
	
	 const statusLength = await Todo.countDocuments({
			status: statusQuery,
		}).exec();


	try {
       

		const todo = await Todo.find({ status: statusQuery })
			.limit(limit)
			.skip(startIndex);
		res.status(200).json({
			status: "success",
			length: statusLength,
		
			data: todo,
		});
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}

};

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
			message: error,
		});
	}

	
};

exports.getAllTodoByPagination = async (req, res) => {
	try {
		// console.log(req.query);

		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 10;
		const skip = (page - 1) * limit;

		// console.log(page, limit, skip);

		const totalTodo = await Todo.countDocuments();

		// if (req.query.page) {
		// 	if (skip >= totalTodo) {
		// 		return res.status(400).json({
		// 			status: "fail",
		// 			error: "These Page Does not exist",
		// 		});
		// 	}
		// }

		if (skip >= totalTodo) {
			return res.status(400).json({
				status: "fail",
				error: "These Page Does not exist",
			});
		}

		const todo = await Todo.find().skip(skip).limit(limit);

		const startTodo = skip + 1;
		const endTodo = Math.min(skip + limit, totalTodo);

		console.log();

		res.status(200).json({
			status: "success",
			startTodo,
			endTodo,
			totalTodo,
			data: todo,
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error,
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
				status:"trash",
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
			{ isDeleted: false, status:"inprogress", expired_at: null },
			
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



exports.importantTodo = async (req, res) => {
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

exports.unImportantTodo = async (req, res) => {
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

exports.priorityTodo = async (req, res) => {
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

exports.tagsTodo = async (req, res) => {
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

exports.doneTodo = async (req, res) => {
	console.log(req.params.id)
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


