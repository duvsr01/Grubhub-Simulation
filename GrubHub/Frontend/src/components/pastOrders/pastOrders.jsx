import React, { Component } from "react";
import axios from "axios";

class PastOrders extends Component {
  state = {
    orders: []
  };

  componentDidMount() {
    const orders = this.state.orders;
    console.log("Orders" + orders);
    var buyer_id = localStorage.getItem("userID");
    axios
      .get("http://localhost:3500/api/orders/pastOrders", {
        params: { buyer_id: buyer_id }
      })
      .then(response => {
        let newState = Object.assign({}, this.state);
        let newOrders = newState.orders;

        console.log("printing initial state" + newOrders);

        let orderData = response.data;
        console.log("Order Data is " + orderData);

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
      })
      .catch(error => {
        console.log("Error Occured", error);
      });

    console.log("printing orders" + this.state.orders);
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
                    <span>{i.restaurantname}</span>
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
export default PastOrders;
