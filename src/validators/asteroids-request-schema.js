const Joi = require('@hapi/joi');

const asteroidsRequestSchema = Joi.object().keys({
  date: Joi.date().iso(),
  count_only: Joi.boolean().sensitive(),
  were_dangerous_meteors: Joi.boolean().sensitive(),
});

module.exports = asteroidsRequestSchema;
