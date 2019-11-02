import React, { Component } from "react";

class RestaurantMenuCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <label>VadaPav</label>
          </div>
          <div className="col-auto">
            <label>Quantity : </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter the quantity"
            />
          </div>
          <div className="col-auto">
            <button type="button">Add to cart</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantMenuCategory;
