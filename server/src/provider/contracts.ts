import { ethers } from "ethers";
import { ACCOUNT_PRIVATE_KEY, CONTRACT_ADDRESS } from "../config/blockchain.configs";
const abi = require("./abi/lotto.360.contract.abi.json");

const provider = new ethers.providers.InfuraProvider("rinkeby");
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);

// contracts
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

export { contract, provider };
