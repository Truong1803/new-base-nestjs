FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json yarn.lock ./

RUN yarn install

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app/source

CMD ["yarn", "start:prod"]

