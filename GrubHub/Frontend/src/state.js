import { combineReducers } from "redux";
import { authReducer } from "./components/_reducers/auth.reducer";
import { registerReducer } from "./components/_reducers/register.reducer";
import { errorReducer } from "./components/_reducers/error.reducer";
import { profileReducer } from "./components/_reducers/profile.reducer";
import { menuReducer } from "./components/_reducers/menu.reducer";
import { restaurantReducer } from "./components/_reducers/restaurant.reducer";
import { orderReducer } from "./components/_reducers/order.reducer";

export const rootReducer = combineReducers({
  authState: authReducer,
  registerState: registerReducer,
  profileState: profileReducer,
  menuState: menuReducer,
  restaurantState: restaurantReducer,
  orderState: orderReducer,
  errorState: errorReducer
});
