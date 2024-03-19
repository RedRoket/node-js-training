const processUserData = require('../../services/users-service');
const getLatestRoverPhoto = require('../../services/mars-photo-service');
const { mapRequestBodyToUserRequest } = require('../../mappers/users-mapper');

const displayUserInfo = async (req, res, next) => {
    try {
        const userRequest = mapRequestBodyToUserRequest(req.body);
        const userInfo = await processUserData(userRequest);
        res.render('user-info.html', userInfo);
    } catch (err) {
        next(err);
    }
}

const displayRoverPhoto = async (req, res, next) => {
    try {
        const roverPhotoUrl = await getLatestRoverPhoto();
        res.render('rover-photo.html', { roverPhotoUrl });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    displayRoverPhoto,
    displayUserInfo
};