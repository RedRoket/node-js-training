const createHttpError = require('http-errors');
const validators = require('../validators');

module.exports = (schemaName) => {
  const validator = validators[schemaName];
  if (!validator) {
    throw new Error(`'${validator}' validator is not exist`);
  }

  return async function (req, res, next) {
    try {
      if (req.method.toLowerCase() === 'get') {
        const validated = await validator.validateAsync(req.query);
        req.query = validated;
        next();
        return;
      }
      const validated = await validator.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      }
      next(createHttpError(500));
    }
  };
};
