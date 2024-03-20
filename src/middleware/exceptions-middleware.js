const logger = require('../common/logger');

module.exports = (err, req, res) => {
  logger.error(err);
  if (!err.statusCode) {
    res.status(500).json({
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    message: err.message,
  });
};
