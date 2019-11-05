import {
  GET_MENU_DATA,
  UPDATE_MENU_DATA,
  GET_BUYER_MENU_DATA
} from "../_actions/types";

const initialState = {
  menu: {}
};

export const menuReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_MENU_DATA:
      return {
        ...state,
        menu: action.payload
      };
    case UPDATE_MENU_DATA:
      return {
        ...state,
        result: action.payload
      };
    case GET_BUYER_MENU_DATA:
      return {
        ...state,
        data: action.payload
      };

    default:
      return { ...state };
  }
};
