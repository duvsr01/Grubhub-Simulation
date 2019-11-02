import React, { Component } from "react";
import Modal from "react-responsive-modal";
import PaymentInfoForm from "./paymentInfoForm";

class PaymentInfo extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
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
  render() {
    const { open } = this.state;

    const hasPaymentInfo = false;
    return (
      <div>
        <form>
          {hasPaymentInfo ? (
            <div className="form-group">
              <ul className="list-group border">
                <li className="list-group-item border border-white">
                  <label className="text-primary">Card number</label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Expires On</label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Security Code</label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Zip Code</label>
                  <span className="text-secondary"></span>
                </li>
              </ul>
            </div>
          ) : (
            <ul>
              <li className="list-group-item border border-white">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onOpenModal}
                >
                  Add Payment
                </button>
                <div className="overflow-auto">
                  <Modal open={open} onClose={this.onCloseModal} center>
                    <h4 className="text-center tex-secondary">
                      Enter Payment Info
                    </h4>
                    <PaymentInfoForm />
                  </Modal>
                </div>
              </li>
            </ul>
          )}
        </form>
      </div>
    );
  }
}

export default PaymentInfo;
