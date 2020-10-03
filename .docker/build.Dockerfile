FROM node:12.18.3-alpine3.9
WORKDIR /app

COPY package.json ./
RUN yarn

COPY . ./
RUN CI=true yarn test && \
    PUBLIC_URL=https://my-repositories.github.io/test-task__react__fugr-ru/ yarn run build
