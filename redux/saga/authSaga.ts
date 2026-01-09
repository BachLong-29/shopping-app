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
import { UserInfo } from "@/core/model/User";

const signIn = (email: string, password: string): Promise<$FixType> => {
  return authService.login({ email, password });
};

export const getUserInfo = (): Promise<{ user: UserInfo }> => {
  return authService.me();
};

function* handleSignIn(action: {
  type: string;
  payload: { email: string; password: string };
}): Generator {
  try {
    const userInfo: { user: UserInfo } = yield call(getUserInfo);

    yield put(setUser(userInfo.user));
    yield put(fetchCartTotal({ userId: userInfo.user._id }));
    console.log({ userInfo });
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
