const logger = require('../common/logger');

const processUserData = ({ userId, userName, apiKey }) => {
  logger.info(`Work-in-Progress: process user data - userId(${userId}), userName(${userName}), apiKey(${apiKey})`);
  return { userId, userName };
};

module.exports = processUserData;
