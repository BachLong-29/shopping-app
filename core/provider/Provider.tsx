"use client";

import { AuthProvider } from "../context/AuthContext";

// 🚀 Vì nó chứa AuthProvider (Client Component)

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
