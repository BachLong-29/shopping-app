import type { Metadata } from "next";
import { ProfileProvider } from "../context/ProfileContext";
import { getProfile } from "@/app/action";
import { use } from "react";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "User profile",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ user_id: string }>;
}>) {
  const resolvedParams = use(params);
  const data = use(getProfile(resolvedParams?.["user_id"]));
  return <ProfileProvider value={data}>{children}</ProfileProvider>;
}
