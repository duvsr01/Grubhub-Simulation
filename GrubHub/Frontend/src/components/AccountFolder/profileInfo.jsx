import React, { Component } from "react";
import Modal from "react-responsive-modal";
import ProfileInfoForm from "./profileInfoForm";
import { connect } from "react-redux";
import { getUserProfile } from "../_actions/profile.actions.js";
import PropTypes from "prop-types";

class ProfileInfo extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      restaurantname: "",
      restaurantzip: "",
      restaurant_cuisine: "",
      open: false,
      blockScroll: true,
      ownerAccountFlag: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getUserProfile();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.profile.user.user) {
      let profileDetails = nextProps.profile.user.user;
      let userType = profileDetails.user_type;
      // console.log(
      //   "printing the profile details" +
      //     JSON.stringify(nextProps.profile.user.user)
      // );
      this.setState({
        firstname: profileDetails.first_name,
        lastname: profileDetails.last_name,
        username: profileDetails.first_name + " " + profileDetails.last_name,
        email: profileDetails.email_id,
        phone: profileDetails.phone_number
      });
      if (userType === "owner") {
        this.setState({
          ownerAccountFlag: true,
          restaurantname: profileDetails.rest_name,
          restaurantzip: profileDetails.rest_zipcode,
          restaurant_cuisine: profileDetails.rest_cuisine
        });
      }
    }
  }

  render() {
    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      open,
      ownerAccountFlag,
      restaurantname,
      restaurantzip,
      restaurant_cuisine
    } = this.state;

    return (
      <div>
        <form>
          <div className="form-group">
            <ul className="list-group border">
              <li className="list-group-item border border-white">
                <h5 className="text-center">Your Account</h5>
              </li>
              <li className="list-group-item border border-white">
                <label className="text-primary"> Name : </label>
                <span className="text-secondary">{username}</span>
              </li>
              <li className="list-group-item border border-white">
                <label className="text-primary">Email : </label>
                <span className="text-secondary">{email}</span>
              </li>
              <li className="list-group-item border border-white">
                <label className="text-primary"> Phone Number :</label>
                <span className="text-secondary">{phone}</span>
              </li>

              <div>
                {ownerAccountFlag ? (
                  <div>
                    <li className="list-group-item border border-white">
                      <label className="text-primary"> Restaurant Name :</label>
                      <span className="text-secondary">{restaurantname}</span>
                    </li>

                    <li className="list-group-item border border-white">
                      <label className="text-primary">
                        {" "}
                        Restaurant Cuisine :
                      </label>
                      <span className="text-secondary">
                        {restaurant_cuisine}
                      </span>
                    </li>

                    <li className="list-group-item border border-white">
                      <label className="text-primary">
                        Restaurant ZipCode :
                      </label>
                      <span className="text-secondary">{restaurantzip}</span>
                    </li>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <li className="list-group-item border border-white">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onOpenModal}
                >
                  Update
                </button>
                <div className="overflow-auto">
                  <Modal open={open} onClose={this.onCloseModal} center>
                    <h4 className="text-center tex-secondary">
                      Update Your Profile Details
                    </h4>
                    <ProfileInfoForm
                      email={email}
                      firstname={firstname}
                      lastname={lastname}
                      phone={phone}
                      restaurantname={restaurantname}
                      restaurant_cuisine={restaurant_cuisine}
                      restaurantzip={restaurantzip}
                      ownerAccountFlag={ownerAccountFlag}
                    />
                  </Modal>
                </div>
              </li>
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profileState: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profileState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getUserProfile }
)(ProfileInfo);
