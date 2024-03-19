const express = require('express');
const validatorMiddleware = require('../../middleware/validator-middleware');
const displayMeteors = require('../../controllers/web/asteroids-controller');

const router = express.Router();

router
    .get('/meteors', validatorMiddleware('asteroidsRequestSchema'), displayMeteors);

module.exports = router;