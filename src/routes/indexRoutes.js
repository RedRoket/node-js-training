const express = require('express');
const meteorsRoutes = require('./meteors');
const usersRoutes = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/meteors', meteorsRoutes);
router.use('/users', usersRoutes);

module.exports = router;