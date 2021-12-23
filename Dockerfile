FROM node:16-alpine
RUN apk add dumb-init

WORKDIR /app

COPY package*.json .
RUN npm i

COPY ./src .
COPY tsconfig.json .
RUN npm run build

COPY . .

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]