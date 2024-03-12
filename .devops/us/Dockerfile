FROM node:21.6-alpine3.19 AS builder

RUN apk update && apk upgrade && apk add git g++ make

RUN mkdir -p /jitsi-meet

WORKDIR /jitsi-meet

COPY . .

RUN npm ci

RUN make

FROM jitsi/web:stable-9258 AS base

WORKDIR /usr/share/jitsi-meet

COPY --from=builder /jitsi-meet/*.html /jitsi-meet/*.js /jitsi-meet/*.txt /jitsi-meet/manifest.json ./
COPY --from=builder /jitsi-meet/css/ ./css
COPY --from=builder /jitsi-meet/images/ ./images
COPY --from=builder /jitsi-meet/lang/ ./lang
COPY --from=builder /jitsi-meet/libs/ ./libs
COPY --from=builder /jitsi-meet/static/ ./static
COPY --from=builder /jitsi-meet/sounds/ ./sounds
RUN cp /usr/share/jitsi-meet/lang/countries-en.json /usr/share/jitsi-meet/lang/countries.json

COPY .devops/us/config.js /config/config.js