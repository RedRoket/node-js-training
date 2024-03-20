const express = require('express');
const meteorsRoutes = require('./meteors');
const usersRoutes = require('./users');

const router = express.Router();

router.use('/', meteorsRoutes);
router.use('/', usersRoutes);

module.exports = router;
