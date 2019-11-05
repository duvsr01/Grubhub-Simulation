//Load  Models
const Message = require("../models/messages");

function handle_request(msg, callback) {
  console.log("Inside View Owner Message Request");

  let res_id = msg.res_id;
  console.log("Restaurant ID is" + res_id);

  Message.find({
    res_id: res_id
  })
    .then(msg => {
      if (msg) {
        console.log("Message details are" + msg);
        let data = {
          success: true,
          result: msg
        };
        callback(null, data);
        //return response.status(200).json(msg);
      }
    })
    .catch(err => callback(null, err));
}

exports.handle_request = handle_request;
