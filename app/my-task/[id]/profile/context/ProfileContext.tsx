"use client";

import { Gender, Role, UserInfo } from "@/core/model/User";
import { createContext, useContext } from "react";

const ProfileContext = createContext<{ user: UserInfo }>({
  user: {
    role: Role.User,
    avatar: "",
    birthdate: new Date(),
    email: "",
    gender: Gender.Other,
    id: "",
    name: "",
  },
});

export function ProfileProvider({
  value,
  children,
}: {
  value: { user: UserInfo };
  children: React.ReactNode;
}) {
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
