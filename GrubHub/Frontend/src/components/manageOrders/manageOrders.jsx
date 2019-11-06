import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { manageOrders, updateOrder } from "../_actions/orders.actions.js";
import IsEmpty from "../validation/is.empty.js";
import { rooturl } from "../utils/settings.js";

class ManageOrders extends Component {
  state = {
    orderstatus: "",
    orders: [],
    authFlag: "",
    msg: "",
    updateFlag: ""
  };

  componentDidMount() {
    const orders = this.state.orders;
    console.log("Orders" + orders);
    this.props.manageOrders();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!IsEmpty(nextProps.orderState.orders)) {
      console.log(
        "the props in the manage orders are" + JSON.stringify(nextProps)
      );

      let orderData = nextProps.orderState.orders.result;

      let newState = Object.assign({}, this.state);
      //let newOrders = newState.orders;
      let newOrders = [];
      console.log("Order Response Data is " + orderData);

      var newBuyer = "";

      orderData.map((buyer, buyer_index) => {
        let buyer_id = buyer.buyer_id;
        if (newBuyer !== buyer_id) {
          console.log("Buyer email is" + buyer.buyer_email);
          var itemObj = {};
          itemObj.buyer_id = buyer.buyer_id;
          itemObj.buyername = buyer.buyer_email;
          itemObj.buyeraddress = "";
          itemObj.orderStatus = buyer.order_status;
          itemObj.items = [];
          orderData.map((it, itemIndex) => {
            var item = {};
            if (it.buyer_id === buyer_id) {
              console.log("item name is" + it.item_name);
              item.name = it.item_name;
              item.quantity = it.item_qty;
              item.price = it.item_price;
              item.orderid = it._id;
              itemObj.items.push(item);
            }
          });
          newOrders.push(itemObj);
          console.log("newOrders " + JSON.stringify(newOrders));
        }
        newBuyer = buyer_id;
      });

      console.log("newOrders is" + newOrders);
      var check = JSON.stringify(newOrders);
      console.log("check is" + check);

      this.setState({
        orders: newOrders
      });
    }
    console.log("printing orders" + this.state.orders);

    if (!IsEmpty(nextProps.orderState.update_order)) {
      console.log("Order status updated successfully");
      this.setState({
        updateFlag: nextProps.orderState.update_order.success
      });
    }
  }

  onStatusChange = value => {
    this.setState({
      orderstatus: value
    });
  };

  onMsgChange = value => {
    this.setState({
      msg: value
    });
  };

  onupdateOrder = buyerIndex => {
    console.log("Inside update order request");
    var itemObj = {};
    var resID = localStorage.getItem("restaurantID");
    itemObj.buyer_id = this.state.orders[buyerIndex].buyer_id;
    console.log("Buyer ID is" + itemObj.buyer_id);

    itemObj.resID = resID;
    itemObj.orderstatus = this.state.orderstatus;
    console.log("data is " + JSON.stringify(itemObj));

    this.props.updateOrder(itemObj);
  };

  onSendMsg = buyerIndex => {
    var itemObj = {};
    var resID = localStorage.getItem("restaurantID");
    var resName = localStorage.getItem("restaurantName");
    itemObj.buyer_id = this.state.orders[buyerIndex].buyer_id;
    itemObj.buyer_email = this.state.orders[buyerIndex].buyername;
    itemObj.order_id = this.state.orders[buyerIndex].items[0].orderid;
    console.log("Buyer ID is" + itemObj.buyer_id);
    console.log("Buyer Email is" + itemObj.buyername);
    console.log("order id is " + itemObj.order_id);

    itemObj.resID = resID;
    itemObj.resName = resName;
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
    const orders = this.state.orders;
    console.log("the orders in manage_orders are" + orders.length);
    const updateFlag = this.state.updateFlag;
    var status_arr = ["Delivered", "Cancelled"];
    var text;
    if (updateFlag === true) {
      text = <p className="text-success">Updated</p>;
    } else if (updateFlag === false) {
      text = <p className="text-danger">Order status could not be updated</p>;
    }
    return (
      <div className="container">
        <br />
        <span className="d-flex justify-content-center align-items-center text-dark font-weight-bold">
          Order Details
        </span>
        <br />
        {orders.map((i, buyerIndex) => {
          console.log("enter inside the render in order");
          return (
            <div key={buyerIndex}>
              <br /> <br />
              {!status_arr.includes(i.orderStatus) ? (
                <div className="row">
                  <div className="col-auto">
                    <label className="text-primary">Buyer Name:</label>
                    <div className="row-auto">
                      <span>{i.buyername}</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <label className="text-primary">Ordered Items:</label>
                    <div className="row">
                      <div className="col-4">Item</div>
                      <div className="col-2">Qty</div>
                      <div className="col-2">Price</div>
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
                              <div className="col-2">
                                <p> {i.price}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </span>
                  </div>
                  <div className="col-auto">
                    <label className="text-primary">Order Status</label>
                    <div className="row-auto">
                      <select
                        id="orderstatus"
                        onChange={event =>
                          this.onStatusChange(
                            event.target && event.target.value
                          )
                        }
                      >
                        <option value="New">New</option>
                        <option value="Ready">Ready</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-auto">
                    <label className="text-primary"></label>
                    <div className="row-auto">
                      <button
                        type="button"
                        onClick={() => this.onupdateOrder(buyerIndex)}
                        className="btn btn-dark btn btn-sm"
                      >
                        Update
                      </button>
                    </div>
                    <div>{text}</div>
                  </div>

                  <div className="col-auto">
                    <label className="text-primary">Enter Message</label>
                    <div className="row-auto">
                      <textarea
                        rows="4"
                        cols="50"
                        type="textarea"
                        placeholder="Enter Message"
                        value={this.state.msg}
                        onChange={event =>
                          this.onMsgChange(event.target && event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-auto">
                    <label className="text-primary"> </label>
                    <div className="row-auto">
                      <button
                        type="button"
                        onClick={() => this.onSendMsg(buyerIndex)}
                        className="btn btn-dark btn btn-sm"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

ManageOrders.propTypes = {
  manageOrders: PropTypes.func.isRequired,
  orderState: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  orderState: state.orderState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { manageOrders, updateOrder }
)(ManageOrders);
