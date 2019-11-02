import React, { Component } from "react";
import NavBarHome from "./Navigation/navBarHome";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import LandingPage from "./Navigation/landingPage";
import SideBarHome from "./Navigation/sideBarHome";
import ProfileInfo from "./AccountFolder/profileInfo";
import AddressInfo from "./AccountFolder/addressInfo";
import PaymentInfo from "./AccountFolder/paymentInfo";
import SearchBar from "./searchBar/searchBar";
import ShoppingCart from "./Navigation/shoppingCart";
import SearchDetails from "./buyerSearch/searchDetails";
import ManageOrders from "./manageOrders/manageOrders";
import PastOrders from "./pastOrders/pastOrders";
import UpComingOrders from "./upComingOrders/upComingOrders";
import SendMessage from "./sendMessage/sendMessage";

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <NavBarHome />
        <div className="container">
          <Route path="/welcomePage" component={LandingPage} />
          <Route path="/sideBarHome" component={SideBarHome} />
          <Route path="/searchBar" component={SearchBar} />
          <Route path="/profileInfo" component={ProfileInfo} />
          <Route path="/addressInfo" component={AddressInfo} />
          <Route path="/paymentInfo" component={PaymentInfo} />
          <Route path="/shoppingCart" component={ShoppingCart} />
          <Route path="/searchDetails" component={SearchDetails} />
          <Route path="/manageOrders" component={ManageOrders} />
          <Route path="/pastOrders" component={PastOrders} />
          <Route path="/upComingOrders" component={UpComingOrders} />
          <Route path="/sendMessage" component={SendMessage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors
});
export default connect(mapStateToProps)(WelcomePage);
