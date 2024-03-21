const express = require('express');
const parser = require('body-parser');
const receivePictureFromRover = require('../../controllers/api/users-controller');
const validatorMiddleware = require('../../middleware/validator-middleware');
const { apiExceptionHandler } = require('../../middleware/exceptions-middleware');

const router = express.Router();

router
  .use(parser.json())
  .post('/users', validatorMiddleware('userRequestSchema'), receivePictureFromRover, apiExceptionHandler);

module.exports = router;
