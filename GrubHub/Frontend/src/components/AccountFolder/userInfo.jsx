import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { getUserProfile } from "../_actions/profile.action.js";

class UserInfo extends React.Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    this.state = {
      name: "",
      open: false,
      blockScroll: true
    };
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    //     axios.get('/quora/profilepic?userid=' + userid)
    //     .then((response) => {
    //         if (response !== undefined)
    //         if (response.status === 200) {
    //           if(response.data.base64.length > 0) {
    //             this.setState({
    //                 userImg: response.data.base64[0].b64 ,
    //                 user_tagline: response.data.base64[0].user_tagline
    //             });
    //         }
    //       }
    // })
  }

  // getUserInfo = e => {};
  //this.getUserInfo(); use this for getter method for profile info

  render() {
    //const userName = userName;
    const isOwner = true;
    const userName = this.state.name;
    const { open } = this.state;
    return (
      <div>
        <form>
          <div className="form-group">
            <ul className="list-group border">
              <br />
              <h5>Profile</h5>
              <li className="list-group-item border border-white">
                Name :<span className="text-secondary"></span>
              </li>
              <li className="list-group-item border border-white">
                Email :
                <span className="text-secondary">{`${this.props.email}`}</span>
              </li>
              <li className="list-group-item border border-white">
                Phone :
                <span className="text-secondary">{`${this.props.phone}`}</span>
              </li>
              <br />
              {isOwner ? (
                <ul className="list-group border border-white">
                  <li className="list-group border border-white">
                    <h5>Restraunt Details : </h5>
                  </li>
                  <li className="list-group-item border border-white">
                    Restraunt Image :<span className="text-secondary"></span>
                  </li>
                  <li className="list-group-item border border-white">
                    Restraunt Name :<span className="text-secondary"></span>
                  </li>
                  <li className="list-group-item border border-white">
                    Cuisine :<span className="text-secondary"></span>
                  </li>
                </ul>
              ) : (
                <li></li>
              )}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchProps = {
  setUserProfile: getUserProfile
};

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
export default connect(
  mapState,
  mapDispatchProps
)(UserInfo);
