FROM node:16

WORKDIR /webserver

COPY package*.json ./
RUN npm i

COPY . .

CMD [ "npm", "start" ]