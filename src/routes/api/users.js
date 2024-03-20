const express = require('express');
const parser = require('body-parser');
const receivePictureFromRover = require('../../controllers/api/users-controller');
const validatorMiddleware = require('../../middleware/validator-middleware');

const router = express.Router();

router.use(parser.json()).post('/users', validatorMiddleware('userRequestSchema'), receivePictureFromRover);

module.exports = router;
