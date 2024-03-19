const express = require('express');
const parser = require('body-parser');
const receivePictureFromRover = require('../controllers/users-controller');
const validatorMiddleware = require('../middleware/validator-middleware');

const router = express.Router();

router
    .use(parser.json())
    .route('/')
    .post(validatorMiddleware('userRequestSchema'), receivePictureFromRover);

module.exports = router;