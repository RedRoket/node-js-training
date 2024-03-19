const axios = require('axios');
const createHttpError = require('http-errors');
const { format } = require('date-fns');
const { manifestResponseSchema, marsPhotoResponseSchema } = require('../validators');
const Exception = require('../common/Exception');
const logger = require('../common/logger');
const config = require('../config/config');

const { apiKey, baseUrl, marsPhotoEndpoint, marsManifestEndpoint } = config.nasaApi;
const DATE_FORMAT = 'yyyy-MM-dd';

const handlePhotoResponse = async (response) => {
    try {
        const validatedResponse = await marsPhotoResponseSchema.validateAsync(response.data, {
            abortEarly: false,
            stripUnknown: true
        });
        const photos = validatedResponse.photos;
        const latestPhoto = photos[photos.length - 1];
    
        return latestPhoto.img_src;
    } catch (err) {
        if (err.isJoi) {
            throw createHttpError(500, { message: "Nasa Rover Photos response: Invalid response format" });
        }
        throw new Exception(err.statusCode, err.message);
    }
};

const handleManifestResponse = async (response) => {
    try {
        const validatedResponse = await manifestResponseSchema.validateAsync(response.data, {
            abortEarly: false,
            stripUnknown: true
        });
        const latestDate = format(new Date(validatedResponse.photo_manifest.max_date), DATE_FORMAT);

        const photoResponse = await axios.get(baseUrl + marsPhotoEndpoint, {
            params: {
                earth_date: latestDate,
                api_key: apiKey
            }
        });

        return handlePhotoResponse(photoResponse);
    } catch (err) {
        if (err.isJoi) {
            throw createHttpError(500, { message: "Nasa Manifest response: Invalid response format" });
        }
        throw new Exception(err.statusCode, err.message);
    }
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