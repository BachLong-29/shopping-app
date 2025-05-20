import { authReducer } from "../reducer/authReducer";
import cartReducer from "../reducer/cartReducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { persistStore } from "redux-persist";
import productReducer from "../reducer/productReducer";
import { profileReducer } from "../reducer/profileReducer";
import rootSaga from "../saga/rootSaga";
import salesOrderReducer from "../reducer/salesOrderReducer";
import { useDispatch } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    product: productReducer,
    SalesOrder: salesOrderReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
