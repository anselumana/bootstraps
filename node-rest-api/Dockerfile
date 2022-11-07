FROM node:latest

WORKDIR /usr/src/app

# copy both package.json and package.lock.json
COPY package*.json ./

# install deps
RUN npm install

# copy whole root
# skip files by adding them to .dockerignore
COPY . .

# transapile typescript into js
RUN npm run build

# to set env variables, use the -e flag with `docker run`

# make sure it matches the app's port
EXPOSE 8080

# start the app
CMD [ "node", "./dist/server.js" ]