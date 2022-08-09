FROM node:16-alpine@sha256:e28958d905390c70b5323906b81121ee664c9b4531a6187b4aa5e73e962cee41
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]