const express = require('express');
const morgan = require('morgan');
const boolParser = require('express-query-boolean');
const router = require('./routes/index');
const exceptionHandler = require('./middleware/exceptions-middleware');
const Sentry = require('@sentry/node');
const logger = require('./common/logger');
const config = require('./config/config');

const { port, sentryDns } = config.server;
const app = express();

Sentry.init({
    dsn: sentryDns,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(morgan('combined'));
app.use(boolParser());
app.use('/', router);
app.use(Sentry.Handlers.errorHandler());
app.use(exceptionHandler);

app.listen(port, () => {
    logger.info(`Server started: http://localhost:${port}`);
});