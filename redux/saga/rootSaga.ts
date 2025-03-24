import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./authSaga";
import { watchCartSaga } from "./cartSaga";

export default function* rootSaga() {
  yield all([watchAuthSaga(), watchCartSaga()]);
}
