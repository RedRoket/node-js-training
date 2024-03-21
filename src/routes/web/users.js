const express = require('express');
const parser = require('body-parser');
const { displayRoverPhoto, displayUserInfo } = require('../../controllers/web/users-controller');
const validatorMiddleware = require('../../middleware/validator-middleware');
const { webExceptionHandler } = require('../../middleware/exceptions-middleware');

const router = express.Router();

router
  .use(parser.json())
  .get('/users', (req, res) => res.render('user-form.html', { title: 'Create User' }), webExceptionHandler)
  .post('/users', validatorMiddleware('userRequestSchema'), displayUserInfo, webExceptionHandler)
  .get('/rover/photo', displayRoverPhoto, webExceptionHandler);

module.exports = router;
