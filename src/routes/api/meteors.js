const express = require('express');
const meteorsResponseMiddleware = require('../../middleware/meteors-middleware');
const validatorMiddleware = require('../../middleware/validator-middleware');
const getMeteors = require('../../controllers/api/asteroids-controller');
const { apiExceptionHandler } = require('../../middleware/exceptions-middleware');

const router = express.Router();

router.get(
  '/meteors',
  validatorMiddleware('asteroidsRequestSchema'),
  meteorsResponseMiddleware,
  getMeteors,
  apiExceptionHandler,
);

module.exports = router;
