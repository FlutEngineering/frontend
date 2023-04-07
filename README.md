# FLUT Frontend
[![build](https://github.com/FlutEngineering/frontend/actions/workflows/build.yml/badge.svg)](https://github.com/FlutEngineering/frontend/actions/workflows/build.yml)

## Development

Before building you need to initialize the project:

```bash
yarn
cp .env.example .env
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.

## Deployment

Commits from `main` branch are automatically rolled out to https://dev.flut.cloud and version-tagged commits are deployed to https://flut.cloud
