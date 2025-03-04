"use client";

import { Search, ShoppingCart } from "lucide-react";

import { Badge } from "../ui/badge";
import Image from "next/image";
import { Input } from "../ui/input";
import React from "react";
import UserDropdown from "../layout/UserPopover";
import { redirect } from "next/navigation";
import { useAuth } from "@/core/context/AuthContext";
import withAuth from "./withAuth";

const withMyTask = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MyTaskComponent = (props: P & { user: any }) => {
    const { user } = useAuth();
    console.log({ user });
    const goHome = () => redirect("/");
    return (
      <>
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <nav className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-50 transition-all">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <span className="cursor-pointer" onClick={goHome}>
                <Image
                  width={40}
                  height={40}
                  alt="logo"
                  src="/images/logo.png"
                />
              </span>

              {/* Search Bar + Cart */}
              <div className="flex items-center gap-4 w-full max-w-2xl">
                {/* Search Input */}
                <div className="relative flex items-center w-full">
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pl-4 pr-12 py-2.5 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ height: "36px" }}
                  />
                  <Search
                    className="absolute right-4 text-gray-500 cursor-pointer"
                    size={20}
                  />
                </div>

                {/* Cart Icon with Badge */}
                <div className="relative flex items-center justify-center w-10 h-9 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                  <ShoppingCart className="text-gray-600" size={20} />
                  {22 > 0 && (
                    <Badge className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {22}
                    </Badge>
                  )}
                </div>
              </div>

              {/* User Dropdown */}
              {user?.id ? <UserDropdown userInfo={user} /> : <div></div>}
              {/* <UserDropdown /> */}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 pt-24 container mx-auto p-4">
            <WrappedComponent {...props} />
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white p-4 mt-8 text-center">
            <p>&copy; 2025 Shop. All rights reserved.</p>
          </footer>
        </div>
      </>
    );
  };

  return withAuth(MyTaskComponent);
};

export default withMyTask;
