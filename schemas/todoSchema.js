const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	desc: { type: String, required: true },
	status: {
		type: String,
		enum: ["active", "inactive"],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

module.exports = todoSchema;
