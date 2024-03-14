const processUserData = require('../services/users-service');
const getLatestRoverPhoto = require('../services/mars-photo-service');
const { mapRequestBodyToUserRequest } = require('../mappers/users-mapper');

const receivePictureFromRover = async (req, res, next) => {
    try {
        const userRequest = mapRequestBodyToUserRequest(req.body);
        await processUserData(userRequest);
        const imgUrl = await getLatestRoverPhoto();
        res.send(`<img src="${imgUrl}">`);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    receivePictureFromRover
};