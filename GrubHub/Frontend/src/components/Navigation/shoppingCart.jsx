import React, { Component } from "react";
import axios from "axios";

class ShoppingCart extends Component {
  state = {
    cartprice: null,
    authFlag: ""
  };

  componentDidMount() {
    localStorage.getItem("shoppingCart");
    console.log(
      "values from local storage" + localStorage.getItem("shoppingCart")
    );
    var obj = localStorage.getItem("shoppingCart");
    let obj1 = JSON.parse(obj);

    console.log("printing object1" + obj1);

    if (obj1) {
      var price = 0;
      var totalprice = () => {
        var check = obj1.map((it, i) => {
          price = eval("price + it.price * it.qty");
        });
        console.log("number " + Number(price));
        return Number(price);
      };
      this.setState({
        cartprice: totalprice()
      });
    }
  }

  //place order
  placeOrder = e => {
    var headers = new Headers();

    var obj = localStorage.getItem("shoppingCart");
    const data = JSON.parse(obj);
    console.log("printing object1" + data);

    console.log("sending order details" + data);
    axios
      .post("http://localhost:3500/api/orders/placeOrder", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log(response);
        if (response.status === 200) {
          console.log("successful response");
          console.log("Order placed successfully");
          this.setState({
            authFlag: true
          });
          //localStorage.setItem("shoppingCart", " ");
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

  handleSubmit = e => {
    //prevent page from refresh
    e.preventDefault();

    this.placeOrder();
  };

  render() {
    let text;
    var obj = localStorage.getItem("shoppingCart");
    let obj1 = JSON.parse(obj);
    let cartprice = this.state.cartprice;
    console.log("printing object1" + obj1);
    const total = true;
    let ownerAccountFlag;
    const authFlag = this.state.authFlag;
    let userType = localStorage.getItem("userType");
    if (authFlag === true) {
      text = <p className="text-success">Order Placed successfully</p>;
    } else if (authFlag === false) {
      text = <p className="text-danger">Order could not be placed</p>;
    }
    if (userType === "buyer") {
      ownerAccountFlag = true;
    }
    return (
      <div>
        {ownerAccountFlag ? (
          <div className="container d-flex justify-content-center align-items-center form-group">
            <ul className="list-group">
              <h4 className="justify-content-center">Review Order</h4>
              {obj1 &&
                obj1.map((it, i) => {
                  return (
                    <div key={i}>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span style={{ marginLeft: "50px" }}>
                          ItemName:: {it.item}
                        </span>
                        <span
                          style={{ marginLeft: "50px" }}
                          className="badge badge-primary badge-pill"
                        >
                          Qty::{it.qty}
                        </span>
                        <span style={{ marginLeft: "50px" }}>
                          Price:: {eval(new String(it.price * it.qty))}
                        </span>
                      </li>
                    </div>
                  );
                })}
              {total ? (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Total Price
                  <span className="badge badge-primary badge-pill">
                    {cartprice}
                  </span>
                </li>
              ) : (
                <br />
              )}
            </ul>
            <br />

            <div className="btn btn-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Place order
              </button>
            </div>

            <div>{text} </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
