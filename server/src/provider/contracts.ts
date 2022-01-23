import { ethers } from "ethers";
import lotto360Abi from "./abi/Lotto360.abi.json";
import dice360Abi from "./abi/Dice360.abi.json";
import numberOfTheBeastAbi from "./abi/NumberOfTheBeast.abi.json";
import {
    ACCOUNT_PRIVATE_KEY,
    DICE360_CONTRACT_ADDRESS,
    LOTTO360_CONTRACT_ADDRESS,
    NUMBEROFTHEBEAST_CONTRACT_ADDRESS,
} from "../config/blockchain.configs";

export const provider = new ethers.providers.InfuraProvider("rinkeby");
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);

// contracts
export const lotto360Contract = new ethers.Contract(
    LOTTO360_CONTRACT_ADDRESS,
    lotto360Abi,
    wallet
);

export const dice360Contract = new ethers.Contract(
    DICE360_CONTRACT_ADDRESS,
    dice360Abi,
    wallet
);

export const nnumberOfTheBeastContract = new ethers.Contract(
    NUMBEROFTHEBEAST_CONTRACT_ADDRESS,
    numberOfTheBeastAbi,
    wallet
);
