FROM node:8

ARG PORT=8080

ENV PORT=$PORT

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build
# If you are building your code for production
# RUN npm install --only=production

EXPOSE $PORT
CMD [ "npm", "start" ]