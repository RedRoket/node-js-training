const express = require('express');
const parser = require('body-parser');
const { displayRoverPhoto, displayUserInfo } = require('../../controllers/web/users-controller');
const validatorMiddleware = require('../../middleware/validator-middleware');

const router = express.Router();

router
  .use(parser.json())
  .get('/users', (req, res) => res.render('user-form.html', { title: 'Create User' }))
  .post('/users', validatorMiddleware('userRequestSchema'), displayUserInfo)
  .get('/rover/photo', displayRoverPhoto);

module.exports = router;
