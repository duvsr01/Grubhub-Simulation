import React, { Component } from "react";

class AddressInfoForm extends Component {
  state = { ownerAccountFlag: false };
  render() {
    const ownerAccountFlag = true;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row">
            <h3 className="text-danger font-weight-bold fixed-top top-left title-padding">
              GrubHub
            </h3>
          </div>
          <div className="form-row form-group">
            <div className="col-md-4 mb-3">
              <label htmlFor="inputStreet">Street</label>
              <input
                onChange={this.handleStreetChange}
                type="text"
                className="form-control"
                id="inputStreet"
                placeholder="Enter Street"
                required
              />
              <div className="invalid-feedback">Street is Required.</div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="inputApt">Apt,Suite,floor</label>
              <input
                onChange={this.handleAptChange}
                type="text"
                className="form-control"
                id="inputApt"
                placeholder="Enter Apt,Suite,floor"
                required
              />
              <div className="invalid-feedback">
                Apt,Suite,floor is Required.
              </div>
            </div>
          </div>
          <div className="form-row form-group">
            <label for="inputCity">City</label>
            <input
              onChange={this.handleCityChange}
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="Enter City"
              required
            />
            <div className="invalid-feedback">City is required.</div>
          </div>
          <div className="form-row form-group">
            <label for="inputState">State</label>
            <input
              onChange={this.handleStateChange}
              type="text"
              className="form-control"
              id="inputState"
              placeholder="Enter State"
              required
            />
            <div className="invalid-feedback">State is Required.</div>
          </div>
          <div className="form-row form-group">
            <label for="inputZip">Zip Code</label>
            <input
              onChange={this.handleZipCodeChange}
              type="text"
              className="form-control"
              id="inputZip"
              placeholder="Enter Zip Code"
              required
            />
            <div className="invalid-feedback">Zip Code is Required.</div>
          </div>
          <div className="form-row form-group">
            <label for="inputPhone">Phone Number</label>
            <input
              onChange={this.handlePhoneChange}
              type="password"
              className="form-control"
              id="inputPhone"
              placeholder="Phone...."
              required
            />
            <div className="invalid-feedback">phone Number is Required.</div>
          </div>
          <div>
            {ownerAccountFlag ? (
              <div className="form-group">
                <div>
                  <h5 className="modal-title text-danger font-weight-bold fixed-top top-left title-padding">
                    Restraunt Information
                  </h5>
                </div>
                <div className="form-row form-group">
                  <label for="restrauntName">Restraunt Name</label>
                  <input
                    onChange={this.restrauntNameChangeHandler}
                    type="text"
                    className="form-control"
                    id="restrauntName"
                    placeholder="Restraunt Name"
                    required
                  />
                  <div className="invalid-feedback">
                    Restraunt Name is Required for Owner Account.
                  </div>
                </div>
                <div className="form-row form-group">
                  <label for="restrauntZipCode">Restraunt Zip Code</label>
                  <input
                    onChange={this.restrauntZipChangeHandler}
                    type="text"
                    className="form-control"
                    id="restrauntZip"
                    placeholder="Restraunt Zip Code"
                    required
                  />
                  <div className="invalid-feedback">
                    Restraunt Zip Code is Required for Owner Account.
                  </div>
                </div>
                <div className="form-row form-group">
                  <label for="restrauntZipCode">Restraunt Zip Code1</label>
                  <input
                    onChange={this.restrauntZipChangeHandler}
                    type="text"
                    className="form-control"
                    id="restrauntZip"
                    placeholder="Restraunt Zip Code"
                    required
                  />
                  <div className="invalid-feedback">
                    Restraunt Zip Code is Required for Owner Account.
                  </div>
                </div>
                <div className="form-row form-group">
                  <label for="restrauntZipCode">Restraunt Zip Code</label>
                  <input
                    onChange={this.restrauntZipChangeHandler}
                    type="text"
                    className="form-control"
                    id="restrauntZip"
                    placeholder="Restraunt Zip Code"
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
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddressInfoForm;
