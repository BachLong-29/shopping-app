import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    token: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    signInSuccess: (state, action: PayloadAction<AuthState["user"]>) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    signOut: () => {
      return initialState;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

export const { signInRequest, signInSuccess, signInFailure, signOut } =
  authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
