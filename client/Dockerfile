###############################################
# Stage 1
FROM node:16-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run buildlegacy

###############################################
# Stage 2
FROM nginx:1.21.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]