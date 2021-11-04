import Web3 from "web3";
import { Dispatch } from "react";
import { ActionModel, LottoActions } from "../reducer/reducer";
import { targetNetworkId } from "../config/config";
import { toast } from "react-toastify";

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
                web3.eth.net.getId((_err, id) => {
                    console.info("network id:", id);
                    if (id !== 0 && id !== targetNetworkId && allowShow) {
                        allowShow = false;
                        toast.info("Change your network to binance smart chain");
                        setTimeout(() => {
                            allowShow = true;
                        }, 1000);
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
                console.log(
                    `Ethereum Provider connection closed: ${reason}. Code: ${code}`
                );
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
    else alert("You have to install MetaMask!");
};

export { getWeb3, web3 };
