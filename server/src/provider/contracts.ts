import { ethers } from "ethers";
import obj from "./abi/Lotto360.abi.json";
import { ACCOUNT_PRIVATE_KEY, CONTRACT_ADDRESS } from "../config/blockchain.configs";

const provider = new ethers.providers.InfuraProvider("rinkeby");
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);

// contracts
const contract = new ethers.Contract(CONTRACT_ADDRESS, obj, wallet);

export { contract, provider };
