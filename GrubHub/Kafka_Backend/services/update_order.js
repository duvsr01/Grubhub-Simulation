//Load Orders  Model
const Order = require("../models/orders");

function handle_request(msg, callback) {
  console.log("Inside Update Order Post Request");

  console.log("Req Body : ", msg);
  var resID = msg.resID;
  let buyer_id = msg.buyer_id;
  let orderstatus = msg.orderstatus;
  console.log("data is" + data);
  console.log("resID is" + resID);

  Order.updateMany(
    { buyer_id: buyer_id, res_id: resID },
    {
      $set: { order_status: orderstatus }
    },
    { upsert: true }
  )
    .then(order => {
      console.log("Updated Order Document:", order);
      data = {
        success: true,
        result: order
      };
      callback(null, data);
      //return response.status(200).json(data);
    })
    .catch(err => {
      console.log("Error while updating order status");
      callback(null, err);
    });
}

exports.handle_request = handle_request;
