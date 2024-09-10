FROM node:21-alpine3.18

WORKDIR /backend

COPY package*.json ./

RUN npm ci

COPY ./ ./

CMD node --watch ./index.js