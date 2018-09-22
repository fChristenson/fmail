const Joi = require("joi");

const schema = Joi.object().keys({
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(1).max(255).required()
});

module.exports = (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return next(new Error(result.error));
  }

  return next();
};
