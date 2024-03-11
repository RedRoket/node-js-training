const getAsteroidsWithinPeriod = require('../services/asteroidsService');
const getCurrentWeek = require('../utils/getCurrentWeek');
const asteroidsMapper = require('../mappers/asteroidsMapper');

const getAsteroids = async (req, res) => {
    try {
        const { start, end } = getCurrentWeek();
        const data = await getAsteroidsWithinPeriod(start, end);
        res.json(asteroidsMapper(data));
    } catch (err) {
        res.status(500).send(err);
    }
}

const receivePictureFromRover = (req, res) => {
    // TODO PROXY-11: Implement an endpoint of type POST
    res.json({ WIP: 'Work-in-Progress' });
}

module.exports = {
    getAsteroids,
    receivePictureFromRover
};