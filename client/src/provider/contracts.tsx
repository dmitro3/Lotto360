import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { bnbTokenAddress } from "../config/config";
import erc20TokenAbi from "./abi/erc20.token.abi.json";

const lotto360Contract = (web3: Web3) =>
    new web3.eth.Contract(
        {
            inputs: [],
            name: "increment",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        ""
    );

const bnbTokenContract = (web3: Web3) =>
    // @ts-ignore
    new web3.eth.Contract(erc20TokenAbi as AbiItem[], bnbTokenAddress);

export { bnbTokenContract, lotto360Contract };
