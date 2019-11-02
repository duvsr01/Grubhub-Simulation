import React, { Component } from "react";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import WelcomePage from "./components/welcomePage";
import CreateAccount from "./components/createAccount/createAccount";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <div className="content">
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/createAccount" component={CreateAccount} />
                <Route component={WelcomePage} />
              </Switch>
            </BrowserRouter>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
