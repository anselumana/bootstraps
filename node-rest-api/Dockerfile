FROM node:16

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

# set node environment
ENV NODE_ENV=stg

# make sure it matches the app's port
EXPOSE 4040

# start the app
CMD [ "node", "./dist/server.js" ]