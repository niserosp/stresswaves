FROM node as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/nginx.conf
