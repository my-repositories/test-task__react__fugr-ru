FROM my-repositories/test-task__react__fugr-ru:build as build
FROM nginx:stable-alpine as runtime

RUN apk add perl

COPY ./rootfs /
COPY --from=build /app/build /usr/share/nginx/html

RUN perl -i -pe 's#https://my-repositories.github.io/test-task__react__fugr-ru/#/#g' /usr/share/nginx/html/index.html
CMD ["nginx", "-g", "daemon off;"]
