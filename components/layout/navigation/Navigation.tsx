/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { useLanguage } from "@/core/context/LanguageContext";
import authService from "@/core/services/authService";
import { setUser } from "@/redux/reducer/profileReducer";
import { RootState } from "@/redux/store/store";
import Cart from "./Cart";
import Logo from "./Logo";
import MenuMobile from "./MenuMobile";
import UserCard from "./UserCard";

const navClass =
  "w-full bg-white shadow-md p-4 sticky top-0 left-0 z-50 transition-all border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60";

const Navigation = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const userProfile = useSelector((state: RootState) => state.profile);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasUserInfo = !!userProfile._id;

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await authService.me();
      dispatch(setUser(userInfo.user));
    };
    if (!userProfile) {
      getUserInfo();
    }
  }, []);

  return (
    <nav className={navClass}>
      <div className="container mx-auto flex justify-between items-center">
        <Logo />

        {/* Desktop Search Bar + Cart */}
        <div className="flex items-center gap-4 w-full max-w-3xl mr-4 ml-0 lg:ml-4">
          <div className="relative flex items-center w-full">
            <Input
              type="text"
              placeholder={t("action.search")}
              className="w-full pl-4 pr-12 py-2.5 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute right-4 text-gray-500 cursor-pointer"
              size={20}
            />
          </div>

          <Cart id={userProfile._id} />
        </div>

        {/* Mobile Menu Button */}
        <button className="xl:hidden" onClick={toggleMobileMenu}>
          {hasUserInfo && <UserCard userInfo={userProfile as any} />}
        </button>

        <div className="show-hide-flex flex-all-center gap-2.5">
          <MenuMobile onToggle={toggleMobileMenu} id={userProfile._id} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <MenuMobile onToggle={toggleMobileMenu} id={userProfile._id} />
      )}
    </nav>
  );
};

export default Navigation;
