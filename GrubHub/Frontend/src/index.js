import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/utils/setAuthToken";
import { setCurrentUser } from "./components/_actions/auth.actions";
import { logoutUser } from "./components/_actions/auth.actions";

import { PersistGate } from "redux-persist/lib/integration/react";

import App from "./App";
//import { persistor, store } from "./store";
import store from "./store";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //TODO: clear current profile

    //Redirect to login
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
