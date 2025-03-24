import { call, put, takeEvery } from "redux-saga/effects";
import { fetchCartTotal, setTotal } from "../reducer/cartReducer";
import { initialProfileState, setUser } from "../reducer/profileReducer";
import {
  signInFailure,
  signInRequest,
  signInSuccess,
  signOut,
} from "../reducer/authReducer";

import { $FixType } from "@/core/types/FixType";
import authService from "@/core/services/authService";

const signIn = (email: string, password: string): Promise<$FixType> => {
  return authService.login({ email, password });
};

function* handleSignIn(action: {
  type: string;
  payload: { email: string; password: string };
}): Generator {
  try {
    const { email, password } = action.payload;

    const response = (yield call(signIn, email, password)) as $FixType;
    if (response.status === "success") {
      yield put(signInSuccess(response.user));
      yield put(setUser(response.user));
      yield put(fetchCartTotal({ userId: response.user._id }));
    }
  } catch (error) {
    yield put(signInFailure((error as Error)?.message));
  }
}

const logOut = () => {
  return authService.logout();
};

function* handleSignOut(): Generator {
  try {
    const response = yield call(logOut);
    if (response.message) {
      yield put(
        setTotal({
          total: 0,
          productIds: [],
        })
      );
      yield put(setUser(initialProfileState));
    }
  } catch (error) {
    yield put(signInFailure((error as Error)?.message));
  }
}

export function* watchAuthSaga() {
  yield takeEvery(signInRequest.type, handleSignIn);
  yield takeEvery(signOut.type, handleSignOut);
}
