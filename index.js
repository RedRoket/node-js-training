const axios = require('axios');
const dateFns = require('date-fns');
require('dotenv').config();

const getCurrentWeek = () => {
    const today = new Date();
    const monday = dateFns.startOfWeek(today, {weekStartsOn: 1});
    const friday = dateFns.addDays(monday, 4);
    const formatDate = (date) => new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

    return { start: formatDate(monday), end: formatDate(friday) };
};

const potentiallyHazardousAsteroid = (asteroids) => {
    return Object.values(asteroids).flat().filter(({ is_potentially_hazardous_asteroid }) => is_potentially_hazardous_asteroid).length;
}

const handleResponse = (response) => {
    if (!response.data) {
        console.log('No data in response');
        return;
    }
    const { element_count: elementCount, near_earth_objects: asteroids } = response.data;
    console.log(`Total amout of object in this period were detected: ${elementCount}`);
    console.log(`Amount of objects which is potentially hazardous asteroid: ${potentiallyHazardousAsteroid(asteroids)}`);
}

const getAsteroidsWithinPeriod = (startDate = defaultStart, endDate = defaultEnd) => {
    console.log({ startDate, endDate });
    axios.get(process.env.NASA_ASTEROIDS_FEED_URL, {
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: process.env.API_KEY
        }
    })
    .then(handleResponse)
    .catch(error => console.error(`Error: ${error.message}`));
}

const { start: defaultStart, end: defaultEnd } = getCurrentWeek();
getAsteroidsWithinPeriod();