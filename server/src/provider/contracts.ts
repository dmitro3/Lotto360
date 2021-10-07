import { ethers } from "ethers";
import {
    ACCOUNT_PRIVATE_KEY,
    bnbContractAddress,
    lotto360Address,
} from "../settings/blockchain.settings";
import { ERC20Abi } from "./abi/Erc20";
import { Lotto360Abi } from "./abi/Lotto360";

const rinkebyProvider = new ethers.providers.InfuraProvider("rinkeby");
const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, rinkebyProvider);

// contracts
const lotto360Contract = new ethers.Contract(lotto360Address, Lotto360Abi, wallet);
const bnbTokenContract = new ethers.Contract(bnbContractAddress, ERC20Abi, wallet);

export { bnbTokenContract, lotto360Contract, rinkebyProvider };
