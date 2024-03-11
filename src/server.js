const express = require('express');
const router = require('./routes/indexRoutes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});