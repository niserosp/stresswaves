FROM node as builder
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build

FROM staticfloat/nginx-certbot

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .