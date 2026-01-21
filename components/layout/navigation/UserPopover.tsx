"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useLanguage } from "@/core/context/LanguageContext";
import { UserInfo } from "@/core/model/User";
import { signOut } from "@/redux/reducer/authReducer";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";

export default function UserDropdown({
  userInfo,
  isShorten,
  onChangeAfterSelect,
}: {
  userInfo: UserInfo;
  isShorten?: boolean;
  onChangeAfterSelect?: () => void;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signOut());
    setTimeout(() => {
      redirect("/login");
    }, 1000);
  };

  const menuItems = [
    {
      key: "profile",
      href: `/my-task/${userInfo._id}/profile`,
      label: t("module.profile"),
    },
    {
      key: "product",
      href: `/my-task/${userInfo._id}/product`,
      label: t("module.my_task"),
    },
    {
      key: "settings",
      href: `/my-task/${userInfo._id}/settings`,
      label: t("module.settings"),
    },
  ];
  const itemClass =
    "cursor-pointer px-3 py-1 rounded-md hover:bg-[hsl(var(--muted))]";

  const selectItem = (link: string) => {
    router.push(link);
    onChangeAfterSelect?.();
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
          {menuItems.map((item) => (
            <li
              onClick={() => selectItem(item.href)}
              key={item.key}
              className={itemClass}
            >
              {item.label}
            </li>
          ))}

          <hr className="border-t border-gray-300 my-2" />

          <li className={itemClass} onClick={handleLogout}>
            {t("action.log_out")}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
