FROM nginx:1.10

ARG context_path=./src/web

WORKDIR /var/www
ADD ${context_path}/app.conf /etc/nginx/conf.d/default.conf