import { combineReducers } from "redux";
import generalReducer from "./general/generalReducer";
import SearchReducer from "./search/SearchReducer";
import FilterReducer from "./filter/FilterReducer";
import AuthReducer from "./auth/AuthReducer";


export default combineReducers({
  auth: AuthReducer,
  general: generalReducer,
  filters: FilterReducer,
  search: SearchReducer,
});
