/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useReducer, useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer, Zoom } from "react-toastify";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import PreLoader from "./components/main/shared/preloader";
import Main from "./components/main/signal/main";
import "./content/css/bootstrap.min.css";
import "./content/css/custom.css";
import "./content/css/home.css";
import "./content/css/particles.css";
import "./content/css/particles_2.css";
import "./content/css/style.css";
import { getWeb3 } from "./provider/web3";
import mainReducer, { initialState } from "./reducer/reducer";
import SecureRoute from "./security/secure.route";
import { getInitialInfo } from "./start/initialMain";

interface AppProps {}

const AppTs: FunctionComponent<AppProps> = () => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const [intervalNum, setIntervalNum] = useState<any>();
    const { address, isAdmin, networkId, web3 } = state;

    useEffect(() => {
        getWeb3(dispatch)
            .then(() => {
                if (!address || !web3) return;
                getInitialInfo(dispatch, address, web3, networkId);
                if (intervalNum) clearInterval(intervalNum);
                let interval = setInterval(() => {
                    getInitialInfo(dispatch, address, web3, networkId);
                }, 20000);
                setIntervalNum(interval);
            })
            .catch((err: any) => console.log(err));
    }, [address, networkId]);

    const updateInfo = () => getInitialInfo(dispatch, address!, web3!, networkId);

    return (
        <div className="App">
            <PreLoader />
            <Header address={address} dispatch={dispatch} isAdmin={isAdmin} />

            <Switch>
                <Route path="/index/admin" render={() => <SecureRoute state={state} />} />
                <Route path="/index" render={() => <Main state={state} updateInfo={updateInfo} />} />
            </Switch>

            <Footer length={state.userSubscription.length} />
            <div id="toTop"></div>

            <ToastContainer autoClose={5000} theme={"colored"} limit={3} position="bottom-right" transition={Zoom} />
        </div>
    );
};

export default AppTs;
