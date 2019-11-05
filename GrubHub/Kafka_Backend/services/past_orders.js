//Load Orders  Model
const Order = require("../models/orders");

function handle_request(msg, callback) {
  console.log("Inside Past Orders Request");

  let buyer_id = msg.buyer_id;
  console.log("Buyer ID is" + buyer_id);

  Order.find({
    buyer_id: buyer_id,
    order_status: { $in: ["Delivered", "Cancelled"] }
  })
    .then(order => {
      if (order) {
        console.log("Order details are" + order);
        let data = {
          success: true,
          result: order
        };
        callback(null, data);
        // return response.status(200).json(order);
      }
    })
    .catch(err => {
      console.log("Error while getting orders" + err);
      callback(null, err);
    });
}

exports.handle_request = handle_request;
