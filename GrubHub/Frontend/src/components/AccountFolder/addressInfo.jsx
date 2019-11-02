import React, { Component } from "react";
import Modal from "react-responsive-modal";
import AddressInfoForm from "./addressInfoForm";

class AddressInfo extends Component {
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

  componentDidMount() {
    this.setState({
      name: "swathisharma"
    });
  }

  render() {
    const userName = this.state.name;
    const { open } = this.state;
    const hasAddressInfo = true;

    return (
      <div>
        <form>
          {hasAddressInfo ? (
            <div className="form-group">
              <ul className="list-group border">
                <li className="list-group-item border border-white">
                  <h5 className="text-center">Your Contact Details</h5>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary"> Street Address : </label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Apt,Suite,floor : </label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">City</label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Zip Code</label>
                  <span className="text-secondary"></span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Phone</label>
                  <span className="text-secondary"></span>
                </li>
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
                      <AddressInfoForm />
                    </Modal>
                  </div>
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
                  Add Address
                </button>
                <div className="overflow-auto">
                  <Modal open={open} onClose={this.onCloseModal} center>
                    <h4 className="text-center tex-secondary">
                      Enter Address Info
                    </h4>
                    <AddressInfoForm />
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

export default AddressInfo;
