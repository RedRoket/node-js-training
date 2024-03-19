const getAsteroidsWithinPeriod = require('../../services/asteroids-service');
const { mapQueryToMeteorRequest } = require('../../mappers/asteroids-mapper');

const displayMeteors = async (req, res, next) => {
    try {
        const data = await getAsteroidsWithinPeriod(mapQueryToMeteorRequest(req.query));
        res.render('meteors.html', data);
    } catch (err) {
        next(err);
    }
}

module.exports = displayMeteors;