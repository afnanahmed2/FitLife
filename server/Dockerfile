FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g npm@latest

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
