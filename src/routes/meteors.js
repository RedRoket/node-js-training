const express = require('express');
// const partialResponse = require('express-partial-response');
const meteorsResponseMiddleware = require('../middleware/meteors-middleware');
const validator = require('../middleware/validator-middleware');
const getMeteors = require('../controllers/asteroids-controller');

const router = express.Router();

// using https://github.com/nemtsov/express-partial-response
// from https://expressjs.com/en/resources/middleware.html
// cheat way te get countOnly (example: http://localhost:4000/meteors?filter=elementCount)
router
    // .use(
    //     partialResponse({
    //         query: 'filter'
    //     }))
    .get('/', validator('asteroidsRequest'), meteorsResponseMiddleware, getMeteors)
    .get('/test', getMeteors);

module.exports = router;