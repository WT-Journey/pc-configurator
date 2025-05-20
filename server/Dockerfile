FROM node:19.5.0-alpine

WORKDIR /server

ENV PATH=/server/node_modules/.bin:$PATH

COPY package*.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 8080

CMD [ "npm", "run", "start"]