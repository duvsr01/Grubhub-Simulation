import React, { Component } from "react";
import axios from "axios";
import { rooturl } from "../utils/settings.js";

class SendMessage extends Component {
  state = {
    resID: "",
    resName: "",
    buyer_id: "",
    buyer_email: "",
    msg: ""
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
  }

  onMsgChange = value => {
    this.setState({
      msg: value
    });
  };

  onSendMsg = e => {
    let itemObj = {};
    itemObj.resID = this.state.resID;
    itemObj.resName = this.state.resName;
    itemObj.buyer_id = this.state.buyer_id;
    itemObj.buyer_email = this.state.buyer_email;
    itemObj.msg = this.state.msg;

    console.log("Buyer ID is" + itemObj.buyer_id);
    console.log("Buyer Email is" + itemObj.buyer_email);
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
    return (
      <div>
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
              onClick={() => this.onSendMsg()}
              className="btn btn-dark btn btn-sm"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SendMessage;
