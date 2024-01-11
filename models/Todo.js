const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		status: {
			type: String,
			enum: ["inprogress", "done", "important"],
			default: "inprogress",
		},
		tags: {
			type: String,
		},

		priority: {
			type: String,
			enum: ["Low", "Medium", "High"],
		},
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
