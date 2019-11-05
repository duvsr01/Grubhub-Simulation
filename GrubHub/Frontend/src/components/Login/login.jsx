import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../_actions/auth.actions.js";
import { commonStyle } from "../commonStyle.css";

class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);

    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    //Bind the handlers to this class
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailhangeHandler = this.emailChangeHandler.bind(this);
    this.login = this.login.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      let user_details = nextProps.auth.user;
      localStorage.setItem("userID", user_details.user_id);
      localStorage.setItem("firstName", user_details.first_name);
      localStorage.setItem("lastName", user_details.last_name);
      localStorage.setItem("email", user_details.email_id);
      localStorage.setItem("userType", user_details.user_type);
      localStorage.setItem("restaurantID", user_details.res_id);
      localStorage.setItem("restaurantName", user_details.rest_name);
      localStorage.setItem("restaurantZip", user_details.rest_zipcode);
      this.props.history.push("/welcomePage");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      let error_value = this.state.errors;
      console.log("the errors in login state are" + error_value);
    }
  }

  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: ""
    });
  }
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

  // validating user details

  validate = e => {
    window.addEventListener(
      "load",
      function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener(
            "login",
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

  //Create login to send a request to the node backend
  login = e => {
    var headers = new Headers();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    //set the with credentials to true
    //axios.defaults.withCredentials = true;
    //make a post request with the user data

    this.props.loginUser(userData);
  };

  handleSubmit = e => {
    //prevent page from refresh
    e.preventDefault();
    const errors = this.validate();
    console.log("errors -" + errors);
    if (errors) return;

    this.login();
  };

  render() {
    let text;
    if (this.state.errors !== null) {
      let errors = this.state.errors.error;
      if (errors) {
        text = (
          <p className="text-danger">
            Hey Stranger! We don't recognize that login. Spell check your info
            and try again!
          </p>
        );
      }
    }

    return (
      <form
        className="needs-validation novalidate"
        onSubmit={this.handleSubmit}
      >
        <div className="outer-container">
          <div className="inner-container">
            <div className="form-group">
              <h3 className="text-danger font-weight-bold fixed-top top-left title-padding">
                GrubHub
              </h3>
            </div>
          </div>
          <div>{text}</div>
          <div className="inner-container content-form-padding">
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                onChange={this.emailChangeHandler}
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Enter email"
                required
              />
              <div className="invalid-feedback">Email is required</div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword1">Password</label>
              <input
                onChange={this.passwordChangeHandler}
                type="password"
                className="form-control"
                id="inputPassword1"
                placeholder="Password"
                required
              />
              <div className="invalid-tooltip">password is required</div>
              <div className="invalid-feedback">Password is required</div>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="Check" />
              <label
                onChange={this.emailChangeHandler}
                className="form-check-label"
                htmlFor="Check"
              >
                Keep me signed In
              </label>
            </div>
            <br />
            <div>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
              <br />
              <br />
              <div className="form-group">OR</div>
              <div className="form-group">
                <a href="/createAccount">Create Account</a>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errorState
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
