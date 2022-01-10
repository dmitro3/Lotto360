import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { contractAddress } from "../config/config";
import lotto360Abi from "./abi/Lotto360.abi.json";

const contract = (web3: Web3) =>
    new web3.eth.Contract(lotto360Abi as AbiItem[], contractAddress);

export { contract };
