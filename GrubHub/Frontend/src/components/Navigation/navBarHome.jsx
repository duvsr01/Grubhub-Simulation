import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";
import { logoutUser } from "../_actions/auth.actions";

class NavBarHome extends Component {
  logout = e => {
    this.props.logoutUser();
    //localStorage.clear();
    // window.location.href = "/";
  };

  render() {
    const { user } = this.props.auth;
    let ownerAccountFlag;

    let userName = user.first_name;
    let userType = user.user_type;
    if (userType === "owner") {
      ownerAccountFlag = true;
    }

    return (
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand className="active" href="#">
            GrubHub<span className="sr-only active">(current)</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown
                title={`Hi  ${userName}`}
                id="collasible-nav-dropdown"
                alignright="true"
              >
                <div>
                  {ownerAccountFlag ? (
                    <div>
                      <NavDropdown.Item id="acctInfo" href="/sideBarHome">
                        Your Account
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/sideBarHome">
                        Address and Phone
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/sideBarHome">
                        Manage Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/sideBarHome">
                        Manage Menu
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/sideBarHome">
                        Old Orders
                      </NavDropdown.Item>{" "}
                    </div>
                  ) : (
                    <div>
                      <NavDropdown.Item id="acctInfo" href="/sideBarHome">
                        Your Account
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/sideBarHome">
                        Past Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/sideBarHome">
                        Upcoming Orders
                      </NavDropdown.Item>
                    </div>
                  )}
                </div>
                <NavDropdown.Divider />

                <NavDropdown.Item href="#" onClick={this.logout}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div>
              <div>
                {" "}
                {!ownerAccountFlag ? (
                  <Nav.Item>
                    <a href="/shoppingCart" className="btn btn-info btn-sm">
                      <span className="glyphicon glyphicon-shopping-cart"></span>{" "}
                      ShoppingCart
                    </a>
                  </Nav.Item>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBarHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBarHome);
