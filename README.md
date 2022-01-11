# Lotto360 project

This project is consist of four parts:

1. Reactjs frontend
2. Nodejs backend
3. Solidity hardhat for block-chain
4. Mongodb for database

## How to run

Follow the instructions from root directory:

```bash
cd contract && npx hardhat run --network rinkeby scripts/deploy.js
cd ../client && npm start
cd ../server && npm start
```

\
After deploying contract place contract address in `docker-compose.yaml` and `client/src/config/config.ts`

\
For first deployment on remote docker instance just run the code below from root directory:

```bash
./init-letsencrypt.sh
```

\
For updating implemented project on remote server run:

```bash
DOCKER_HOST="ssh://root@remoteipaddress" docker-compose up -d --no-deps --build
```
