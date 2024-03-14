const axios = require('axios');
const { format } = require('date-fns');
const Exception = require('../common/Exception');
const logger = require('../common/logger');
const config = require('../config/config');

const { apiKey, baseUrl, marsPhotoEndpoint, marsManifestEndpoint } = config.nasaApi;
const DATE_FORMAT = 'yyyy-MM-dd';

const handlePhotoResponse = (response) => {
    if (!response.data) {
        throw new Exception(400, 'No data in NASA response');
    }

    const photos = response.data.photos;
    const latestPhoto = photos[photos.length - 1];
    return latestPhoto.img_src;
};

const handleManifestResponse = async (response) => {
    // const latestDate = format(new Date(Math.max.apply(null, response.data.photo_manifest.photos.map(function (e) {
    //     return new Date(e.earth_date);
    // }))), DATE_FORMAT);
    const latestDate = format(new Date(response.data.photo_manifest.max_date), DATE_FORMAT);
    logger.info(`latest DATE : ${latestDate}`);

    const photoResponse = await axios.get(baseUrl + marsPhotoEndpoint, {
        params: {
            earth_date: latestDate,
            api_key: apiKey
        }
    });

    return handlePhotoResponse(photoResponse);
};

const getLatestRoverPhoto = () => {
    return axios.get(baseUrl + marsManifestEndpoint, {
        params: {
            api_key: apiKey
        }
    })
    .then(handleManifestResponse)
    .catch(error => {
        throw new Exception(error.statusCode, error.message);
    });
};

module.exports = getLatestRoverPhoto;