"use client";

import { Gender, UserInfo } from "../model/User";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Pick<UserInfo, "_id" | "name" | "email" | "gender"> | null;
  setUser: (user: Pick<UserInfo, "_id" | "name" | "email" | "gender"> | null) => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Pick<UserInfo, "_id" | "name" | "email" | "gender"> | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data: { user: UserInfo } = await res.json();
      setUser(data.user);
    } catch {
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Fallback: standalone hook for components outside AuthProvider
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState<Pick<UserInfo, "_id" | "name" | "email" | "gender">>({
      _id: "",
      email: "",
      name: "",
      gender: Gender.Male,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      fetch("/api/auth/me")
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .catch(() =>
          setUser({ _id: "", email: "", name: "", gender: Gender.Male })
        );
    }, []);

    return { user };
  }

  return { user: context.user };
}
