"use client"; // 🚀 Bắt buộc để dùng hooks trong Next.js 15

import { Gender, UserInfo } from "../model/User";
import { ReactNode, createContext, useEffect, useState } from "react";

import { usePathname } from "next/navigation";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("useAuth");

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) throw new Error("Không thể lấy thông tin người dùng");
      const data: { user: User } = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth phải được sử dụng trong AuthProvider");
//   }
//   return context;
// };
export function useAuth() {
  const [user, setUser] = useState<
    Pick<UserInfo, "_id" | "name" | "email" | "gender">
  >({
    _id: "",
    email: "",
    name: "",
    gender: Gender.Male,
  });
  const pathName = usePathname();

  useEffect(() => {
    console.log("useAuth");
    if (pathName !== "/login") {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .catch(() =>
          setUser({
            _id: "",
            email: "",
            name: "",
            gender: Gender.Male,
          })
        );
    }
  }, [setUser, pathName]);

  return { user };
}
