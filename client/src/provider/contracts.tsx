import Web3 from "web3";
import { AbiItem } from "web3-utils";
import {
    beastContractAddress,
    dice360ContractAddress,
    lotto360ContractAddress,
} from "../config/config";
import lotto360Abi from "./abi/Lotto360.abi.json";
import dice360Abi from "./abi/Dice360.abi.json";
import beastAbi from "./abi/NumberOfTheBeast.abi.json";

export const lotto360Contract = (web3: Web3) =>
    new web3.eth.Contract(lotto360Abi as AbiItem[], lotto360ContractAddress);

export const dice360Contract = (web3: Web3) =>
    new web3.eth.Contract(dice360Abi as AbiItem[], dice360ContractAddress);

export const beastContract = (web3: Web3) =>
    new web3.eth.Contract(beastAbi as AbiItem[], beastContractAddress);
