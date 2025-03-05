import {
  LOGIN_REQUEST,
  loginFailure,
  loginSuccess,
} from "../actions/user.action";
import { call, put, takeEvery } from "redux-saga/effects";

import { AuthState } from "../reducer/authReducer";
import authService from "@/core/services/authService";

// Định nghĩa kiểu trả về của API giả lập
interface LoginResponse {
  status: "success" | "falied";
  user: Pick<AuthState, "user">;
}

// Hàm giả lập API login
function loginApi(email: string, password: string): Promise<LoginResponse> {
  const res = authService.login({ email, password });
  return res;
}

// Saga xử lý đăng nhập
function* handleLogin(action: {
  type: string;
  payload: { username: string; password: string };
}): Generator {
  try {
    const { username, password } = action.payload;

    // Gọi API và khai báo kiểu dữ liệu trả về
    const response = (yield call(
      loginApi,
      username,
      password
    )) as LoginResponse;
    if (response.status === "success") {
      yield put(loginSuccess(response.user));
    }
  } catch (error) {
    yield put(loginFailure((error as Error)?.message));
  }
}

// Lắng nghe action LOGIN_REQUEST
export function* watchAuthSaga() {
  yield takeEvery(LOGIN_REQUEST, handleLogin);
}
