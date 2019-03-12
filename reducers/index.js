import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";

import thunk from "redux-thunk";
import auth from "./auth";
import country from "./country";
import global from "./global";
import tripReport from "./tripReport";
import user from "./user";

const reducer = combineReducers({ auth, country, global, tripReport, user });
const enhancer = applyMiddleware(thunk); //, logger)
const store = createStore(reducer, enhancer);

export default store;
