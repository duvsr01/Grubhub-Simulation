import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMenu, updateMenu, getBuyerMenu } from "../_actions/menu.actions.js";

class SearchDetails extends Component {
  state = {
    newSectionName: "",
    addingItemName: "",
    addingQty: "",
    addingItemDescription: "",
    addingItemPrice: null,
    resID: "",
    resName: "",
    buyer_id: "",
    menu: [],
    cart: []
  };

  componentDidMount() {
    const { resID, resName } = this.props.location.state;
    console.log("resID" + resID);
    console.log("resName" + resName);

    const buyer_id = localStorage.getItem("userID");
    const buyer_email = localStorage.getItem("email");

    this.setState({
      resID: resID,
      resName: resName,
      buyer_id: buyer_id,
      buyer_email: buyer_email
    });

    const data = {
      resID: resID
    };

    this.props.getBuyerMenu(data);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.menuState.data.menu) {
      let menuData = nextProps.menuState.data.menu;

      let newState = Object.assign({}, this.state);
      let newMenu = newState.menu;
      console.log("Menu Response Data is " + menuData);

      this.setState({
        menu: menuData
      });
    }
  }

  onQtyChange = value => {
    this.setState({
      addingQty: value
    });
  };

  onAddToCart = (sectionIndex, itemIndex) => {
    let newCart = this.state.cart;
    var itemObj = {};
    itemObj.buyer_id = this.state.buyer_id;
    itemObj.buyer_email = this.state.buyer_email;
    itemObj.resID = this.state.resID;
    itemObj.resName = this.state.resName;
    itemObj.item_id = this.state.menu[sectionIndex].items[itemIndex].item_id;
    itemObj.item = this.state.menu[sectionIndex].items[itemIndex].name;
    itemObj.price = this.state.menu[sectionIndex].items[itemIndex].price;
    itemObj.qty = this.state.addingQty;
    newCart.push(itemObj);
    this.setState({
      cart: newCart
    });
    var cartItems = this.state.cart;
    let shoppingCart = JSON.stringify(cartItems);

    localStorage.setItem("shoppingCart", shoppingCart);

    console.log(
      "values from local storage" + localStorage.getItem("shoppingCart")
    );
  };

  render() {
    var resName = this.state.resName;
    return (
      <div className="container">
        <div className="justify-content-center align-items-center">
          <h4 className="text-center"> {resName} </h4>
          <h5 className="text-center">
            Welcome to {resName}, Please choose the items from the menu{" "}
          </h5>
        </div>
        {this.state.menu &&
          this.state.menu.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex}>
                <div>
                  <div>{section.name}</div>
                </div>
                <div style={{ marginLeft: "30px" }}>
                  <div>
                    <span style={{ marginLeft: "30px" }}>Item ID</span>
                    <span style={{ marginLeft: "30px" }}>Name</span>
                    <span style={{ marginLeft: "30px" }}>Description</span>
                    <span style={{ marginLeft: "30px" }}>Price</span>
                    <span style={{ marginLeft: "30px" }}>Quantity</span>
                  </div>
                  {section &&
                    section.items.map((item, itemIndex) => {
                      return (
                        <div key={itemIndex}>
                          <span>
                            <span style={{ marginLeft: "30px" }}>
                              {item.item_id}
                            </span>
                            <span style={{ marginLeft: "30px" }}>
                              {item.name}
                            </span>
                            <span style={{ marginLeft: "30px" }}>
                              {item.description}
                            </span>
                            <span style={{ marginLeft: "30px" }}>
                              {item.price}
                            </span>
                            <span style={{ marginLeft: "30px" }}>
                              Qty
                              <input
                                type="text"
                                size="3"
                                onChange={event =>
                                  this.onQtyChange(
                                    event.target && event.target.value
                                  )
                                }
                              />
                            </span>
                            <span style={{ marginLeft: "30px" }}>
                              <button
                                onClick={() =>
                                  this.onAddToCart(sectionIndex, itemIndex)
                                }
                                type="button"
                                className="btn btn-dark btn-sm"
                              >
                                AddToCart
                              </button>
                            </span>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

SearchDetails.propTypes = {
  getBuyerMenu: PropTypes.func.isRequired,
  menuState: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  menuState: state.menuState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getMenu, updateMenu, getBuyerMenu }
)(SearchDetails);
