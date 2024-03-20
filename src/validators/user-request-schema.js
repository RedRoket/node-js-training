const Joi = require('@hapi/joi');

const userRequestSchema = Joi.object({
  user_id: Joi.number().required(),
  user_name: Joi.string().min(3),
  api_key: Joi.string().alphanum().length(40).required(),
});

module.exports = userRequestSchema;
