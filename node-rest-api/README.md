# NodeJS REST API
NodeJS REST API with [express.js](https://expressjs.com/), [typescript](https://www.typescriptlang.org/) and [mongodb](https://www.mongodb.com/).

## Quick Start
To get started developing your own API using this template, just follow these steps:
1. clone this repo
2. cd into `/node-rest-api`
3. install deps with `npm install`

Finally, just run `npm start`.
You can find a swagger UI at the `/docs` endpoint.

## Features
Besides typescript, express and mongodb, this API has the following features:
* configurable [winston]() logging
* request validation with [zod](https://zod.dev/)
* [swagger](https://swagger.io/) (auto-generated with [swagger-autogen](https://www.npmjs.com/package/swagger-autogen))
* [docker](https://www.docker.com/)
* [nodemon](https://www.npmjs.com/package/nodemon) for API auto-restart on source edits

## Dev Guides
The following sections provide some help on some specific topics.
### Docker
Here are some common docker commands you might find useful.
#### Build
`docker build . -t <image_name>` (add `--no-cache` option to disable caching)
#### Run
`docker run --name <container_name> -p <HOST_PORT>:<CONTAINER_PORT> -e ENV1=value1 -e ENV2=value2 -d <image_name>`