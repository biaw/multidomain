FROM node:18-alpine@sha256:b3ca07adf425d043e180464aac97cb4f7a566651f77f4ecb87b10c10788644bb
RUN apk add dumb-init

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build

ENV PORT=80
EXPOSE 80

CMD ["dumb-init", "npm", "start"]