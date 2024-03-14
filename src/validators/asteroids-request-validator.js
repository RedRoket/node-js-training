const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const asteroidsRequestSchema = Joi.object().keys({
    date: Joi.date().format('YYYY-MM-DD'),
    count_only: Joi.boolean().sensitive(),
    were_dangerous_meteors: Joi.boolean().sensitive()
});

module.exports = asteroidsRequestSchema;