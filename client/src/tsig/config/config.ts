import Web3 from "web3";
import { AbiItem } from "web3-utils";
import abi from "./signal.abi.json";

export const coinGeckoApi = "https://api.coingecko.com/api/v3/coins/binancecoin";

// chain network info
export const targetNetworkId = 56;
export const rpcUrl = "https://bsc-dataseed.binance.org/";
// export const targetNetworkId = 4;
// export const rpcUrl = "https://rinkeby.infura.io/v3/";

export const chainName = "Binance Smart Chain";
export const chainNativeCurrency = "Binance Coin";
export const currencySymbol = "BNB";
export const currencyDecimals = 18;
export const blockExplorerUrl = "https://bscscan.com/";

export const signalContractAddress = "0x901A6412a033C6c3391b6aCA6382A4510536DD07";

export const signalContract = (web3: Web3) =>
    new web3.eth.Contract(abi as AbiItem[], signalContractAddress);
