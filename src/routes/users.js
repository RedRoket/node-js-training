const express = require('express');
const parser = require('body-parser');
const userController = require('../controllers/users-controller');
const validator = require('../middleware/validator-middleware');

const router = express.Router();

router
    .use(parser.json())
    .route('/')
    .post(validator('userRequest'), userController.receivePictureFromRover);

module.exports = router;