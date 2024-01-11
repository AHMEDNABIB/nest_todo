const Joi = require("joi");
const schemas = {
	todoPOST: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		status: Joi.string().valid("pending", "done").required(),
	}),
};
module.exports = schemas;
