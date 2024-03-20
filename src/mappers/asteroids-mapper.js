const { getWeek, getCurrentWeek } = require('../utils/date-utils');

const mapQueryToMeteorRequest = ({ date }) => {
  const { start, end } = typeof date !== 'undefined' ? getWeek(date) : getCurrentWeek();
  return {
    startDate: start,
    endDate: end,
  };
};

const mapAsteroidsToMeteorResponse = (asteroids) => ({
  elementCount: asteroids.element_count,
  wereDangerousMeteors: Object.values(asteroids.near_earth_objects)
    .flat()
    .some((asteroid) => asteroid.is_potentially_hazardous_asteroid),
  meteors: Object.values(asteroids.near_earth_objects)
    .flat()
    .map((asteroid) => {
      const { id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data } = asteroid;
      const { estimated_diameter_min, estimated_diameter_max } = estimated_diameter.meters;
      const { close_approach_date_full, relative_velocity } = close_approach_data[0];
      return {
        id,
        name,
        diameterInMeters: Math.floor((estimated_diameter_min + estimated_diameter_max) / 2),
        isPotentiallyHazardousAsteroids: is_potentially_hazardous_asteroid,
        closeApproachData: close_approach_date_full,
        kilometersPerSecond: relative_velocity.kilometers_per_second,
      };
    }),
});

module.exports = {
  mapQueryToMeteorRequest,
  mapAsteroidsToMeteorResponse,
};
