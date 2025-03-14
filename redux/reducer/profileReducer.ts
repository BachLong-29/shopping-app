import { Gender, Role, UserInfo } from "@/core/model/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = Omit<UserInfo, "birthdate"> & { birthdate: Date | string };

const initialState: UserState = {
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
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
