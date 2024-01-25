const Joi = require("joi");
const schemas = {
	todoPOST: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string(),
		status: Joi.string()
			.valid("inprogress", "done", "important")
			.required(),
		tags: Joi.string().required(),
		priority: Joi.string().valid("Low", "Medium", "High").required(),
	}),
};
module.exports = schemas;
