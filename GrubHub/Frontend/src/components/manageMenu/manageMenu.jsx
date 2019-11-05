import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getMenu, updateMenu } from "../_actions/menu.actions.js";
import PropTypes from "prop-types";

class ManageMenu extends Component {
  state = {
    newSectionName: "",
    addingItemIndex: null,
    addingItemName: "",
    addingItemDescription: "",
    addingItemPrice: null,
    editingItem: {
      sectionIndex: null,
      itemIndex: null
    },
    menu: [],
    response_msg: ""
  };

  componentDidMount() {
    this.props.getMenu();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.menuState.menu.menu) {
      let menuData = nextProps.menuState.menu.menu;

      let newState = Object.assign({}, this.state);
      let newMenu = newState.menu;
      console.log("Menu Response Data is " + menuData);

      this.setState({
        menu: menuData
      });
    }
    if (nextProps.menuState.result) {
      this.setState({
        response_msg: nextProps.menuState.result
      });
    }
  }

  addSection = sectionName => {
    const newState = Object.assign({}, this.state);
    const newMenu = newState.menu;
    newMenu.push({ name: sectionName, items: [] });
    this.setState({
      menu: newMenu,
      newSectionName: ""
    });
  };

  removeSection = sectionIndex => {
    const newState = Object.assign({}, this.state);
    const newMenu = newState.menu;
    newMenu.splice(sectionIndex, 1);
    this.setState({
      menu: newMenu
    });
  };

  onAddItem = index => {
    this.setState({
      addingItemIndex: index
    });
  };

  addItem = (sectionIndex, itemName, description, price) => {
    const newState = Object.assign({}, this.state);
    const newMenu = newState.menu;
    newMenu[sectionIndex].items.push({ name: itemName, description, price });
    this.setState({
      menu: newMenu,
      addingItemName: "",
      addingItemDescription: "",
      addingItemPrice: null
    });
  };

  editItem = (sectionIndex, itemIndex) => {
    const newState = Object.assign({}, this.state);
    const newMenu = newState.menu;
    newMenu[sectionIndex].items[itemIndex] = {
      name: this.state.addingItemName,
      description: this.state.addingItemDescription,
      price: this.state.addingItemPrice
    };
    this.setState({
      menu: newMenu,
      editingItem: {
        sectionIndex: null,
        itemIndex: null
      },
      addingItemName: "",
      addingItemDescription: "",
      addingItemPrice: null
    });
  };

  removeItem = (sectionIndex, itemIndex) => {
    const newState = Object.assign({}, this.state);
    const newMenu = newState.menu;
    newMenu[sectionIndex].items.splice(itemIndex, 1);
    this.setState({
      menu: newMenu
    });
  };

  onSectionNameChange = value => {
    this.setState({
      newSectionName: value
    });
  };

  onItemNameChange = value => {
    this.setState({
      addingItemName: value
    });
  };

  onDescriptionChange = value => {
    this.setState({
      addingItemDescription: value
    });
  };
  onPriceChange = value => {
    this.setState({
      addingItemPrice: value
    });
  };
  onEditItem = (sectionIndex, itemIndex) => {
    this.setState({
      editingItem: {
        sectionIndex,
        itemIndex
      },
      addingItemName: this.state.menu[sectionIndex].items[itemIndex].name,
      addingItemDescription: this.state.menu[sectionIndex].items[itemIndex]
        .description,
      addingItemPrice: this.state.menu[sectionIndex].items[itemIndex].price
    });
  };

  //Saving Menu to the backend
  saveMenu = e => {
    var headers = new Headers();

    console.log("menu is" + this.state.menu);

    //var resID = localStorage.getItem("restaurantID");
    var email = localStorage.getItem("email");
    const data = {
      email: email,
      menu: this.state.menu
    };

    console.log("sending menu details" + data);
    this.props.updateMenu(data);
  };

  handleSubmit = e => {
    //prevent page from refresh
    e.preventDefault();
    this.saveMenu();
  };

  render() {
    let response_msg = this.state.response_msg;
    console.log("responsemsg" + response_msg);
    return (
      <div>
        <div>
          <span>Section Name</span>
          <input
            type="text"
            name="sectionName"
            placeholder="Enter Section Name"
            onChange={event =>
              this.onSectionNameChange(event.target && event.target.value)
            }
          />
          <button
            onClick={() => this.addSection(this.state.newSectionName)}
            disabled={!this.state.newSectionName}
          >
            Add Section
          </button>
        </div>
        {this.state.menu &&
          this.state.menu.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex}>
                <div>
                  <div>
                    {section.name}
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "28px",
                        cursor: "pointer"
                      }}
                      onClick={() => this.onAddItem(sectionIndex)}
                    >
                      +
                    </span>
                    <span
                      style={{
                        color: "red",
                        marginLeft: "10px",
                        fontWeight: "bold",
                        fontSize: "28px",
                        cursor: "pointer"
                      }}
                      onClick={() => this.removeSection(sectionIndex)}
                    >
                      x
                    </span>
                  </div>
                </div>
                {this.state.addingItemIndex === sectionIndex ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter ItemName"
                      onChange={event =>
                        this.onItemNameChange(
                          event.target && event.target.value
                        )
                      }
                    />
                    <input
                      type="text"
                      placeholder="Enter description"
                      onChange={event =>
                        this.onDescriptionChange(
                          event.target && event.target.value
                        )
                      }
                    />
                    <input
                      type="number"
                      placeholder="Enter Price"
                      onChange={event =>
                        this.onPriceChange(event.target && event.target.value)
                      }
                    />
                    <button
                      onClick={() =>
                        this.addItem(
                          sectionIndex,
                          this.state.addingItemName,
                          this.state.addingItemDescription,
                          this.state.addingItemPrice
                        )
                      }
                      disabled={!this.state.addingItemName}
                    >
                      Add Item
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <div style={{ marginLeft: "30px" }}>
                  <div>
                    <span style={{ marginLeft: "30px" }}>Name</span>
                    <span style={{ marginLeft: "30px" }}>Description</span>
                    <span style={{ marginLeft: "30px" }}>Price</span>
                  </div>
                  {section &&
                    section.items.map((item, itemIndex) => {
                      return (
                        <div key={itemIndex}>
                          {this.state.editingItem.sectionIndex ===
                            sectionIndex &&
                          this.state.editingItem.itemIndex === itemIndex ? (
                            <span>
                              <input
                                type="text"
                                placeholder="Enter ItemName"
                                value={this.state.addingItemName}
                                onChange={event =>
                                  this.onItemNameChange(
                                    event.target && event.target.value
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder="Enter description"
                                value={this.state.addingItemDescription}
                                onChange={event =>
                                  this.onDescriptionChange(
                                    event.target && event.target.value
                                  )
                                }
                              />
                              <input
                                type="number"
                                placeholder="Enter Price"
                                value={this.state.addingItemPrice}
                                onChange={event =>
                                  this.onPriceChange(
                                    event.target && event.target.value
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  this.editItem(sectionIndex, itemIndex)
                                }
                              >
                                Save
                              </button>
                            </span>
                          ) : (
                            <span>
                              <span style={{ marginLeft: "30px" }}>
                                {item.name}
                              </span>
                              <span style={{ marginLeft: "30px" }}>
                                {item.description}
                              </span>
                              <span style={{ marginLeft: "30px" }}>
                                {item.price}
                              </span>
                            </span>
                          )}
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              this.onEditItem(sectionIndex, itemIndex)
                            }
                          >
                            Edit
                          </button>
                          <span
                            style={{
                              color: "red",
                              marginLeft: "10px",
                              fontWeight: "bold",
                              fontSize: "28px",
                              cursor: "pointer"
                            }}
                            onClick={() =>
                              this.removeItem(sectionIndex, itemIndex)
                            }
                          >
                            x
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        <div>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-primary"
          >
            Save
          </button>
          <div>
            {" "}
            <p className="text-success">{response_msg} </p>
          </div>
        </div>
      </div>
    );
  }
}

ManageMenu.propTypes = {
  getMenu: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  menuState: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  menuState: state.menuState,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getMenu, updateMenu }
)(ManageMenu);
