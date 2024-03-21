# Node-js-Training

proxy service for [NASA API](https://api.nasa.gov/)

# Getting Started

to install needed dependences:

```sh
npm install
```

to run the app:

```sh
npm run start
```

To run the app locally  use (in auto-restart mode on code changes):

```sh
npm run dev
```

To run app in docker container:

```sh
npm run docker
```

To run app in docker container with auto-restart on code changes:

```sh
npm run docker-dev
```

To run EsLint:

```sh
npm run lint
```

To run EsLint and automatically fix found issues if possible:

```sh
npm run lint:fix
```

To run Prettier (format code):

```sh
npm run prettier
```

# Environment Variables

- **API_KEY** - NASA API key, generated via [Generate API Key](https://api.nasa.gov/#signUp)
- **NASA_BASE_URL** - Base NASA API URL
- **ASTEROIDS_FEED_ENDPOINT** - Asteroids Feed Endpoint
- **MARS_PHOTO_ENDPOINT** - Mars Rover Photos Endpoint
- **MARS_MANIFEST_ENDPOINT** - Rover Manifest Endpoint
- **PORT** - Port on which Server will run
- **SENTRY_DSN** - Sentry Data Source name