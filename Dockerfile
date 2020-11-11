FROM node as builder
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/nginx.conf

# SSL
## certbot edits the nginx configuration
RUN apk add certbot certbot-nginx && \
    certbot --nginx --non-interactive --agree-tos --cert-name stresswaves.com -d stresswaves.com -d www.stresswaves.com -m rsforbes0@gmail.com