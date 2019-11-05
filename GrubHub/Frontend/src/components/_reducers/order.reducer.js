import {
  MANAGE_ORDERS,
  UPDATE_ORDER,
  PLACE_ORDER,
  UPCOMING_ORDERS,
  PAST_ORDERS
} from "../_actions/types";

const initialState = {
  orders: {},
  update_order: {},
  place_order: {},
  upcoming_orders: {},
  past_orders: {}
};

export const orderReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case MANAGE_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case UPDATE_ORDER:
      return {
        ...state,
        update_order: action.payload
      };
    case PLACE_ORDER:
      return {
        ...state,
        place_order: action.payload
      };
    case UPCOMING_ORDERS:
      return {
        ...state,
        upcoming_orders: action.payload
      };
    case PAST_ORDERS:
      return {
        ...state,
        past_orders: action.payload
      };

    default:
      return { ...state };
  }
};
