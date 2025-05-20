FROM node:19.5.0-alpine

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH
ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./


RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g
RUN npm install react-router-dom --save


COPY . ./

EXPOSE 3000

CMD [ "npm", "start"]