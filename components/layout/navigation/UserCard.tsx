import { Gender, UserInfo } from "@/core/model/User";

import Image from "next/image";
import { Menu } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const UserCard = ({
  userInfo,
  isShorten,
}: {
  userInfo: UserInfo;
  isShorten?: boolean;
}) => {
  const userAvatar = userInfo.avatar
    ? userInfo.avatar
    : userInfo?.gender === Gender.Female
    ? "/images/female-avatar.jpg"
    : "/images/male-avatar.jpg";
  return (
    <>
      {isShorten ? (
        <Image
          width={35}
          height={35}
          alt="avatar-user"
          src={userAvatar}
          className="w-[45px] h-[45px] rounded-full border border-pink-500 cursor-pointer"
        />
      ) : (
        <div
          className={cn(
            "flex items-center border bg-black text-white gap-2 rounded-full p-2 pr-3 cursor-pointer shrink-0 min-w-[140px] lg:min-w-[auto]"
          )}
        >
          <Image
            width={35}
            height={35}
            alt="avatar-user"
            src={userAvatar}
            className="w-[35px] h-[35px] rounded-full border border-pink-500"
          />
          <span className="truncate">{userInfo.name}</span>
          <Menu size={14} className="mt-[3px] xl:hidden" />
        </div>
      )}
    </>
  );
};

export default UserCard;
