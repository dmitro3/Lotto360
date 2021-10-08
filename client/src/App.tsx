import { Dispatch, useEffect, useReducer } from "react";
import lottoReducer, { ActionModel, initialState, LottoActions } from "./reducer/reducer";
import { getWeb3 } from "./provider/web3";
import { Route, Switch } from "react-router";
import MainSite from "./components/site/main.site";
import AdminPanel from "./components/admin/admin.panel";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoundApiService } from "./api/round.api.service";
import axios, { AxiosResponse } from "axios";
import { coinGeckoBnbPriceApi } from "./config/config";

function App() {
    const [state, dispatch] = useReducer(lottoReducer, initialState);

    useEffect(() => {
        getWeb3(dispatch);
        getCurrentRoundAndBnbPrice(dispatch);
        setInterval(() => {
            getCurrentRoundAndBnbPrice(dispatch);
        }, 20000);
    }, []);

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
            <ToastContainer autoClose={false} position="top-right" transition={Slide} />
        </>
    );
}

export default App;

function getCurrentRoundAndBnbPrice(dispatch: Dispatch<ActionModel<LottoActions>>) {
    RoundApiService.getCurrentRoundForUser().then((res) => {
        if (res && res.data && res.data.result) {
            dispatch({
                type: LottoActions.SET_CURRENT_ROUND,
                payload: res.data.result,
            });
        }
    });
    axios.get(coinGeckoBnbPriceApi).then((res: AxiosResponse<any>) => {
        if (res.data.market_data && res.data.market_data.current_price.usd) {
            dispatch({
                type: LottoActions.SET_BNB_PRICE,
                payload: res.data.market_data.current_price.usd,
            });
        }
    });
}
