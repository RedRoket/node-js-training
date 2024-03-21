const getAsteroidsWithinPeriod = require('../../services/asteroids-service');
const { mapQueryToMeteorRequest } = require('../../mappers/asteroids-mapper');

const displayMeteors = async (req, res, next) => {
  try {
    const meteorsResponse = await getAsteroidsWithinPeriod(mapQueryToMeteorRequest(req.query));
    res.render('meteors.html', meteorsResponse);
  } catch (err) {
    next(err);
  }
};

module.exports = displayMeteors;
