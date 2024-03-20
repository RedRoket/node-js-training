const express = require('express');
const path = require('node:path');
const nunjucks = require('nunjucks');
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
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Sentry.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});

nunjucks.configure(path.resolve(__dirname, './views'), {
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(boolParser());
app.use('/', router);
app.use(Sentry.Handlers.errorHandler());
app.use(exceptionHandler);
app.use('*', (req, res) =>
  res.render(path.resolve(__dirname, 'views', 'page-not-found.html'), { titel: 'Page not found' }),
);

app.listen(port, () => {
  logger.info(`Server started: http://localhost:${port}`);
});
