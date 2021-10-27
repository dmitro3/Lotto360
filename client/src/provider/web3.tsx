import Web3 from "web3";
import { Dispatch } from "react";
import { ActionModel, LottoActions } from "../reducer/reducer";
import { targetNetworkId } from "../config/config";
import { toast } from "react-toastify";

let web3: Web3;

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
            window.ethereum.request({ method: "eth_requestAccounts" }).then(async () => {
                console.info("connected to metamask");
                web3.eth.net.getId((_err, id) => {
                    console.info("network id:", id);
                    if (id !== targetNetworkId)
                        toast.info("Change your network to binance smart chain");
                });
                const account = window.ethereum.selectedAddress;
                dispatch({ type: LottoActions.SET_WEB3, payload: web3 });
                dispatch({ type: LottoActions.SET_ADDRESS, payload: account });
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
                console.log(`network changed: networkId ${networkId}`);
                if (networkId !== targetNetworkId)
                    toast.info("Change your network to binance smart chain");
                dispatch({
                    type: LottoActions.SET_NETWORK_ID,
                    payload: networkId,
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
        return web3;
    }
    // Legacy DApp Browsers
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        return web3;
    }
    // Non-DApp Browsers
    else alert("You have to install MetaMask!");
};

export { getWeb3, web3 };
