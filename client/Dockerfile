# # Stage 1
# FROM node:16-alpine as build-stage
# LABEL stage="build-stage"

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# RUN npm run buildlegacy

# Stage 2
FROM nginx:1.21.3-alpine
COPY ./build /usr/share/nginx/html
COPY ./nginx/default.conf              /etc/nginx/conf.d/default.conf
COPY ./nginx/ssl-dhparams.pem          /etc/data/ssl-dhparams.pem
COPY ./nginx/options-ssl-nginx.conf    /etc/data/options-ssl-nginx.conf

EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]