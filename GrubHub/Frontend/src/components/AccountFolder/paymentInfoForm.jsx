import React, { Component } from "react";

class PaymentInfoForm extends Component {
  state = {};
  render() {
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
          <div class="form-row form-group">
            <label for="inputCard">Card Number</label>
            <input
              onChange={this.handleCardChange}
              type="tel"
              class="form-control fa fa-cc-visa"
              id="inputCard"
              placeholder="Enter Card details"
              required
            />
            <div class="invalid-feedback">Card Number is required.</div>
          </div>
          <div class="form-row form-group">
            <label for="inputExpires">Expires On</label>
            <input
              onChange={this.handleExipresChange}
              type="tel"
              class="form-control"
              id="inputExpires"
              placeholder="MM/YY"
              required
            />
            <div class="invalid-feedback">Expires On is Required.</div>
          </div>
          <div class="form-row form-group">
            <label for="inputSecurity">Security Code</label>
            <input
              onChange={this.handleSecurityCodeChange}
              type="tel"
              class="form-control cc-cvv-input body"
              id="inputSecurity"
              placeholder="Cvv"
              required
            />
            <div class="invalid-feedback">Secuirty Code is Required.</div>
          </div>
          <div class="form-row form-group">
            <label for="inputZip">Zip Code</label>
            <input
              onChange={this.handleZipCodeChange}
              type="tex"
              class="form-control"
              id="inputZip"
              placeholder="1001"
              required
            />
            <div class="invalid-feedback">Zip Code is Required.</div>
          </div>
          <div class="form-row form-group">
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default PaymentInfoForm;
