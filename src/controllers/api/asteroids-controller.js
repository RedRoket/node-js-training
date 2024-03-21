const getAsteroidsWithinPeriod = require('../../services/asteroids-service');
const { mapQueryToMeteorRequest } = require('../../mappers/asteroids-mapper');

const getMeteors = async (req, res, next) => {
  try {
    const meteorsResponse = await getAsteroidsWithinPeriod(mapQueryToMeteorRequest(req.query));
    res.json(meteorsResponse);
  } catch (err) {
    next(err);
  }
};

module.exports = getMeteors;
