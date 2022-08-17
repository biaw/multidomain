FROM node:16-alpine@sha256:c306330f5837c0cc058dadb0165df76f8179078c961539cc73c1dc08a9f30e8e
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]