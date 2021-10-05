import { useEffect, useReducer } from "react";
import lottoReducer, { initialState } from "./reducer/reducer";
import { getWeb3 } from "./provider/web3";
import { Route, Switch } from "react-router";
import MainSite from "./components/site/main.site";
import AdminPanel from "./components/admin/admin.panel";

function App() {
    const [state, dispatch] = useReducer(lottoReducer, initialState);

    useEffect(() => {
        getWeb3(dispatch);
    }, []);

    return (
        <Switch>
            <Route path="/admin" render={() => <AdminPanel />} />
            <Route
                path="/"
                render={() => <MainSite dispatch={dispatch} state={state} />}
            />
        </Switch>
    );
}

export default App;
