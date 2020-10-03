FROM my-repositories/test-task__react__fugr-ru as build

FROM nginx:stable-alpine as runtime

COPY ./rootfs /
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]