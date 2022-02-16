#  Stage 1
FROM node:17.4.0-alpine3.15 as ts-compiler
LABEL stage="build-stage"

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . . 
RUN npm run build

# Stage 2
FROM node:17.4.0-alpine3.15 as ts-remover
WORKDIR /app
COPY --from=ts-compiler /app/package*.json ./
COPY --from=ts-compiler /app/build ./
RUN npm install --only=production

# Stage 3
FROM node:17.4.0-alpine3.15
WORKDIR /app
COPY --from=ts-remover /app ./

RUN npm install pm2@5.1.2 -g

EXPOSE 3001 

CMD ["pm2-runtime", "start", "index.js", "-i", "max"]
