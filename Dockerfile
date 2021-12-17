FROM node:16-alpine
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./src ./src
COPY tsconfig.json /
RUN npm run build

COPY . ./

CMD ["dumb-init", "npm", "start"]