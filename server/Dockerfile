#  Stage 1
FROM node:17-alpine3.14 as ts-compiler

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . . 
RUN npm run build

# Stage 2
FROM node:17-alpine3.14 as ts-remover
WORKDIR /app
COPY --from=ts-compiler /app/package*.json ./
COPY --from=ts-compiler /app/build ./
COPY --from=ts-compiler /app/docker-entrypoint.sh ./docker-entrypoint.sh
COPY --from=ts-compiler /app/wait-for ./wait-for
RUN npm install --only=production

# Stage 3
FROM node:17-alpine3.14
WORKDIR /app
COPY --from=ts-remover /app ./
COPY --from=ts-remover /app/docker-entrypoint.sh ./docker-entrypoint.sh
COPY --from=ts-remover /app/wait-for ./wait-for
EXPOSE 3001 

CMD ["index.js"]
