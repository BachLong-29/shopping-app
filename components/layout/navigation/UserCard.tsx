import { Gender, UserInfo } from "@/core/model/User"
import Image from "next/image"
import React from "react"

const UserCard = ({
  userInfo,
  isShorten,
}: {
  userInfo: UserInfo
  isShorten?: boolean
}) => {
  const userAvatar = userInfo.avatar
    ? userInfo.avatar
    : userInfo?.gender === Gender.Female
      ? "/images/female-avatar.jpg"
      : "/images/male-avatar.jpg"

  if (isShorten) {
    return (
      <Image
        width={32}
        height={32}
        alt="avatar-user"
        src={userAvatar}
        className="w-8 h-8 rounded-full border-2 border-halo-violet/40 cursor-pointer object-cover"
      />
    )
  }

  return (
    <div className="flex items-center gap-2 bg-foreground text-background rounded-full py-1.5 pl-1.5 pr-3 cursor-pointer shrink-0 hover:opacity-90 transition-opacity">
      <Image
        width={28}
        height={28}
        alt="avatar-user"
        src={userAvatar}
        className="w-7 h-7 rounded-full border border-halo-violet/50 object-cover"
      />
      <span className="text-sm font-medium truncate max-w-[100px]">{userInfo.name}</span>
    </div>
  )
}

export default UserCard
