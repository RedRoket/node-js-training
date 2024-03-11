const express = require('express');
const meteorsRoutes = require('./meteors');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/meteors', meteorsRoutes);

module.exports = router;