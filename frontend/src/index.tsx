import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/js/bootstrap.min";
import "./contents/styles/bootstrap.min.css";
import "./contents/plugins/fontawesome6/css/all.min.css";
import "./contents/styles/main.css";
import "./contents/styles/svg.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
