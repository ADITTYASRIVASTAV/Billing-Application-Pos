import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";          
import { store } from "./ContainApp/Store";     
import App from "./App";
import "./index.css";
import globalstate from "./ReduxToolkit/GlobalState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={globalstate}> 
      <App />
    </Provider>
  </React.StrictMode>
);