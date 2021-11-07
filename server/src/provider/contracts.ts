import { ethers } from "ethers";
import {
    ACCOUNT_PRIVATE_KEY,
    CONTRACT_ADDRESS,
    TOKEN_ADDRESS,
} from "../config/blockchain.configs";
import { ERC20Abi } from "./abi/Erc20";
import { Lotto360Abi } from "./abi/Lotto360";

const provider = new ethers.providers.InfuraProvider("rinkeby");
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);

// contracts
const contract = new ethers.Contract(TOKEN_ADDRESS, Lotto360Abi, wallet);
const token = new ethers.Contract(CONTRACT_ADDRESS, ERC20Abi, wallet);

export { token, contract, provider };
