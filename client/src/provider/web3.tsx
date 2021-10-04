import Web3 from "web3";
import { Dispatch } from "react";
import { ActionModel, LottoActions } from "../reducer/reducer";

let web3: Web3;
const getWeb3 = async (dispatch: Dispatch<ActionModel<LottoActions>>) => {
    // @ts-ignore
    if (window.ethereum) {
        // @ts-ignore
        web3 = new Web3(window.ethereum);

        try {
            // @ts-ignore
            window.ethereum.enable().then(async () => {
                console.info("connected to metamask");
                web3.eth.net.getId((_err, id) => console.info(id));
                // @ts-ignore
                const account = window.ethereum.selectedAddress;
                dispatch({ type: LottoActions.SET_WEB3, payload: web3 });
                dispatch({ type: LottoActions.SET_ADDRESS, payload: account });
            });

            // @ts-ignore - detect Metamask account change
            window.ethereum.on("accountsChanged", function (accounts: string[]) {
                console.log("account changed:", accounts);
            });

            // @ts-ignore - detect Network account change
            window.ethereum.on("networkChanged", function (networkId) {
                console.log(`network changed: networkId ${networkId}`);
            });

            // @ts-ignore
            window.ethereum.handleDisconnect((i) => console.info(i));
        } catch (e) {
            console.error("can't connect to metamask");
        }
        return web3;
    }
    // Legacy DApp Browsers
    // @ts-ignore
    else if (window.web3) {
        // @ts-ignore
        web3 = new Web3(window.web3.currentProvider);
        return web3;
    }
    // Non-DApp Browsers
    else {
        alert("You have to install MetaMask!");
    }
};

export { getWeb3, web3 };
