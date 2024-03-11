const axios = require('axios');
require('dotenv').config();

const potentiallyHazardousAsteroid = (asteroids) =>
    Object.values(asteroids).flat().filter(({ is_potentially_hazardous_asteroid }) => is_potentially_hazardous_asteroid).length;

const logAsteroidsInfo = (asteroidsData) => {
    const { element_count: elementCount, near_earth_objects: asteroids } = asteroidsData;
    console.log(`Total amout of object in this period were detected: ${elementCount}`);
    console.log(`Amount of objects which is potentially hazardous asteroid: ${potentiallyHazardousAsteroid(asteroids)}`);
}

const handleResponse = (response) => {
    if (!response.data) {
        console.log('No data in response');
        return;
    }
    const asteroidsData = response.data;
    logAsteroidsInfo(asteroidsData);
    return asteroidsData;
}

const getAsteroidsWithinPeriod = (startDate, endDate) => {
    console.log({ startDate, endDate });
    return axios.get(process.env.NASA_ASTEROIDS_FEED_URL, {
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: process.env.API_KEY
        }
    })
    .then(handleResponse)
    .catch(error => console.error(`Error: ${error.message}`));
}

module.exports = getAsteroidsWithinPeriod;