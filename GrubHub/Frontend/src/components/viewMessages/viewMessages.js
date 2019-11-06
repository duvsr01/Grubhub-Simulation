import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { rooturl } from "../utils/settings.js";

class ViewMessages extends Component {
  state = {
    messages: [],
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
    const messages = this.state.messages;
    console.log("Messages" + messages);
    const { user } = this.props.auth;

    console.log("printing user_id" + user.user_id);
    axios
      .get("http://" + rooturl + ":3500/api/messages/viewBuyerMsg", {
        params: { buyer_id: user.user_id }
      })
      .then(response => {
        let newState = Object.assign({}, this.state);
        let newMessages = newState.messages;
        console.log("printing initial state" + newMessages);
        let msgData = response.data.result;
        console.log("Message Data is " + msgData);

        var newRestaurant = "";

        msgData.map((restaurant, res_index) => {
          let res_name = restaurant.resName;
          if (newRestaurant !== res_name) {
            console.log("Restaurant Name is" + res_name);
            var itemObj = {};
            itemObj.res_name = res_name;
            itemObj.msgs = [];
            msgData.map((it, itemIndex) => {
              var item = {};
              if (it.resName === res_name) {
                console.log("message is" + it.msg);
                item.msg = it.msg;
                itemObj.msgs.push(item);
              }
            });
            newMessages.push(itemObj);
            console.log("Messages " + JSON.stringify(newMessages));
          }
          newRestaurant = res_name;
        });

        console.log("newMessages is" + newMessages);

        this.setState({
          messages: newMessages
        });
      })
      .catch(error => {
        console.log("Error Occured", error);
      });

    console.log("printing messages" + this.state.messages);
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
    const messages = this.state.messages;
    return (
      <div className="container">
        <br />
        <span className="d-flex justify-content-center align-items-center text-dark font-weight-bold">
          View Messages
        </span>
        <br />
        {messages.map((i, Index) => {
          return (
            <Draggable {...dragHandlers}>
              <div key={Index}>
                <div className="row">
                  <div className="col-auto">
                    <label className="text-primary">Restaurant Name:</label>
                    <div className="row-auto">
                      <span>{i.res_name}</span>
                    </div>
                  </div>

                  <div className="col-auto">
                    <label className="text-primary">Messages:</label>
                    <div className="row"></div>
                    <span>
                      {" "}
                      {i.msgs.map((i, Index) => {
                        return (
                          <div key={Index}>
                            <div className="row">
                              <div className="col-auto">
                                <p> {i.msg}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Draggable>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors
});
export default connect(mapStateToProps)(ViewMessages);
