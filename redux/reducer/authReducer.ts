import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/user.action";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    role: string | null;
    token: string | null;
    name: string | null;
  };
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    role: null,
    token: null,
    name: null,
  },
  error: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case LOGOUT:
      return { ...state, isAuthenticated: false, error: null };
    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false, error: action.payload }; // Lưu lỗi vào state
    default:
      return state;
  }
};
