FROM node:16-alpine@sha256:2c405ed42fc0fd6aacbe5730042640450e5ec030bada7617beac88f742b6997b
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]