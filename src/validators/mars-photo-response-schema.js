const Joi = require('@hapi/joi');

const marsPhotoResponseSchema = Joi.object().keys({
  photos: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        img_src: Joi.string().required(),
      }),
    )
    .required(),
});

module.exports = marsPhotoResponseSchema;
