FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env ./

EXPOSE 5001

CMD node build/app.js