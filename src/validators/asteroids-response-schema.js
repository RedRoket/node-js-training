const Joi = require('@hapi/joi');

const asteroidsRequestSchema = Joi.object().keys({
  element_count: Joi.number().required(),
  near_earth_objects: Joi.object()
    .pattern(
      Joi.string(),
      Joi.array()
        .items(
          Joi.object({
            id: Joi.number().required(),
            name: Joi.string().min(1),
            estimated_diameter: Joi.object({
              meters: Joi.object({
                estimated_diameter_min: Joi.number(),
                estimated_diameter_max: Joi.number(),
              }),
            }),
            is_potentially_hazardous_asteroid: Joi.boolean().required(),
            close_approach_data: Joi.array()
              .items(
                Joi.object({
                  close_approach_date_full: Joi.date().required(),
                  relative_velocity: Joi.object({
                    kilometers_per_second: Joi.number().required(),
                  }),
                }),
              )
              .required(),
          }),
        )
        .required(),
    )
    .required(),
});

module.exports = asteroidsRequestSchema;
