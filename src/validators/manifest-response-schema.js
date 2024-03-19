const Joi = require('@hapi/joi');

const manifestResponseSchema = Joi.object().keys({
    photo_manifest: Joi.object({
        max_date: Joi.date().required()
    }).required()
});

module.exports = manifestResponseSchema;