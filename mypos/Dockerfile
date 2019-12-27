
# Stage 0, "builder", based on Node.js, to build and compile
FROM node:12.8-alpine AS builder
WORKDIR /usr/src/app
COPY . .

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Build your image using the development environment (no configuration)
# docker .... --build-arg configuration=""

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine
COPY src/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/out/ .


