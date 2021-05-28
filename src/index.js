import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
import RestoServiceContext from "./components/resto-service-context";
import RestoService from "./services/resto-service";
import store from "./store";

import "./index.scss";

const restoService = new RestoService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <RestoServiceContext.Provider value={restoService}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RestoServiceContext.Provider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById("root")
);
