import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import Modal from "react-responsive-modal";
import SendMessage from "../sendMessage/sendMessage";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { upComingOrders } from "../_actions/orders.actions.js";
import IsEmpty from "../validation/is.empty.js";
import { rooturl } from "../utils/settings.js";

class UpComingOrders extends Component {
  state = {
    orders: [],
    msg: "",
    open: false,
    blockScroll: true,
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    controlledPosition: {
      x: -400,
      y: 200
    }
  };

  onMsgChange = value => {
    this.setState({
      msg: value
    });
  };

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  // For controlled component
  adjustXPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  };

  adjustYPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  componentDidMount() {
    const orders = this.state.orders;
    console.log("Orders" + orders);
    this.props.upComingOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.orderState !== prevProps.orderState) {
      let newState = Object.assign({}, this.state);
      let newOrders = [];

      console.log("printing initial state" + newOrders);

      if (!IsEmpty(this.props.orderState.upcoming_orders)) {
        let orderData = this.props.orderState.upcoming_orders.result;
        console.log("Order Data is " + JSON.stringify(orderData));

        var newRestaurant = "";

        orderData.map((restaurant, res_index) => {
          let res_name = restaurant.res_name;
          let res_id = restaurant.res_id;
          if (newRestaurant !== res_name) {
            console.log("Restaurant Name is" + res_name);
            var itemObj = {};
            itemObj.res_name = res_name;
            itemObj.res_id = res_id;
            itemObj.orderStatus = restaurant.order_status;
            itemObj.items = [];
            orderData.map((it, itemIndex) => {
              var item = {};
              if (it.res_name === res_name) {
                console.log("item name is" + it.item_name);
                item.name = it.item_name;
                item.quantity = it.item_qty;
                itemObj.items.push(item);
              }
            });
            newOrders.push(itemObj);
            console.log("newOrders " + JSON.stringify(newOrders));
          }
          newRestaurant = res_name;
        });

        console.log("newOrders is" + newOrders);
        var check = JSON.stringify(newOrders);
        console.log("check is" + check);

        this.setState({
          orders: newOrders
        });
      }
    }
  }

  onSendMsg = Index => {
    var itemObj = {};
    itemObj.resName = this.state.orders[Index].res_name;
    itemObj.resID = this.state.orders[Index].res_id;
    itemObj.buyer_id = localStorage.getItem("userID");
    itemObj.buyer_email = localStorage.getItem("email");
    itemObj.msg = this.state.msg;
    console.log("data is " + JSON.stringify(itemObj));

    axios
      .post("http://" + rooturl + ":3500/api/messages/sendMsg", itemObj)
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log(response);
        if (response.status === 200) {
          console.log("successful response");
          console.log("Message sent successfully");
          this.setState({
            authFlag: true
          });
        }
      })
      .catch(error => {
        console.log("Message could not be sent", error);
        this.setState({
          authFlag: false
        });
        console.log("authflag is" + this.state.authflag);
      });
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition, open } = this.state;
    const orders = this.state.orders;

    return (
      <div className="container">
        <br />
        <span className="d-flex justify-content-center align-items-center text-dark font-weight-bold">
          Up Coming Order Details
        </span>
        <br />
        {orders.map((i, orderIndex) => {
          console.log("the res id is " + i.res_id);
          console.log("the res name is " + i.res_name);
          return (
            <Draggable {...dragHandlers}>
              <div key={orderIndex}>
                <br /> <br />
                <div className="row">
                  <br />
                  <br />
                  <div className="col-auto">
                    <label className="text-primary">Restaurant Name:</label>
                    <div className="row-auto">
                      <span>{i.res_name}</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <label className="text-primary">Ordered Items:</label>
                    <div className="row">
                      <div className="col-4">Item</div>
                      <div className="col-2">Qty</div>
                    </div>
                    <span>
                      {" "}
                      {i.items.map((i, itemIndex) => {
                        return (
                          <div key={itemIndex}>
                            <div className="row">
                              <div className="col-4">
                                <p> {i.name}</p>
                              </div>
                              <div className="col-2">
                                <p> {i.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </span>
                  </div>
                  <div>
                    <div className="col-auto">
                      <label className="text-primary">Order Status</label>
                      <div className="row-auto">
                        <span> {i.orderStatus}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={{
                      pathname: "/sendMessage",
                      state: {
                        resID: i.res_id,
                        resName: i.res_name
                      },
                      target: "_blank"
                    }}
                  >
                    <div style={{ height: "150px" }}>
                      <button type="button" className="btn btn-dark btn btn-sm">
                        Send Message
                      </button>
                    </div>
                  </Link>

                  <br />
                  <br />
                </div>
              </div>
            </Draggable>
          );
        })}
      </div>
    );
  }
}

UpComingOrders.propTypes = {
  upComingOrders: PropTypes.func.isRequired,
  orderState: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.authState,
  orderState: state.orderState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { upComingOrders }
)(UpComingOrders);
