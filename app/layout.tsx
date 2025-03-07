import "./globals.css";

import { LanguageProvider } from "@/core/context/LanguageContext";
import type { Metadata } from "next";
import ReduxProvider from "@/redux/Provider";

// import { Providers } from "@/core/provider/Provider";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Generated by create next app",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body>
        <ReduxProvider>
          {/* <Providers> */}
          <LanguageProvider>{children}</LanguageProvider>
          {/* </Providers> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
