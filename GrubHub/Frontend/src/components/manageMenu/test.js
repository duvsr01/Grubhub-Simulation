import localStorage from "redux-persist/es/storage";

let cart = [];

//cart = [{item:"Burger",price:20,qty:2}];

var itemObj = {};
itemObj.item = "Pizza";
itemObj.price = 20;
itemObj.qty = 3;

cart.push(itemObj);
