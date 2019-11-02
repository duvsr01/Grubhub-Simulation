import React, { Component } from "react";
import ProfileInfo from "../AccountFolder/profileInfo";
import AddressInfo from "../AccountFolder/addressInfo";
import PaymentInfo from "../AccountFolder/paymentInfo";
import ManageMenu from "../manageMenu/manageMenu";
import ManageOrders from "../manageOrders/manageOrders";
import PastOrders from "../pastOrders/pastOrders";
import UpComingOrders from "../upComingOrders/upComingOrders";
import OldOrders from "../manageOrders/oldOrders";
import ViewMessages from "../viewMessages/viewMessages";
import SendMessage from "../sendMessage/sendMessage";
import OwnerMessages from "../viewMessages/ownerMessages";

class SideBarHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: "list-profile"
    };
  }

  onSectionClick = sectionName => {
    if (this.state.activeSection !== sectionName) {
      this.setState({
        activeSection: sectionName
      });
    }
  };
  render() {
    let ownerAccountFlag;
    let userType = localStorage.getItem("userType");
    if (userType === "owner") {
      ownerAccountFlag = true;
    }
    return (
      <div>
        {ownerAccountFlag ? (
          <div>
            {" "}
            <br />
            <div className="row container">
              <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-profile"
                        ? "active"
                        : ""
                    }`}
                    id="list-profile-list"
                    data-toggle="list"
                    href="#list-profile"
                    role="tab"
                    aria-controls="profile"
                    onClick={() => this.onSectionClick("list-profile")}
                  >
                    Profile and Restaurant Info
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-address"
                        ? "active"
                        : ""
                    }`}
                    id="list-address-list"
                    data-toggle="list"
                    href="#list-address"
                    role="tab"
                    aria-controls="address"
                    onClick={() => this.onSectionClick("list-address")}
                  >
                    Address and Phone
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-manageOrders"
                        ? "active"
                        : ""
                    }`}
                    id="list-manageOrders-list"
                    data-toggle="list"
                    href="#list-manageOrders"
                    role="tab"
                    aria-controls="manageOrders"
                    onClick={() => this.onSectionClick("list-manageOrders")}
                  >
                    Manage Orders
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-manageMenu"
                        ? "active"
                        : ""
                    }`}
                    id="list-manageMenu-list"
                    data-toggle="list"
                    href="#list-manageMenu"
                    role="tab"
                    aria-controls="manageMenu"
                    onClick={() => this.onSectionClick("list-manageMenu")}
                  >
                    Manage Menu
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-oldOrders"
                        ? "active"
                        : ""
                    }`}
                    id="list-oldOrders-list"
                    data-toggle="list"
                    href="#list-oldOrders"
                    role="tab"
                    aria-controls="oldOrders"
                    onClick={() => this.onSectionClick("list-oldOrders")}
                  >
                    Old Orders
                  </div>

                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-ownerMsgs"
                        ? "active"
                        : ""
                    }`}
                    id="list-ownerMsgs-list"
                    data-toggle="list"
                    href="#list-ownerMsgs"
                    role="tab"
                    aria-controls="ownerMsgs"
                    onClick={() => this.onSectionClick("list-ownerMsgs")}
                  >
                    View Messages
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-profile"
                        ? "show active"
                        : ""
                    }`}
                    id="list-profile"
                    role="tabpanel"
                    aria-labelledby="list-profile-list"
                  >
                    <ProfileInfo />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-address"
                        ? "show active"
                        : ""
                    }`}
                    id="list-address"
                    role="tabpanel"
                    aria-labelledby="list-address-list"
                  >
                    <AddressInfo />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-manageOrders"
                        ? "show active"
                        : ""
                    }`}
                    id="list-manageOrders"
                    role="tabpanel"
                    aria-labelledby="list-manageOrders-list"
                  >
                    <ManageOrders />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-manageMenu"
                        ? "show active"
                        : ""
                    }`}
                    id="list-manageMenu"
                    role="tabpanel"
                    aria-labelledby="list-manageMenu-list"
                  >
                    <ManageMenu />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-oldOrders"
                        ? "show active"
                        : ""
                    }`}
                    id="list-oldOrders"
                    role="tabpanel"
                    aria-labelledby="list-oldOrders-list"
                  >
                    <OldOrders />
                  </div>

                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-ownerMsgs"
                        ? "show active"
                        : ""
                    }`}
                    id="list-ownerMsgs"
                    role="tabpanel"
                    aria-labelledby="list-ownerMsgs-list"
                  >
                    <OwnerMessages />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <div className="row">
              <div className="col-4">
                <div className="list-group" id="list-tab" role="tablist">
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-profile"
                        ? "active"
                        : ""
                    }`}
                    id="list-profile-list"
                    data-toggle="list"
                    href="#list-profile"
                    role="tab"
                    aria-controls="profile"
                    onClick={() => this.onSectionClick("list-profile")}
                  >
                    Profile Info
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                    ${
                      this.state.activeSection === "list-address"
                        ? "active"
                        : ""
                    }`}
                    id="list-address-list"
                    data-toggle="list"
                    href="#list-address"
                    role="tab"
                    aria-controls="address"
                    onClick={() => this.onSectionClick("list-address")}
                  >
                    Address and Phone
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                     ${
                       this.state.activeSection === "list-payment"
                         ? "active"
                         : ""
                     }`}
                    id="list-payment-list"
                    data-toggle="list"
                    href="#list-payment"
                    role="tab"
                    aria-controls="paymnet"
                    onClick={() => this.onSectionClick("list-payment")}
                  >
                    Payment Information
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                     ${
                       this.state.activeSection === "list-pastOrders"
                         ? "active"
                         : ""
                     }`}
                    id="list-pastOrders-list"
                    data-toggle="list"
                    href="#list-pastOrders"
                    role="tab"
                    aria-controls="pastOrders"
                    onClick={() => this.onSectionClick("list-pastOrders")}
                  >
                    Past Orders
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                     ${
                       this.state.activeSection === "list-upComingOrders"
                         ? "active"
                         : ""
                     }`}
                    id="list-upComingOrders-list"
                    data-toggle="list"
                    href="#list-upComingOrders"
                    role="tab"
                    aria-controls="upComingOrders"
                    onClick={() => this.onSectionClick("list-upComingOrders")}
                  >
                    Up Coming Orders
                  </div>
                  <div
                    className={`list-group-item list-group-item-action list-group-item-secondary
                     ${
                       this.state.activeSection === "list-viewMessages"
                         ? "active"
                         : ""
                     }`}
                    id="list-viewMessages-list"
                    data-toggle="list"
                    href="#list-viewMessages"
                    role="tab"
                    aria-controls="viewMessages"
                    onClick={() => this.onSectionClick("list-viewMessages")}
                  >
                    View Messages
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-profile"
                        ? "show active"
                        : ""
                    }`}
                    id="list-profile"
                    role="tabpanel"
                    aria-labelledby="list-profile-list"
                  >
                    <ProfileInfo />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-address"
                        ? "show active"
                        : ""
                    }`}
                    id="list-address"
                    role="tabpanel"
                    aria-labelledby="list-address-list"
                  >
                    <AddressInfo />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-payment"
                        ? "show active"
                        : ""
                    }`}
                    id="list-payment"
                    role="tabpanel"
                    aria-labelledby="list-payment-list"
                  >
                    <PaymentInfo />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-pastOrders"
                        ? "show active"
                        : ""
                    }`}
                    id="list-pastOrders"
                    role="tabpanel"
                    aria-labelledby="list-pastOrders-list"
                  >
                    <PastOrders />
                  </div>
                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-upComingOrders"
                        ? "show active"
                        : ""
                    }`}
                    id="list-upComingOrders"
                    role="tabpanel"
                    aria-labelledby="list-upComingOrders-list"
                  >
                    <UpComingOrders />
                  </div>

                  <div
                    className={`tab-pane fade ${
                      this.state.activeSection === "list-viewMessages"
                        ? "show active"
                        : ""
                    }`}
                    id="list-viewMessages"
                    role="tabpanel"
                    aria-labelledby="list-viewMessages-list"
                  >
                    <ViewMessages />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SideBarHome;
