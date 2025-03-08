import { Gender, Role, UserInfo } from "@/core/model/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = UserInfo;

const initialState: UserState = {
  _id: "",
  id: "",
  name: "",
  email: "",
  gender: Gender.Male,
  avatar: "",
  birthdate: "",
  role: Role.User,
  address: "",
  phone: "",
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
