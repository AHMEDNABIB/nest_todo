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
			enum: ["inprogress", "done", "important","trash"],
			default: "inprogress",
		},
		tags: {
			type: String,
		},

		priority: {
			type: String,
			enum: ["Low", "Medium", "High"],
		},
		isDone: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
		isImportant: { type: Boolean, default: false },
		expired_at: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

todoSchema.index({ expired_at: 1 }, { expireAfterSeconds: 2 * 24 * 60 * 60 });


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
