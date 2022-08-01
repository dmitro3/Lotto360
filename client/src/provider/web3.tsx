import { Dispatch } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import {
    blockExplorerUrl,
    chainName,
    chainNativeCurrency,
    currencyDecimals,
    currencySymbol,
    rpcUrl,
    targetNetworkId,
} from "../config/config";
import { ActionModel, LottoActions } from "../reducer/reducer";

let web3: Web3;
let allowShow = true;

declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}

const getWeb3 = async (dispatch: Dispatch<ActionModel<LottoActions>>) => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
                console.info("connected to metamask");
                web3.eth.net.getId(async (_err, id) => {
                    console.info("network id:", id);
                    if (id !== 0 && id !== targetNetworkId && allowShow) {
                        allowShow = false;
                        toast.info("Change your network to binance smart chain");
                        setTimeout(() => {
                            allowShow = true;
                        }, 1000);
                        try {
                            await window.ethereum.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: web3.utils.numberToHex(targetNetworkId) }],
                            });
                        } catch (err: any) {
                            // This error code indicates that the chain has not been added to MetaMask.
                            if (err && err.code === 4902) {
                                window.ethereum
                                    .request({
                                        method: "wallet_addEthereumChain",
                                        params: [
                                            {
                                                chainId: web3.utils.numberToHex(targetNetworkId),
                                                chainName: chainName,
                                                nativeCurrency: {
                                                    name: chainNativeCurrency,
                                                    symbol: currencySymbol,
                                                    decimals: currencyDecimals,
                                                },
                                                rpcUrls: [rpcUrl],
                                                blockExplorerUrls: [blockExplorerUrl],
                                            },
                                        ],
                                    })
                                    .catch((error: any) => {
                                        console.log(error);
                                    });
                            }
                        }
                    }
                    const account = window.ethereum.selectedAddress;
                    dispatch({
                        type: LottoActions.SET_PROVIDER_THINGS,
                        payload: { web3, account, networkId: id },
                    });
                });
            });

            // detect Metamask account change
            window.ethereum.on("accountsChanged", function (accounts: string[]) {
                console.log("account changed:", accounts);
                const account = window.ethereum.selectedAddress;
                dispatch({
                    type: LottoActions.SET_ADDRESS,
                    payload: account,
                });
            });

            // detect Network account change
            window.ethereum.on("chainChanged", function (networkId: number) {
                const id = web3.utils.hexToNumber(networkId);
                console.log(`network changed: networkId ${id}`);
                if (id !== 0 && id !== targetNetworkId && allowShow) {
                    allowShow = false;
                    toast.info("Change your network to binance smart chain");
                    setTimeout(() => {
                        allowShow = true;
                    }, 1000);
                }
                dispatch({
                    type: LottoActions.SET_NETWORK_ID,
                    payload: id,
                });
            });

            window.ethereum.on("disconnect", (code: any, reason: any) => {
                console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`);
            });
        } catch (e) {
            console.log("can't connect to metamask");
        }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else toast.error("You have to install MetaMask!");
};

export { getWeb3, web3 };
