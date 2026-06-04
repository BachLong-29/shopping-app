"use client";

import { Gender, Role, UserInfo } from "@/core/model/User";
import { createContext, useContext } from "react";

const ProfileContext = createContext<UserInfo>({
  _id: "",
  role: Role.User,
  avatar: "",
  birthdate: new Date(),
  email: "",
  gender: Gender.Other,
  name: "",
  address: "",
  phone: "",
  bio: "",
  username: "",
  title: "",
  nationality: "",
  phone2: "",
  emergency: "",
  languages: [],
  timezone: "",
  district: "",
  state: "",
  city: "",
  postal: "",
  country: "",
  website: "",
  linkedin: "",
  github: "",
  twitter: "",
  instagram: "",
  facebook: "",
  preferences: {
    theme: "System",
    language: "English",
    orderUpdates: true,
    productNews: true,
    marketingEmails: false,
    publicProfile: true,
    showActivity: false,
    searchable: true,
  },
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
