import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router";
import { commonStyle } from "../commonStyle.css";
import { connect } from "react-redux";
import { registerUser } from "../_actions/register.actions";
import { withRouter } from "react-router-dom";
class CreateAccount extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      selectedOption: "",
      restaurant_name: "",
      restaurant_zipcode: "",
      ownerAccountFlag: false,
      errors: {}
    };
    //Bind the handlers to this class
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailhangeHandler = this.emailChangeHandler.bind(this);
    this.restaurantNameChangeHandler = this.restaurantNameChangeHandler.bind(
      this
    );
    this.restaurantZipChangeHandler = this.restaurantZipChangeHandler.bind(
      this
    );
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillReceivprops(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: ""
    });
  }
  //email change handler to update state variable with the text entered by the user
  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  //email change handler to update state variable with the text entered by the user
  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };
  //email change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  //option change handler to switch between buyer and owner account
  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  restaurantNameChangeHandler = e => {
    this.setState({
      restaurant_name: e.target.value
    });
  };

  restaurantZipChangeHandler = e => {
    this.setState({
      restaurant_zipcode: e.target.value
    });
  };

  //Create login to send a request to the node backend
  login = e => {
    var headers = new Headers();
    //prevent page from refresh
    // e.preventDefault();

    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.selectedOption,
      restaurant_name: this.state.restaurant_name,
      restaurant_zipcode: this.state.restaurant_zipcode
    };
    //set the with credentials to true
    //axios.defaults.withCredentials = true;
    //make a post request with the user data

    this.props.registerUser(data, this.props.history);
  };

  validate = e => {
    window.addEventListener(
      "load",
      function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "submit",
            function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log("errors -" + errors);
    if (errors) return;

    this.login();
  };

  render() {
    const ownerAccountFlag =
      this.state.selectedOption === "owner" ? true : false;
    let text;
    if (this.props.errors !== null) {
      let errors = this.props.errors;
      if (errors) {
        if (errors.email === "User already exists") {
          text = <p className="text-danger">Account already exists</p>;
        }
      }
    }
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div className="form-row container">
          <h3 className="text-danger font-weight-bold fixed-top top-left title-padding">
            GrubHub
          </h3>
        </div>
        <div className="form-row">
          <h5>
            <span>Create Your Account</span>
          </h5>
        </div>
        <br />

        <div className="form-row">
          <div className="form-col">
            <div className="form-check">
              <input
                onChange={this.handleOptionChange}
                className="form-check-input"
                type="radio"
                name="createBuyerAccount"
                id="createBuyerAccount"
                value="buyer"
                checked={this.state.selectedOption === "buyer"}
              />
              <label className="form-check-label" htmlFor="createBuyerAccount">
                Buyer Account
              </label>
            </div>
          </div>

          <div className="form-col">
            <div className="form-check">
              <input
                onChange={this.handleOptionChange}
                className="form-check-input"
                type="radio"
                name="createOwnerAccount"
                id="createOwnerAccount"
                value="owner"
                checked={this.state.selectedOption === "owner"}
              />
              <label className="form-check-label" htmlFor="createOwnerAccount">
                Owner Account
              </label>
            </div>
          </div>
        </div>
        <br />

        <div>
          {this.state.selectedOption === "owner" ||
          this.state.selectedOption === "buyer" ? (
            <div>
              <div> {text} </div>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="inputFirstname">First name</label>
                  <input
                    onChange={this.firstnameChangeHandler}
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="First name"
                    required
                  />
                  <div className="invalid-feedback">
                    First Name is Required.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="inputLastname">Last name</label>
                  <input
                    onChange={this.lastnameChangeHandler}
                    type="text"
                    className="form-control"
                    id="inputLastname"
                    placeholder="Last name"
                    required
                  />
                  <div className="invalid-feedback">Last Name is Required.</div>
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="customerEmail">Email</label>
                <div className="input-group">
                  <input
                    onChange={this.emailChangeHandler}
                    type="email"
                    className="form-control"
                    id="customerEmail"
                    placeholder="Email"
                    required
                  />
                  <div className="invalid-feedback">Email is required.</div>
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="customerPassword">Password</label>
                <div className="input-group">
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
              </div>

              <div>
                {ownerAccountFlag ? (
                  <div>
                    <div className="form-row">
                      <label htmlFor="restrauntName">Restaurant Name</label>
                      <div className="input-group">
                        <input
                          onChange={this.restaurantNameChangeHandler}
                          type="text"
                          className="form-control"
                          id="restrauntName"
                          placeholder="Restaurant Name"
                          required
                        />
                        <div className="invalid-feedback">
                          Restaurant Name is Required for Owner Account.
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <label htmlFor="restrauntZipCode">
                        Restaurant Zip Code
                      </label>

                      <div className="input-group">
                        <input
                          onChange={this.restaurantZipChangeHandler}
                          type="text"
                          className="form-control"
                          id="restrauntZip"
                          placeholder="Restaurant Zip Code"
                          required
                        />
                        <div className="invalid-feedback">
                          Restaurant Zip Code is Required for Owner Account.
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <br />

              <div className="form-row">
                <button className="btn btn-primary btn-sm" type="submit">
                  Create Your Account
                </button>
              </div>
              <div className="form-row form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Check"
                />
                <label
                  onChange={this.keepMeSignIn}
                  className="form-check-label"
                  htmlFor="Check"
                >
                  Keep me signed In
                </label>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <br />

        <div className="form-row">
          Have An Account Already? <a href="/login">SignIn</a>
        </div>
      </form>
    );
  }
}

CreateAccount.propTypes = {
  registerUser: PropTypes.func.isRequired,
  registerState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  registerState: state.registerState,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(CreateAccount));
