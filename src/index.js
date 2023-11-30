import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TelaLogin from "./TelaLogin";
import App from "./App";
import secureLocalStorage from "react-secure-storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
if (secureLocalStorage.getItem("ativo") === true) {
  root.render(<App />);
} else {
  root.render(<TelaLogin />);
}
