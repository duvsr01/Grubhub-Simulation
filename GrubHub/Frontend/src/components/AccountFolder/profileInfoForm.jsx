import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUserProfile } from "../_actions/profile.actions.js";

class ProfileInfoForm extends Component {
  componentWillMount() {
    this.setState({
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      phone: this.props.phone,
      ownerAccountFlag: this.props.ownerAccountFlag,
      restaurantname: this.props.restaurantname,
      restaurant_cuisine: this.props.restaurant_cuisine,
      restaurantzip: this.props.restaurantzip,
      password: " ",
      authFlag: " "
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let data = nextProps.profile.user;
    if (data.success === true) {
      this.setState({
        authFlag: true
      });
    } else if (data.success !== true) {
      this.setState({
        authFlag: false
      });
    }
  }

  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  phoneChangeHandler = e => {
    this.setState({
      phone: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  restaurantNameChangeHandler = e => {
    this.setState({
      restaurantname: e.target.value
    });
  };

  restaurantCuisineChangeHandler = e => {
    this.setState({
      restaurant_cuisine: e.target.value
    });
  };

  restaurantZipChangeHandler = e => {
    this.setState({
      restaurantzip: e.target.value
    });
  };

  updateProfile = e => {
    var headers = new Headers();

    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      restaurantname: this.state.restaurantname,
      restaurant_cuisine: this.state.restaurant_cuisine,
      restaurantzip: this.state.restaurantzip
    };

    console.log("Data send is" + data);

    this.props.updateUserProfile(data);
  };

  handleSubmit = e => {
    //prevent page from refresh
    e.preventDefault();
    //const errors = this.validate();
    //console.log("errors -" + errors);
    //if (errors) return;

    this.updateProfile();
  };

  state = { ownerAccountFlag: false };
  render() {
    let msg;
    const { authFlag, ownerAccountFlag } = this.state;
    if (authFlag === true) {
      msg = <p className="text-success">Updated Profile successfully</p>;
    } else if (authFlag === false) {
      msg = (
        <p className="text-danger">
          Profile update failed. Make sure the password entered is valid
        </p>
      );
    }
    //const ownerAccountFlag = false;
    const {
      firstname,
      lastname,
      email,
      phone,
      restaurantname,
      restaurant_cuisine,
      restaurantzip
    } = this.state;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-4 mb-3">
              <label htmlFor="inputFirstname">First name</label>
              <input
                onChange={this.firstnameChangeHandler}
                type="text"
                className="form-control"
                id="inputFirstname"
                placeholder="First name"
                defaultValue={firstname}
                required
              />
              <div className="invalid-feedback">First Name is Required.</div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="inputLastname">Last name</label>
              <input
                onChange={this.lastnameChangeHandler}
                type="text"
                className="form-control"
                id="inputLastname"
                placeholder="Last name"
                defaultValue={lastname}
                required
              />
              <div className="invalid-feedback">Last Name is Required.</div>
            </div>
          </div>
          <div className="form-row form-group">
            <label htmlFor="customerEmail">Email</label>
            <input
              onChange={this.emailChangeHandler}
              type="email"
              className="form-control"
              id="customerEmail"
              defaultValue={email}
              required
            />
            <div className="invalid-feedback">Email is required.</div>
          </div>

          <div className="form-row form-group">
            <label htmlFor="phone">Phone</label>
            <input
              onChange={this.phoneChangeHandler}
              type="phone"
              className="form-control"
              id="phone"
              defaultValue={phone}
            />
          </div>

          <div className="form-row form-group">
            <label htmlFor="customerPassword">Password</label>
            <input
              onChange={this.passwordChangeHandler}
              type="password"
              className="form-control"
              id="customerPassword"
              placeholder="Password"
              required
            />
            <div className="invalid-feedback">Password is Required.</div>
          </div>
          <div>
            {ownerAccountFlag ? (
              <div className="form-group">
                <div>
                  <h5 className="modal-title text-danger font-weight-bold fixed-top top-left title-padding">
                    Profile Information
                  </h5>
                </div>
                <div className="form-row form-group">
                  <label htmlFor="restrauntName">Restaurant Name</label>
                  <input
                    onChange={this.restaurantNameChangeHandler}
                    type="text"
                    className="form"
                    id="restrauntName"
                    placeholder="Restraunt Name"
                    defaultValue={restaurantname}
                    required
                  />
                  <div className="invalid-feedback">
                    Restaurant Name is Required for Owner Account.
                  </div>
                </div>
                <div className="form-row form-group">
                  <label htmlFor="restrauntCuisine">Restaurant Cuisine</label>
                  <input
                    onChange={this.restaurantCuisineChangeHandler}
                    type="text"
                    className="form"
                    id="restrauntCuisine"
                    placeholder="Restraunt Cuisine"
                    defaultValue={restaurant_cuisine}
                  />
                </div>
                <div className="form-row form-group">
                  <label htmlFor="restrauntZipCode">Restaurant Zip Code</label>
                  <input
                    onChange={this.restaurantZipChangeHandler}
                    type="text"
                    className="form"
                    id="restrauntZip"
                    placeholder="Restaurant Zip Code"
                    defaultValue={restaurantzip}
                    required
                  />
                  <div className="invalid-feedback">
                    Restraunt Zip Code is Required for Owner Account.
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <div> {msg} </div>
          </div>
        </div>
      </form>
    );
  }
}

ProfileInfoForm.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  profileState: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profileState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateUserProfile }
)(ProfileInfoForm);
