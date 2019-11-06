import axios from "axios";
import { GET_ERRORS } from "./types";
import { GET_MENU_DATA, UPDATE_MENU_DATA, GET_BUYER_MENU_DATA } from "./types";
import { rooturl } from "../utils/settings.js";

//Get Menu
export const getMenu = () => dispatch => {
  let email = localStorage.getItem("email");
  console.log("Printing email_id " + email);
  axios
    .get("http://" + rooturl + ":3500/api/menu/getMenu", {
      params: { email: email }
    })
    .then(response => {
      dispatch({
        type: GET_MENU_DATA,
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

//Update Menu
export const updateMenu = data => dispatch => {
  axios
    .post("http://" + rooturl + ":3500/api/menu/updatemenu", data)
    .then(response => {
      console.log("Status Code : ", response.status);
      console.log(response);
      if (response.status === 200) {
        console.log("successful  response");
        dispatch({
          type: UPDATE_MENU_DATA,
          payload: "Menu Saved Successfully"
        });
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

//Get Buyer Menu
export const getBuyerMenu = data => dispatch => {
  axios
    .get("http://" + rooturl + ":3500/api/menu/getBuyerMenu", {
      params: { resID: data.resID }
    })
    .then(response => {
      dispatch({
        type: GET_BUYER_MENU_DATA,
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
