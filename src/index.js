import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./sass/styles.scss";

ReactDOM.hydrate(
    <App />,
    document.getElementById("mountNode")
);