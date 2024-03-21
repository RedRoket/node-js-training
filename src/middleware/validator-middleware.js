const createHttpError = require('http-errors');
const validators = require('../validators');

module.exports = (schemaName) => {
  const validator = validators[schemaName];
  if (!validator) {
    throw new Error(`'${validator}' validator is not exist`);
  }

  return async function (req, res, next) {
    try {
      const { method, query, body } = req;

      if (method.toLowerCase() === 'get') {
        await validator.validateAsync(query);
        next();
        return;
      }
      await validator.validateAsync(body);
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      }
      next(createHttpError(500));
    }
  };
};
