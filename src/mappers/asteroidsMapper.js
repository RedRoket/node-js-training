module.exports = (asteroids) => ({
    elementCount: asteroids.element_count,
    meteors: Object.values(asteroids.near_earth_objects).flat().map(asteroid => {
        const { id, name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data } = asteroid;
        const { estimated_diameter_min, estimated_diameter_max } = estimated_diameter.meters;
        const { close_approach_date_full, relative_velocity } = close_approach_data[0];
        const kilometers_per_second = relative_velocity.kilometers_per_second;
        return {
            id,
            name,
            diameterInMeters: Math.floor((estimated_diameter_min + estimated_diameter_max) / 2),
            isPotentiallyHazardousAsteroids: is_potentially_hazardous_asteroid,
            closeApproachData: close_approach_date_full,
            kilometersPerSecond: kilometers_per_second
        }
    })
});