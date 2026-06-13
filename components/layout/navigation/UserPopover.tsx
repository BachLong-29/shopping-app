"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { LogOut, Package, Settings, User, X } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/core/context/LanguageContext"
import { Gender, UserInfo } from "@/core/model/User"
import { signOut } from "@/redux/reducer/authReducer"
import UserCard from "./UserCard"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

const getAvatar = (userInfo: UserInfo) =>
  userInfo.avatar
    ? userInfo.avatar
    : userInfo?.gender === Gender.Female
      ? "/images/female-avatar.jpg"
      : "/images/male-avatar.jpg"

/* Icon pill color map per menu key */
const iconStyle: Record<string, string> = {
  profile:  "bg-halo-violet/10 text-halo-violet",
  product:  "bg-halo-emerald/10 text-halo-emerald",
  settings: "bg-halo-amber/10   text-halo-amber",
}

/* ─── Mobile bottom sheet ────────────────────────────────────────── */
function UserBottomSheet({
  open,
  onClose,
  userInfo,
  onLogout,
}: {
  open: boolean
  onClose: () => void
  userInfo: UserInfo
  onLogout: () => void
}) {
  const { t } = useLanguage()
  const router = useRouter()
  const touchStartY = useRef(0)

  const userAvatar = getAvatar(userInfo)

  const menuItems = [
    { key: "profile",  href: `/my-task/${userInfo._id}/profile`,  label: t("module.profile"),  icon: <User size={16} /> },
    { key: "product",  href: `/my-task/${userInfo._id}/product`,  label: t("module.my_task"),  icon: <Package size={16} /> },
    { key: "settings", href: `/my-task/${userInfo._id}/settings`, label: t("module.settings"), icon: <Settings size={16} /> },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const onTouchEnd   = (e: React.TouchEvent) => { if (e.changedTouches[0].clientY - touchStartY.current > 60) onClose() }

  const handleSelect = (href: string) => { onClose(); router.push(href) }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[260] bg-background rounded-t-[24px] flex flex-col",
          "border-t border-border/60",
          "transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
          "shadow-[0_-12px_48px_rgba(0,0,0,0.15)]",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-9 h-1 rounded-full bg-border" />
        </div>

        {/* User info header */}
        <div className="relative px-5 pt-4 pb-5 border-b border-border/60 shrink-0 overflow-hidden">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-10 -left-6 w-40 h-40 rounded-full bg-halo-violet/10 blur-3xl" />
          <div className="pointer-events-none absolute -top-6 right-0 w-32 h-32 rounded-full bg-halo-rose/8 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-halo-violet to-halo-rose opacity-20 blur-sm scale-110" />
                <Image
                  width={48}
                  height={48}
                  alt="avatar"
                  src={userAvatar}
                  className="relative w-12 h-12 rounded-full border-2 border-halo-violet/30 object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-foreground leading-tight">{userInfo.name}</p>
                {userInfo.email && (
                  <p className="text-xs text-muted-foreground mt-0.5">{userInfo.email}</p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Menu items */}
        <nav className="px-3 py-3 shrink-0">
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-[14px] text-sm font-medium text-foreground hover:bg-muted transition-colors group"
                  onClick={() => handleSelect(item.href)}
                >
                  <span className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-[10px] transition-colors shrink-0",
                    iconStyle[item.key],
                  )}>
                    {item.icon}
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div
          className="px-3 pt-2 pb-2 border-t border-border/60 shrink-0"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
        >
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-[14px] text-sm font-medium text-halo-rose hover:bg-halo-rose/8 transition-colors group"
            onClick={onLogout}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-halo-rose/10 text-halo-rose shrink-0">
              <LogOut size={16} />
            </span>
            <span className="group-hover:translate-x-0.5 transition-transform">
              {t("action.log_out")}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── UserDropdown ───────────────────────────────────────────────── */
export default function UserDropdown({
  userInfo,
  isShorten,
  onChangeAfterSelect,
}: {
  userInfo: UserInfo
  isShorten?: boolean
  onChangeAfterSelect?: () => void
}) {
  const { t } = useLanguage()
  const router = useRouter()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const [sheetOpen, setSheetOpen] = useState(false)

  const userAvatar = getAvatar(userInfo)

  const handleLogout = () => {
    setSheetOpen(false)
    onChangeAfterSelect?.()
    dispatch(signOut())
    setTimeout(() => { redirect("/login") }, 1000)
  }

  const menuItems = [
    { key: "profile",  href: `/my-task/${userInfo._id}/profile`,  label: t("module.profile"),  icon: <User size={14} /> },
    { key: "product",  href: `/my-task/${userInfo._id}/product`,  label: t("module.my_task"),  icon: <Package size={14} /> },
    { key: "settings", href: `/my-task/${userInfo._id}/settings`, label: t("module.settings"), icon: <Settings size={14} /> },
  ]

  const selectItem = (link: string) => { router.push(link); onChangeAfterSelect?.() }

  if (isMobile) {
    return (
      <>
        <div onClick={() => setSheetOpen(true)}>
          <UserCard userInfo={userInfo} isShorten={isShorten} />
        </div>
        <UserBottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          userInfo={userInfo}
          onLogout={handleLogout}
        />
      </>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <UserCard userInfo={userInfo} isShorten={isShorten} />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-52 p-0 border-border/60 shadow-xl rounded-[18px] overflow-hidden"
      >
        {/* Mini user header */}
        <div className="relative px-4 pt-4 pb-3.5 border-b border-border/60 overflow-hidden">
          <div className="pointer-events-none absolute -top-6 -right-4 w-24 h-24 rounded-full bg-halo-violet/10 blur-2xl" />
          <div className="relative flex items-center gap-2.5">
            <Image
              width={36}
              height={36}
              alt="avatar"
              src={userAvatar}
              className="w-9 h-9 rounded-full border border-halo-violet/30 object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight truncate">
                {userInfo.name}
              </p>
              {userInfo.email && (
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                  {userInfo.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Menu */}
        <ul className="p-1.5 space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => selectItem(item.href)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-sm text-foreground hover:bg-muted transition-colors group"
              >
                <span className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-[7px] shrink-0 transition-colors",
                  iconStyle[item.key],
                )}>
                  {item.icon}
                </span>
                <span className="font-medium group-hover:translate-x-0.5 transition-transform">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="p-1.5 pt-0 border-t border-border/60">
          <button
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] text-sm text-halo-rose hover:bg-halo-rose/8 transition-colors group"
            onClick={handleLogout}
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-[7px] bg-halo-rose/10 text-halo-rose shrink-0">
              <LogOut size={14} />
            </span>
            <span className="font-medium group-hover:translate-x-0.5 transition-transform">
              {t("action.log_out")}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
