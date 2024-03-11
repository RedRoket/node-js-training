const express = require('express');
const asteroidsController = require('../controllers/usersController');

const router = express.Router();

router
    .route('/')
    .post(asteroidsController.receivePictureFromRover);

module.exports = router;