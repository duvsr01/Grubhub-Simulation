//Load Orders  Model
const Order = require("../models/orders");

function handle_request(msg, callback) {
  console.log("Inside Place order Post Request");

  console.log(
    "printing msg inside the place order request" + JSON.stringify(msg)
  );

  //   let data = msg.body.data;
  //   console.log("The place order data is" + data);

  msg.map((item, itemIndex) => {
    const newOrder = new Order({
      buyer_id: item.buyer_id,
      buyer_email: item.buyer_email,
      res_id: item.resID,
      res_name: item.resName,
      item_name: item.item,
      item_price: item.price,
      item_qty: item.qty,
      order_status: "New"
    });

    console.log("buyer_id is " + item.buyer_id);
    console.log("buyer_email is " + item.buyer_email);
    console.log("restaurant_id is " + item.resID);
    console.log("restaurant_id is " + item.resName);
    console.log("item_name is" + item.item);
    console.log("item_price is" + item.price);
    console.log("item_qty is" + item.qty);

    newOrder
      .save()
      .then(order => {
        let data = {
          success: true,
          result: order
        };
        callback(null, data);
        //response.status(200).json(order);
        console.log(
          " The Order is saved with id " + order._id,
          "The restaurant id is " + order.res_id
        );
      })
      .catch(err => {
        console.log("Order could not be placed successfully" + err);
        callback(null, err);
      });

    var flag = 0;
  });
}

exports.handle_request = handle_request;
