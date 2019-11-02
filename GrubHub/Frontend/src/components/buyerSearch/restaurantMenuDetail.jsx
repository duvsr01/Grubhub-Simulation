import React, { Component } from "react";
import RestaurantMenuCategory from "./restaurantMenuCategory";

class RestaurantMenuDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div>
          <h2 className="d-flex justify-content-center align-items-center">
            {" "}
            Restraunt Name:{" "}
          </h2>
        </div>
        <div>
          <h4 className="d-flex justify-content-center align-items-center">
            {" "}
            Menu{" "}
          </h4>
        </div>
        <br />
        <div className="row">
          <div className="col-4">
            <div className="list-group" id="list-tab" role="tablist">
              <a
                className="list-group-item list-group-item-action list-group-item-secondary active "
                id="list-breakfast-list"
                data-toggle="list"
                href="#list-breakfast"
                role="tab"
                aria-controls="breakfast"
              >
                Breakfast
              </a>
              <a
                className="list-group-item list-group-item-action list-group-item-secondary"
                id="list-lunch-list"
                data-toggle="list"
                href="#list-lunch"
                role="tab"
                aria-controls="lunch"
              >
                Lunch
              </a>
              <a
                className="list-group-item list-group-item-action list-group-item-secondary"
                id="list-appetizers-list"
                data-toggle="list"
                href="#list-appetizers"
                role="tab"
                aria-controls="appetizers"
              >
                Appetizers
              </a>
            </div>
          </div>
          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="list-breakfast"
                role="tabpanel"
                aria-labelledby="list-breakfast-list"
              >
                <RestaurantMenuCategory />
              </div>
              <div
                className="tab-pane fade"
                id="list-lunch"
                role="tabpanel"
                aria-labelledby="list-lunch-list"
              >
                <RestaurantMenuCategory />
              </div>
              <div
                className="tab-pane fade"
                id="list-appetizers"
                role="tabpanel"
                aria-labelledby="list-appetizers-list"
              >
                <RestaurantMenuCategory />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantMenuDetail;
