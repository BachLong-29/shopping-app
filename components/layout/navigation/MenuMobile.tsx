/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/core/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { RootState } from "@/redux/store/store";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserPopover";

const showHideXL = "xl:flex hidden";

const MenuMobile = ({
  id,
  onToggle,
}: {
  id?: string;
  onToggle: () => void;
}) => {
  const { t } = useLanguage();
  const userProfile = useSelector((state: RootState) => state.profile);
  const pathname = usePathname();
  const router = useRouter();

  const hasUserInfo = !!id;
  const isLoginPage = pathname === "/login";
  const requiredLogin = !isLoginPage && !hasUserInfo;
  const isMobile = useIsMobile();

  const handleLogin = () => {
    router.push("/login");
  };

  const menu = useMemo(() => {
    return (
      <>
        <ThemeToggle />
        <LanguageSwitcher />
        {hasUserInfo && (
          <UserDropdown
            userInfo={userProfile as any}
            isShorten={isMobile}
            onChangeAfterSelect={onToggle}
          />
        )}

        {requiredLogin && (
          <Button
            className="w-32 bg-blue-500 hover:bg-blue-600"
            onClick={handleLogin}
          >
            {t("action.sign_in")}
          </Button>
        )}
      </>
    );
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-gray-200 mt-4 p-4"
        >
          <div className="container mx-auto flex gap-4 justify-between items-center">
            <div className="flex gap-4 items-center">{menu}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={clsx(showHideXL, "flex-all-center gap-2.5")}>{menu}</div>
    </>
  );
};

export default MenuMobile;
