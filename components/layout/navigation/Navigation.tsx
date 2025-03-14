/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import { RootState } from "@/redux/store/store";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserPopover";
import { setUser } from "@/redux/reducer/profileReducer";
import { useEffect } from "react";
import { useLanguage } from "@/core/context/LanguageContext";

const Navigation = (props: any) => {
  const { user } = props;
  const userProfile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const { t } = useLanguage();
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <nav className="w-full bg-white shadow-md p-4 sticky top-0 left-0 z-50 transition-all border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link className="cursor-pointer" href="/">
          <Image
            width={40}
            height={40}
            alt="logo"
            src="/images/logo.png"
            className="drop-shadow-[0_4px_6px_rgba(255,255,255,0.5)]"
          />
        </Link>

        {/* Search Bar + Cart */}
        <div className="flex items-center gap-4 w-full max-w-3xl">
          {/* Search Input */}
          <div className="relative flex items-center w-full">
            <Input
              type="text"
              placeholder={t("action.search")}
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
        <div className="flex gap-2.5">
          <ThemeToggle />
          <LanguageSwitcher />
          {userProfile._id ? (
            <UserDropdown userInfo={userProfile as any} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
