const express = require('express');
const validatorMiddleware = require('../../middleware/validator-middleware');
const displayMeteors = require('../../controllers/web/asteroids-controller');
const { webExceptionHandler } = require('../../middleware/exceptions-middleware');

const router = express.Router();

router.get('/meteors', validatorMiddleware('asteroidsRequestSchema'), displayMeteors, webExceptionHandler);

module.exports = router;
