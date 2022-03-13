FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env ./

EXPOSE 5002

CMD node build/app.js