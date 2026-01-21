import { call, put, takeEvery } from "redux-saga/effects";
import { signInFailure, signInRequest, signOut } from "../reducer/authReducer";
import { fetchCartTotal, setTotal } from "../reducer/cartReducer";
import { initialProfileState, setUser } from "../reducer/profileReducer";

import { UserInfo } from "@/core/model/User";
import authService from "@/core/services/authService";

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
