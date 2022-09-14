import "bootstrap/dist/js/bootstrap.min";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import App from "./App";
import "./contents/plugins/fontawesome6/css/all.min.css";
import "./contents/styles/bootstrap.min.css";
import "./contents/styles/custom.css";
import "./contents/styles/main.css";
import "./contents/styles/svg.css";
import reportWebVitals from "./reportWebVitals";
import AppTs from "./tsig/App";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/index" render={() => <AppTs />} />
                <Route path="/" render={() => <App />} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
