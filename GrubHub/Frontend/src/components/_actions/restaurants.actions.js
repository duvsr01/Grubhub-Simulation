import axios from "axios";
import { GET_RESTAURANT_DATA, SEARCH_ITEMS } from "./types";
import { GET_ERRORS } from "./types";

//Get Restaurants
export const getRestaurants = () => dispatch => {
  axios
    .get("http://localhost:3500/api/restaurants/getRst")
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_RESTAURANT_DATA,
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

// Search Items
export const searchItem = data => dispatch => {
  console.log("Inside search item post");
  axios
    .post("http://localhost:3500/api/restaurants/searchItem", data)
    .then(response => {
      dispatch({
        type: SEARCH_ITEMS,
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
