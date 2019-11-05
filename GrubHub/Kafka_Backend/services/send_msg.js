//Load  Models
const Message = require("../models/messages");

function handle_request(msg, callback) {
  console.log("Inside Send Message Post Request");

  console.log("Req Body : ", msg);
  let data = msg;
  var resID = msg.resID;
  let buyer_id = msg.buyer_id;
  let buyer_email = msg.buyer_email;
  let message = msg.msg;
  let resName = msg.resName;
  let order_id = msg.order_id;
  console.log("data is" + data);
  console.log("resID is" + resID);

  const newMessage = new Message({
    buyer_id: buyer_id,
    buyer_email: buyer_email,
    res_id: resID,
    msg: message,
    resName: resName,
    order_id: order_id
  });

  newMessage
    .save()
    .then(msg => {
      console.log(
        " The Messages collection is updated with msg id " + msg._id,
        "The message is mapped to buyer " + msg.buyer_email
      );
      let data = {
        success: true,
        result: msg
      };
      callback(null, data);
    })
    .catch(err => callback(null, err));
}

exports.handle_request = handle_request;
