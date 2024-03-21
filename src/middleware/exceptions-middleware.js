const logger = require('../common/logger');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const apiExceptionHandler = (err, req, res, next) => {
  logger.error(`api error : ${err}`);
  if (!err.statusCode) {
    res.status(500).json({
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    message: err.message,
  });
};

// eslint-disable-next-line no-unused-vars
const webExceptionHandler = (err, req, res, next) => {
  logger.error(`web error : ${err}`);
  res.render(path.resolve(__dirname, '..', 'views', 'error.html'), { message: err.message });
};

module.exports = {
  apiExceptionHandler,
  webExceptionHandler,
};
