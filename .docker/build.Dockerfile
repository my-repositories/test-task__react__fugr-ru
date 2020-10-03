FROM node:12.18.3-alpine3.9
WORKDIR /app

COPY package.json ./
RUN yarn

COPY . ./
RUN CI=true yarn test && \
    yarn run build