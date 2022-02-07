import { ethers } from "ethers";
import {
    ACCOUNT_PRIVATE_KEY,
    DICE360_CONTRACT_ADDRESS,
    FRUITLAND_CONTRACT_ADDRESS,
    LOTTO360_CONTRACT_ADDRESS,
    NUMBEROFTHEBEAST_CONTRACT_ADDRESS,
} from "../config/blockchain.configs";
import dice360Abi from "./abi/Dice360.abi.json";
import fruitlandAbi from "./abi/Fruitland.abi.json";
import lotto360Abi from "./abi/Lotto360.abi.json";
import numberOfTheBeastAbi from "./abi/NumberOfTheBeast.abi.json";

export const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
);
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

export const numberOfTheBeastContract = new ethers.Contract(
    NUMBEROFTHEBEAST_CONTRACT_ADDRESS,
    numberOfTheBeastAbi,
    wallet
);

export const fruitlandContract = new ethers.Contract(
    FRUITLAND_CONTRACT_ADDRESS,
    fruitlandAbi,
    wallet
);
