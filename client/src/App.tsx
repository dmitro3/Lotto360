/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, useEffect, useReducer, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import axios, { AxiosResponse } from "axios";
import Web3 from "web3";

import lottoReducer, { ActionModel, initialState, LottoActions } from "./reducer/reducer";
import BuyTicketModal from "./components/site/0_ticket.modal/buy.ticket.modal";
import ProtectedRoute from "./components/security/protected.route";
import { coinGeckoApi, targetNetworkId } from "./config/config";
import AdminPanel from "./components/admin/admin.panel";
import { ChainMethods } from "./provider/chain.methods";
import MainSite from "./components/site/main.site";
import Signin from "./components/admin/auth/login";
import { getWeb3 } from "./provider/web3";

function App() {
    const [state, dispatch] = useReducer(lottoReducer, initialState);
    const [intervalNum, setIntervalNum] = useState<any>();

    useEffect(() => {
        alert("website is in test phase on rinkeby network");
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
                    render={() => <AdminPanel bnbPrice={state.bnbPrice} />}
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
                position="top-right"
                transition={Slide}
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
    ChainMethods.getCurrentRoundForUser(address, web3)
        .then((res) => {
            if (!res) return;
            dispatch({
                type: LottoActions.SET_CURRENT_ROUND,
                payload: res,
            });
        })
        .catch((err) => console.error(err));

    ChainMethods.getMaxTicketsPerBuy(web3)
        .then((res) => {
            if (!res) return;
            dispatch({
                type: LottoActions.SET_MAX_TICKETS,
                payload: res,
            });
        })
        .catch((err) => console.error(err));

    ChainMethods.getUserBalance(address, web3)
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
