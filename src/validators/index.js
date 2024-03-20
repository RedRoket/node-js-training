const asteroidsRequestSchema = require('./asteroids-request-schema');
const asteroidsResponseSchema = require('../validators/asteroids-response-schema');
const userRequestSchema = require('../validators/user-request-schema');
const manifestResponseSchema = require('../validators/manifest-response-schema');
const marsPhotoResponseSchema = require('../validators/mars-photo-response-schema');

module.exports = {
  asteroidsRequestSchema,
  userRequestSchema,
  asteroidsResponseSchema,
  manifestResponseSchema,
  marsPhotoResponseSchema,
};
