"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import Link from "next/link";
import { UserInfo } from "@/core/model/User";
import authService from "@/core/services/authService";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useLanguage } from "@/core/context/LanguageContext";

export default function UserDropdown({
  userInfo,
}: {
  userInfo: Pick<UserInfo, "id" | "name" | "email">;
}) {
  const { t } = useLanguage();
  const handleLogout = () => {
    authService.logout().then(() => {
      redirect("/login");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full bg-black p-2 pr-3 text-white cursor-pointer shrink-0"
          )}
        >
          <Image
            width={35}
            height={35}
            alt="avatar-user"
            src="/images/default-avatar.jpg"
            className="rounded-full border border-pink-500"
          />
          <span className="truncate">{userInfo.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 bg-white border border-gray-200 shadow-lg rounded-lg p-2"
      >
        <ul className="space-y-2">
          <Link href={`/my-task/${userInfo.id}/profile`}>
            <li className="cursor-pointer  px-3 py-1 rounded-md hover:bg-gray-100">
              {t("module.profile")}
            </li>
          </Link>
          <Link href={`/my-task/${userInfo.id}/product`}>
            <li className="cursor-pointer mt-2 px-3 py-1 rounded-md hover:bg-gray-100">
              {t("module.my_task")}
            </li>
          </Link>
          <Link href={`/my-task/${userInfo.id}/settings`}>
            <li className="cursor-pointer mt-2 px-3 py-1 rounded-md hover:bg-gray-100">
              {t("module.settings")}
            </li>
          </Link>
          {/* Divider */}
          <hr className="border-t border-gray-300 my-2" />
          <li
            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100"
            onClick={handleLogout}
          >
            {t("action.log_out")}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
