import axios from "axios";
import { GET_ERRORS } from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:3500/api/login/register", userData)
    .then(response => {
      console.log("Status Code : ", response.status);
      console.log(response);
      if (response.status === 200) {
        history.push("/login");
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
