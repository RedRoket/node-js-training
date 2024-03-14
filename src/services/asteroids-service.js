const axios = require('axios');
const { mapAsteroidsToMeteorResponse } = require('../mappers/asteroids-mapper');
const Exception = require('../common/Exception');
const logger = require('../common/logger');
const config = require('../config/config');

const { apiKey, baseUrl, asteroidsEndpoint } = config.nasaApi;

const potentiallyHazardousAsteroid = (asteroids) =>
    Object.values(asteroids).flat().filter(({ is_potentially_hazardous_asteroid }) => is_potentially_hazardous_asteroid).length;

const logAsteroidsInfo = (asteroidsData) => {
    const { element_count: elementCount, near_earth_objects: asteroids } = asteroidsData;
    logger.info(`Total amout of object in this period were detected: ${elementCount}`);
    logger.info(`Amount of objects which is potentially hazardous asteroid: ${potentiallyHazardousAsteroid(asteroids)}`);
}

const handleResponse = (response) => {
    if (!response.data) {
        throw new Exception(400, 'No data in NASA response');
    }
    const asteroidsData = response.data;
    logAsteroidsInfo(asteroidsData);
    return mapAsteroidsToMeteorResponse(asteroidsData);
}

const getAsteroidsWithinPeriod = ({ startDate, endDate }) => {
    return axios.get(baseUrl + asteroidsEndpoint, {
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: apiKey
        }
    })
    .then(handleResponse)
    .catch(error => {
        throw new Exception(error.statusCode, error.message);
    });
}

module.exports = getAsteroidsWithinPeriod;