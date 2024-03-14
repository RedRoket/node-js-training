const createHttpError = require('http-errors');
const Joi = require('@hapi/joi');
const Validators = require('../validators');

module.exports = (validator) => {
    if(!Validators.hasOwnProperty(validator)) {
        throw new Error(`'${validator}' validator is not exist`);
    }

    return async function(req, res, next) {
        try {
            if (req.method.toLowerCase() === 'get') {
                const validated = await Validators[validator].validateAsync(req.query);
                req.query = validated;
                next();
                return;
            }
            const validated = await Validators[validator].validateAsync(req.body);
            req.body = validated;
            next();
        } catch (err) {
            if (err.isJoi) {
                return next(createHttpError(422, {message: err.message}));
            }
            next(createHttpError(500));
        }
    }
}