import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/js/bootstrap.min";
import "./contents/styles/bootstrap.min.css";
import "./contents/plugins/fontawesome6/css/all.min.css";
import "./contents/styles/main.css";
import "./contents/styles/svg.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
