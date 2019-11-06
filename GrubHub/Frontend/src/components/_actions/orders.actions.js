import axios from "axios";
import { GET_ERRORS } from "./types";
import { rooturl } from "../utils/settings.js";
import {
  MANAGE_ORDERS,
  UPDATE_ORDER,
  PLACE_ORDER,
  UPCOMING_ORDERS,
  PAST_ORDERS
} from "./types";

//Manage Orders
export const manageOrders = () => dispatch => {
  let resID = localStorage.getItem("restaurantID");

  axios
    .get("http://" + rooturl + ":3500/api/orders/manageOrders", {
      params: { resID: resID }
    })
    .then(response => {
      dispatch({
        type: MANAGE_ORDERS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Update Orders
export const updateOrder = itemObj => dispatch => {
  axios
    .post("http://" + rooturl + ":3500/api/orders/updateOrder", itemObj)
    .then(response => {
      dispatch({
        type: UPDATE_ORDER,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Place Order
export const placeOrder = data => dispatch => {
  axios
    .post("http://" + rooturl + ":3500/api/orders/placeOrder", data)
    .then(response => {
      dispatch({
        type: PLACE_ORDER,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Upcoming Orders
export const upComingOrders = () => dispatch => {
  let user_id = localStorage.getItem("userID");
  axios
    .get("http://" + rooturl + ":3500/api/orders/upcomingOrders", {
      params: { buyer_id: user_id }
    })
    .then(response => {
      dispatch({
        type: UPCOMING_ORDERS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Past Orders
export const pastOrders = () => dispatch => {
  let user_id = localStorage.getItem("userID");
  axios
    .get("http://" + rooturl + ":3500/api/orders/pastOrders", {
      params: { buyer_id: user_id }
    })
    .then(response => {
      dispatch({
        type: PAST_ORDERS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
