const Joi = require("joi");

const emailSchema = Joi.string().email().max(255);

module.exports = emailSchema;
