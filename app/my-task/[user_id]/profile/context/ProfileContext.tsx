"use client";

import { Gender, Role, UserInfo } from "@/core/model/User";
import { createContext, useContext } from "react";

const ProfileContext = createContext<UserInfo>({
  role: Role.User,
  avatar: "",
  birthdate: "",
  email: "",
  gender: Gender.Other,
  id: "",
  name: "",
  address: "",
  phone: "",
  _id: "",
});

export function ProfileProvider({
  value,
  children,
}: {
  value: UserInfo;
  children: React.ReactNode;
}) {
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
