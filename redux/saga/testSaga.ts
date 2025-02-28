import { delay, put } from "redux-saga/effects";

export function* testSaga() {
  while (true) {
    yield delay(1000);
  }
}

export function* dispatchTest() {
  while (true) {
    yield delay(1000);
    yield put({ type: "" });
  }
}
