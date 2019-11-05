//Load Restaurant  Model
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Update Menu Request");

  var email = msg.email;
  var menu = msg.menu;

  console.log("email is" + email);
  console.log("menu is" + menu);

  Restaurant.findOneAndUpdate(
    {
      users: {
        email_id: email
      }
    },
    { $set: { res_menu: menu } },
    { upsert: true }
  )
    .then(result => {
      console.log("Updated Restaurant Document:", result);
      data = {
        success: true,
        result: result
      };
      callback(null, data);
    })
    .catch(err => {
      callback(null, err);
    });
}

exports.handle_request = handle_request;
