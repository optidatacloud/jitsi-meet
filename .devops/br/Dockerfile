FROM node:21.6-alpine3.19 AS builder

RUN apk update && apk upgrade && apk add git g++ make

RUN mkdir -p /jitsi-meet

WORKDIR /jitsi-meet

COPY . .

COPY .devops/br/config.js .

RUN npm ci

RUN make

FROM nginx:1.25.4-alpine AS web

WORKDIR /srv/jitsi-meet

# NGINX
COPY .devops/nginx-jitsi.conf /etc/nginx/sites-available/jitsi.conf
COPY .devops/nginx-default.conf /etc/nginx/conf.d/default.conf

RUN mkdir /etc/nginx/sites-enabled

RUN ln -s /etc/nginx/sites-available/jitsi.conf /etc/nginx/sites-enabled/jitsi.conf

COPY --from=builder /jitsi-meet/*.html /jitsi-meet/*.js /jitsi-meet/*.txt /jitsi-meet/manifest.json ./
COPY --from=builder /jitsi-meet/css/ ./css
COPY --from=builder /jitsi-meet/images/ ./images
COPY --from=builder /jitsi-meet/lang/ ./lang
COPY --from=builder /jitsi-meet/libs/ ./libs
COPY --from=builder /jitsi-meet/static/ ./static
COPY --from=builder /jitsi-meet/sounds/ ./sounds