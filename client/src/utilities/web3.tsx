import Web3 from "web3";
import { Dispatch } from "react";
import { ActionModel, LottoActions } from "../reducer/reducer";

const getWeb3 = async (dispatch: Dispatch<ActionModel<LottoActions>>) => {
    let web3: Web3;
    // @ts-ignore
    if (window.ethereum) {
        // @ts-ignore
        web3 = new Web3(window.ethereum);

        try {
            // @ts-ignore
            window.ethereum.enable().then(async () => {
                console.info("connected to metamask");
                // @ts-ignore
                const account = window.ethereum.selectedAddress;
                dispatch({ type: LottoActions.SET_WEB3, payload: web3 });
                dispatch({ type: LottoActions.SET_ADDRESS, payload: account });
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

export { getWeb3 };
