import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export let store = applyMiddleware(thunk)(createStore)(rootReducer);
