/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, useEffect, useReducer, useState } from "react";
import { Zoom, ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import axios, { AxiosResponse } from "axios";
import Web3 from "web3";

import lottoReducer, { ActionModel, initialState, LottoActions } from "./reducer/reducer";
import BuyTicketModal from "./components/lotto360/0.ticket.modal/buy.ticket.modal";
import ProtectedRoute from "./components/security/protected.route";
import { coinGeckoApi, targetNetworkId } from "./config/config";
import AdminPanel from "./components/admin/admin.panel";
import MainSite from "./components/main.site";
import Signin from "./components/admin/auth/login";
import { getWeb3 } from "./provider/web3";
import { lotto360ChainMethods } from "./provider/chain.methods/lotto360";

function App() {
    const [state, dispatch] = useReducer(lottoReducer, initialState);
    const [intervalNum, setIntervalNum] = useState<any>();

    useEffect(() => {
        getWeb3(dispatch)
            .then(() => {
                if (!state.address || !state.web3) return;
                getCurrentRoundAndBnbPrice(
                    dispatch,
                    state.networkId,
                    state.address,
                    state.web3
                );
                if (intervalNum) clearInterval(intervalNum);
                let interval = setInterval(() => {
                    getCurrentRoundAndBnbPrice(
                        dispatch,
                        state.networkId,
                        state.address!,
                        state.web3!
                    );
                }, 20000);
                setIntervalNum(interval);
            })
            .catch((err) => console.log(err));
    }, [state.address, state.networkId]);

    return (
        <>
            <Switch>
                <Route
                    path="/admin/login"
                    render={() => <Signin dispatch={dispatch} />}
                />
                <ProtectedRoute
                    path="/admin"
                    render={() =>
                        state.address &&
                        state.web3 && (
                            <AdminPanel
                                address={state.address}
                                bnbPrice={state.bnbPrice}
                                web3={state.web3}
                            />
                        )
                    }
                />
                <Route
                    path="/"
                    render={() => <MainSite dispatch={dispatch} state={state} />}
                />
            </Switch>
            <ToastContainer
                autoClose={10000}
                theme={"colored"}
                limit={10}
                position="bottom-right"
                transition={Zoom}
            />

            {state.currentRound && state.showModal && (
                <BuyTicketModal state={state} dispatch={dispatch} />
            )}
        </>
    );
}

export default App;

// ........................................................................................
const getCurrentRoundAndBnbPrice = (
    dispatch: Dispatch<ActionModel<LottoActions>>,
    networkId: number,
    address: string,
    web3: Web3
) => {
    if (networkId !== targetNetworkId || !address) return;
    lotto360ChainMethods
        .getCurrentRoundForUser(address, web3)
        .then((res) => {
            if (!res) return;
            dispatch({
                type: LottoActions.SET_CURRENT_ROUND,
                payload: res,
            });
        })
        .catch((err) => console.error(err));

    lotto360ChainMethods
        .getMaxTicketsPerBuy(web3)
        .then((res) => {
            if (!res) return;
            dispatch({
                type: LottoActions.SET_MAX_TICKETS,
                payload: res,
            });
        })
        .catch((err) => console.error(err));

    lotto360ChainMethods
        .getUserBalance(address, web3)
        .then((res) => {
            if (!res || res === "0") return;
            const balance =
                Math.round(parseFloat(web3.utils.fromWei(res, "ether")) * 1000) / 1000;
            dispatch({
                type: LottoActions.SET_USER_BALANCE,
                payload: balance,
            });
        })
        .catch((err) => console.error(err));

    axios
        .get(coinGeckoApi)
        .then((res: AxiosResponse<any>) => {
            if (
                res &&
                res.data &&
                res.data.market_data &&
                res.data.market_data.current_price.usd
            ) {
                dispatch({
                    type: LottoActions.SET_BNB_PRICE,
                    payload: res.data.market_data.current_price.usd,
                });
            }
        })
        .catch((err) => console.error(err));
};
