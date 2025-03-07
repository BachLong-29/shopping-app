import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import React from "react";
import { useLanguage } from "@/core/context/LanguageContext";

const LanguageSwitcher = () => {
  const { locale, switchLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white text-gray-600 p-2 rounded-md border border-gray-300 cursor-pointer">
        {locale === "en" ? "English" : "Tiếng Việt"}{" "}
        {/* Hiển thị ngôn ngữ hiện tại */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("vi")}>
          Tiếng Việt
        </DropdownMenuItem>
        {/* Thêm các ngôn ngữ khác nếu cần */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
