"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import authService from "@/core/services/authService";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();
  const handleLogout = () => {
    authService.logout().then(() => router.push("/login"));
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
          <span className="truncate">Markky</span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 bg-white border border-gray-200 shadow-lg rounded-lg p-2"
      >
        <ul className="space-y-2">
          <li className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100">
            Profile
          </li>
          <li className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100">
            Settings
          </li>
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
