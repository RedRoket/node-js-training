const express = require('express');
const meteorsResponseMiddleware = require('../middleware/meteors-middleware');
const validator = require('../middleware/validator-middleware');
const getMeteors = require('../controllers/asteroids-controller');

const router = express.Router();

router
    .get('/', validator('asteroidsRequest'), meteorsResponseMiddleware, getMeteors);

module.exports = router;