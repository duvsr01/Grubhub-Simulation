import { SET_PROFILE_DATA, UPDATE_PROFILE_DATA } from "../_actions/types";

const initialAuthState = {
  user: {}
};

export const profileReducer = (state = { ...initialAuthState }, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        user: action.payload
      };

    default:
      return { ...state };
  }
};
