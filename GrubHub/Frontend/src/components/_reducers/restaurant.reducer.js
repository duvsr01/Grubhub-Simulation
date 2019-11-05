import { GET_RESTAURANT_DATA, SEARCH_ITEMS } from "../_actions/types";

const initialState = {
  restaurant: {}
};

export const restaurantReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_RESTAURANT_DATA:
      return {
        ...state,
        restaurant: action.payload
      };
    case SEARCH_ITEMS:
      return {
        restaurant: action.payload
      };

    default:
      return { ...state };
  }
};
