//Load  Models
const Message = require("../models/messages");

function handle_request(msg, callback) {
  console.log("Inside View Buyer Message Request");

  console.log("Req Body : ", msg);

  let buyer_id = msg.buyer_id;
  console.log("Buyer ID is" + buyer_id);

  Message.find({
    buyer_id: buyer_id
  })
    .then(msg => {
      if (msg) {
        console.log("Message details are" + msg);
        let data = {
          success: true,
          result: msg
        };
        callback(null, data);
        // return response.status(200).json(msg);
      }
    })
    .catch(err => callback(null, err));
}

exports.handle_request = handle_request;
