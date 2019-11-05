//Load Orders  Model
const Order = require("../models/orders");

function handle_request(msg, callback) {
  console.log("Inside Manage Orders Request");

  let resID = msg.resID;
  console.log("Restaurant ID is" + resID);

  Order.find({
    res_id: resID
  })
    .then(order => {
      if (order) {
        console.log("Order details are" + order);
        let data = {
          success: true,
          result: order
        };
        callback(null, data);
        //return response.status(200).json(order);
      }
    })
    .catch(err => {
      callback(null, err);
    });
}

exports.handle_request = handle_request;
