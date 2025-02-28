import { applyMiddleware, combineReducers, createStore } from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "@redux-saga/core";
import { createWrapper } from "next-redux-wrapper";
import { initSagas } from "./../saga/index";
import productReducer from "../reducer/productReducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const configureStore = () => {
  const store = createStore(
    combineReducers({
      student: productReducer,
    }),
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  initSagas(sagaMiddleware);
  return store;
};

export const wrapper = createWrapper(configureStore, { debug: true });
