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

export default function UserDropdown({
  userInfo,
}: {
  userInfo: Pick<UserInfo, "id" | "name" | "email">;
}) {
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
            "flex items-center gap-2 rounded-full bg-black p-2 text-white cursor-pointer shrink-0"
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
              Profile
            </li>
          </Link>
          <Link href="/my-task">
            <li className="cursor-pointer mt-2 px-3 py-1 rounded-md hover:bg-gray-100">
              My Task
            </li>
          </Link>
          <Link href="/settings">
            <li className="cursor-pointer mt-2 px-3 py-1 rounded-md hover:bg-gray-100">
              Settings
            </li>
          </Link>
          {/* Divider */}
          <hr className="border-t border-gray-300 my-2" />
          <li
            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
