const express = require('express');
const apiRouter = require('../routes/api/router');
const webRouter = require('../routes/web/router');

const router = express.Router();

router.use('/api', apiRouter);
router.use('/web', webRouter);
router.get('/', (req, res) => res.render('home-page.html', { title: 'Home page' }));

module.exports = router;
