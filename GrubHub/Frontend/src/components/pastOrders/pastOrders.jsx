import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { pastOrders } from "../_actions/orders.actions.js";
import IsEmpty from "../validation/is.empty.js";
import { connect } from "react-redux";

class PastOrders extends Component {
  state = {
    orders: []
  };

  componentDidMount() {
    const orders = this.state.orders;
    console.log("Orders" + orders);
    this.props.pastOrders();
  }

  componentDidUpdate(prevProps) {
    if (this.props.orderState !== prevProps.orderState) {
      let newState = Object.assign({}, this.state);
      let newOrders = [];

      console.log("printing initial state" + newOrders);

      if (!IsEmpty(this.props.orderState.past_orders)) {
        let orderData = this.props.orderState.past_orders.result;
        console.log("Order Data is " + JSON.stringify(orderData));

        var newRestaurant = "";

        orderData.map((restaurant, res_index) => {
          let res_name = restaurant.res_name;
          if (newRestaurant !== res_name) {
            console.log("Restaurant Name is" + res_name);
            var itemObj = {};
            itemObj.res_name = res_name;
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

      console.log("printing orders" + this.state.orders);
    }
  }

  render() {
    const orders = this.state.orders;
    return (
      <div className="container">
        <br />
        <span className="d-flex justify-content-center align-items-center text-dark font-weight-bold">
          Past Order Details
        </span>
        <br />
        {orders.map((i, Index) => {
          return (
            <div key={Index}>
              <div className="row">
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
                    {i.items.map((i, Index) => {
                      return (
                        <div key={Index}>
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
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

PastOrders.propTypes = {
  pastOrders: PropTypes.func.isRequired,
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
  { pastOrders }
)(PastOrders);
