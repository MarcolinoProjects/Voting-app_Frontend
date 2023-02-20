# Name the node stage "builder"
FROM node:14 AS builder

WORKDIR /usr/src
COPY package*.json ./
RUN npm install --registry=https://registry.npmjs.org
COPY tsconfig.json tsconfig.json

COPY src src
COPY public public
ARG SOCKET_IO_PATH=/events/socket.io
ARG SOCKET_IO_HOST=/
ARG API_HOST=/api
ENV REACT_APP_SOCKET_IO_PATH=${SOCKET_IO_PATH}
ENV REACT_APP_SOCKET_IO_HOST=${SOCKET_IO_HOST}
ENV REACT_APP_API_HOST=${API_HOST}
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
LABEL author="Victor Marcolino<marcolino.victor@gmail.com>"
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /usr/src/build .
COPY nginx.conf /etc/nginx/nginx.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]