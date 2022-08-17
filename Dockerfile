FROM node:16-alpine@sha256:c9f2ec65f312d3f253c58ca1f0981bd81a53ac6936b2d66dd824eca526a0db61
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]