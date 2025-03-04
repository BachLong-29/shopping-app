// "use client";

// import { applyMiddleware, combineReducers, createStore } from "redux";

// import { composeWithDevTools } from "@redux-devtools/extension";
// import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
// import { initSagas } from "./../saga/index";
// import productReducer from "../reducer/productReducer";
// import userReducer from "../reducer/userReducer";

// // const configureStore = () => {
// //   const store = createStore(
// //     combineReducers({
// //       product: productReducer,
// //       user: userReducer,
// //     }),
// //     composeWithDevTools(applyMiddleware(...middlewares))
// //   );
// //   initSagas(sagaMiddleware);
// //   return store;
// // };

// export const makeStore = () =>
//   configureStore({
//     reducer: {
//       user: userReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(sagaMiddleware),
//     devTools: process.env.NODE_ENV !== "production",
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

// export const wrapper = createWrapper<AppStore>(makeStore);

// // export const wrapper = createWrapper(configureStore, { debug: true });

import { authReducer } from "../reducer/authReducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../saga/rootSaga";
import { useDispatch } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    me: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
