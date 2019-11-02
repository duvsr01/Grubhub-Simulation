import React, { Component } from "react";
import SearchBar from "../searchBar/searchBar";
import { connect } from "react-redux";

class LandingPage extends Component {
  render() {
    const { user } = this.props.auth;
    let ownerAccountFlag;
    let userName = user.first_name;
    let userType = user.user_type;
    if (userType === "owner") {
      ownerAccountFlag = true;
    }
    return (
      <div>
        <div>
          <h5 className="text-center">{`Welcome  ${userName}`}</h5>
        </div>
        <div>
          <li className="list-group-item border border-white">
            <img
              src="https://res.cloudinary.com/grubhub-marketing/image/upload/f_auto,fl_lossy,q_80/v1538431627/Homepage_Desktop_0018_Pizza_2x_qshvvo.jpg"
              className="img-fluid"
              alt="Responsive image"
            />
          </li>
        </div>
        {!ownerAccountFlag ? (
          <div>
            <SearchBar />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors
});

export default connect(mapStateToProps)(LandingPage);
