import { Gender, Role, UserInfo } from "@/core/model/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type UserState = Omit<UserInfo, "birthdate"> & { birthdate: Date | string };

export const initialProfileState: UserState = {
  _id: "",
  name: "",
  email: "",
  gender: Gender.Male,
  avatar: "",
  role: Role.User,
  address: "",
  phone: "",
  birthdate: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialProfileState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

const persistConfig = {
  key: "user",
  storage,
};

export const { setUser, updateUser } = userSlice.actions;
export const profileReducer = persistReducer(persistConfig, userSlice.reducer);
