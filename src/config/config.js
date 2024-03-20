require('dotenv').config();

module.exports = {
  nasaApi: {
    apiKey: process.env.API_KEY,
    baseUrl: process.env.NASA_BASE_URL,
    asteroidsEndpoint: process.env.ASTEROIDS_FEED_ENDPOINT,
    marsPhotoEndpoint: process.env.MARS_PHOTO_ENDPOINT,
    marsManifestEndpoint: process.env.MARS_MANIFEST_ENDPOINT,
  },
  server: {
    port: process.env.PORT || 4000,
    sentryDns: process.env.SENTRY_DNS,
  },
};
