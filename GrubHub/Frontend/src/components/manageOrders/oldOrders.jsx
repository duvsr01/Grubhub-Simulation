import React, { Component } from "react";
import axios from "axios";

class OldOrders extends Component {
  state = {
    orderstatus: "",
    orders: [],
    authFlag: ""
  };

  componentDidMount() {
    const orders = this.state.orders;
    console.log("Old Orders" + orders);

    var resID = localStorage.getItem("restaurantID");

    axios
      .get("http://localhost:3500/api/orders/manageOrders", {
        params: { resID: resID }
      })
      .then(response => {
        let newState = Object.assign({}, this.state);
        let newOrders = newState.orders;
        console.log("printing initial state" + newOrders);
        let orderData = response.data.result;
        console.log("Order Data is " + orderData);

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
      })
      .catch(error => {
        console.log("Error Occured", error);
      });

    console.log("printing orders" + this.state.orders);
  }

  onStatusChange = value => {
    this.setState({
      orderstatus: value
    });
  };

  onupdateOrder = buyerIndex => {
    var itemObj = {};
    var resID = localStorage.getItem("restaurantID");
    itemObj.buyer_id = this.state.orders[buyerIndex].buyer_id;
    itemObj.resID = resID;
    itemObj.orderstatus = this.state.orderstatus;
    console.log("data is " + JSON.stringify(itemObj));

    axios
      .post("http://localhost:3500/api/orders/updateOrder", itemObj)
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log(response);
        if (response.status === 200) {
          console.log("successful response");
          if (response.data === "Updated successfully") {
            console.log("Order status updated successfully");
            this.setState({
              authFlag: true
            });
          }
        }
      })
      .catch(error => {
        console.log("Update failed", error);
        this.setState({
          authFlag: false
        });
        console.log("authflag is" + this.state.authflag);
      });
  };

  render() {
    const orders = this.state.orders;
    const authFlag = this.state.authFlag;
    let text;
    if (authFlag === true) {
      text = <p className="text-success">Updated successfully</p>;
    } else if (authFlag === false) {
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
          return (
            <div key={buyerIndex}>
              {i.orderStatus === "Delivered" ||
              i.orderStatus === "Cancelled" ? (
                <div key={buyerIndex}>
                  <div className="d-flex justify-content-center align-items-center font-weight-bold">
                    Old Orders
                  </div>
                  <div className="row">
                    <div className="col-auto">
                      <label className="text-primary">Buyer Name:</label>
                      <div className="row-auto">
                        <span>{i.buyername}</span>
                      </div>
                    </div>
                    <div className="col-auto">
                      <label className="text-primary">Buyer Address:</label>
                      <div className="row-auto">
                        <span> {i.buyeraddress}</span>
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
                        <span> {i.orderStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
export default OldOrders;
