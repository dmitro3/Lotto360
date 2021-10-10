import { Dispatch, useEffect, useReducer } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import axios, { AxiosResponse } from "axios";
import Web3 from "web3";

import lottoReducer, { ActionModel, initialState, LottoActions } from "./reducer/reducer";
import { coinGeckoBnbPriceApi, targetNetworkId } from "./config/config";
import { ChainMethods } from "./provider/chain.methods";
import BuyTicketModal from "./components/site/ticket.modal/buy.ticket.modal";
import AdminPanel from "./components/admin/admin.panel";
import MainSite from "./components/site/main.site";
import { getWeb3 } from "./provider/web3";

function App() {
    const [state, dispatch] = useReducer(lottoReducer, initialState);

    useEffect(() => {
        getWeb3(dispatch)
            .then((web3) => {
                if (!web3) return;
                web3.eth.net.getId((err, networkId) => {
                    if (!err) {
                        dispatch({
                            type: LottoActions.SET_NETWORK_ID,
                            payload: networkId,
                        });
                    }
                });
                getCurrentRoundAndBnbPrice(dispatch, state.networkId, web3);
                setInterval(() => {
                    getCurrentRoundAndBnbPrice(dispatch, state.networkId, web3);
                }, 20000);
            })
            .catch((err) => console.log(err));
    }, [state.networkId, state.address]);

    return (
        <>
            <Switch>
                <Route
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
                limit={1}
                position="top-right"
                transition={Slide}
            />

            {state.currentRound && state.showModal && (
                <BuyTicketModal ticketPrice={state.ticketPrice} />
            )}
        </>
    );
}

export default App;

// ........................................................................................
const getCurrentRoundAndBnbPrice = (
    dispatch: Dispatch<ActionModel<LottoActions>>,
    networkId: number,
    web3: Web3
) => {
    if (networkId !== targetNetworkId) return;
    ChainMethods.getCurrentRoundForUser(web3).then((res) => {
        if (!res) return;
        dispatch({
            type: LottoActions.SET_CURRENT_ROUND,
            payload: res,
        });
    });

    axios.get(coinGeckoBnbPriceApi).then((res: AxiosResponse<any>) => {
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
    });
};
