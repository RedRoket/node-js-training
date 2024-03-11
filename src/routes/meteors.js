const express = require('express');
const asteroidsController = require('../controllers/asteroidsController');

const router = express.Router();

router
    .route('/')
    .get(asteroidsController.getAsteroids)
    .post(asteroidsController.receivePictureFromRover);

module.exports = router;