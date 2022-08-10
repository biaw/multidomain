FROM node:16-alpine@sha256:0a997e0acb61ec89bb4d78e97aca3cd4ccd7f75c3a3985ffee7e7e09434ab1e7
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]