import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { containers } from "./modules/App";

import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <containers.AppContainer />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
