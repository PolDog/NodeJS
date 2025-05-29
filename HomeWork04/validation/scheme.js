const Joi = require("joi");

const idScheme = Joi.object({
	id: Joi.number().required(),
});
const userScheme = Joi.object({
	name: Joi.string().min(5).required(),
	description: Joi.string().min(5).required(),
});

module.exports = { userScheme, idScheme };
