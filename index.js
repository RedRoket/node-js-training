const axios = require('axios');

const NASA_ASTEROIDS_FEED_URL = 'https://api.nasa.gov/neo/rest/v1/feed';
const API_KEY = 'eLmnePyuHtTVKYHiKBC7fVH4weBUtTMiZIGoZftC';

const getCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    monday.setHours(1, 0, 0, 0);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    const formatDate = date => date.toISOString().split('T')[0];
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
    axios.get(NASA_ASTEROIDS_FEED_URL, {
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: API_KEY
        }
    })
    .then(handleResponse)
    .catch(error => console.error(`Error: ${error.message}`));
}

const { start: defaultStart, end: defaultEnd } = getCurrentWeek();
getAsteroidsWithinPeriod();