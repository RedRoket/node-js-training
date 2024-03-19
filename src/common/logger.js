const pino = require('pino');
const fs = require('fs');

const streams = [
    {
        level: 'info',
        stream: fs.createWriteStream('./app.log', { flags: 'a' }),
    },
    {
        level: 'error',
        stream: fs.createWriteStream('./error.log', { flags: 'a' }),
    },
    {
        stream: process.stdout
    }
];

module.exports = pino(
    {
        level: 'info',
    },
    pino.multistream(streams)
);