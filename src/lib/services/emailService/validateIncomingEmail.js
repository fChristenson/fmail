const Joi = require("joi");

const emailSchema = Joi.string().email().max(255);

const schema = Joi.object().keys({
  recipients: Joi.array().items(emailSchema).min(1).required(),
  subject: Joi.string().min(1).max(255).required(),
  message: Joi.string().min(1).max(1000).required()
});

module.exports = (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return next(new Error(result.error));
  }

  return next();
};
