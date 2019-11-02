import { combineReducers } from "redux";
import { authReducer } from "./components/_reducers/auth.reducer";
import { registerReducer } from "./components/_reducers/register.reducer";
import { errorReducer } from "./components/_reducers/error.reducer";
import { profileReducer } from "./components/_reducers/profile.reducer";

export const rootReducer = combineReducers({
  authState: authReducer,
  registerState: registerReducer,
  profileState: profileReducer
});
