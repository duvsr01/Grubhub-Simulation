import React, { Component } from "react";
import UserInfo from "./userInfo";

import { connect } from "react-redux";
import ProfileInfo from "./profileInfo";

class YourAccount extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {};
  }

  render() {
    return (
      <div>
        <ProfileInfo />
      </div>
    );
  }
}

const mapState = state => {
  return {
    isUserLoggedIn: state.authState.isLoggedIn,
    userName: state.authState.userName,
    firstName: state.authState.firstName,
    lastName: state.authState.lastName,
    email: state.authState.email,
    userType: state.authState.userType,
    phone: state.authState.phone
  };
};

export default connect(mapState)(YourAccount);
