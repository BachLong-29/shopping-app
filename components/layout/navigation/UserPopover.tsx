"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import UserCard from "./UserCard";
import { UserInfo } from "@/core/model/User";
import { redirect } from "next/navigation";
import { signOut } from "@/redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import { useLanguage } from "@/core/context/LanguageContext";

export default function UserDropdown({
  userInfo,
  isShorten,
}: {
  userInfo: UserInfo;
  isShorten?: boolean;
}) {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
    setTimeout(() => {
      redirect("/login");
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <UserCard userInfo={userInfo} isShorten={isShorten} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 border border-gray-200 shadow-lg rounded-lg p-2"
      >
        <ul className="space-y-2">
          <Link href={`/my-task/${userInfo._id}/profile`}>
            <li className="cursor-pointer  px-3 py-1 rounded-md hover:bg-[hsl(var(--muted))]">
              {t("module.profile")}
            </li>
          </Link>
          <Link href={`/my-task/${userInfo._id}/product`}>
            <li className="cursor-pointer mt-2 px-3 py-1 rounded-md hover:bg-[hsl(var(--muted))]">
              {t("module.my_task")}
            </li>
          </Link>
          <Link href={`/my-task/${userInfo._id}/settings`}>
            <li className="cursor-pointer mt-2 px-3 py-1 rounded-md hover:bg-[hsl(var(--muted))]">
              {t("module.settings")}
            </li>
          </Link>
          {/* Divider */}
          <hr className="border-t border-gray-300 my-2" />
          <li
            className="cursor-pointer px-3 py-1 rounded-md hover:bg-[hsl(var(--muted))]"
            onClick={handleLogout}
          >
            {t("action.log_out")}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
