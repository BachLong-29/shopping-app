import { AuthState } from "../reducer/authReducer";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUser = (user: any) => ({
  type: "SET_USER",
  payload: user,
});

export const loginRequest = (username: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (user: Pick<AuthState, "user">) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
