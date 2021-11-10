import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { tokenAddress, contractAddress } from "../config/config";
import erc20TokenAbi from "./abi/erc20.token.abi.json";
import lotto360Abi from "./abi/lotto.360.contract.abi.json";

const contract = (web3: Web3) =>
    new web3.eth.Contract(lotto360Abi as AbiItem[], contractAddress);

const token = (web3: Web3) =>
    new web3.eth.Contract(erc20TokenAbi as AbiItem[], tokenAddress);

export { token, contract };
