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

  const userAvatar = userInfo.avatar
    ? userInfo.avatar
    : userInfo?.gender === Gender.Female
      ? "/images/female-avatar.jpg"
      : "/images/male-avatar.jpg"

  const menuItems = [
    { key: "profile",  href: `/my-task/${userInfo._id}/profile`,  label: t("module.profile"),  icon: <User size={17} /> },
    { key: "product",  href: `/my-task/${userInfo._id}/product`,  label: t("module.my_task"),  icon: <Package size={17} /> },
    { key: "settings", href: `/my-task/${userInfo._id}/settings`, label: t("module.settings"), icon: <Settings size={17} /> },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientY - touchStartY.current > 60) onClose()
  }

  const handleSelect = (href: string) => {
    onClose()
    router.push(href)
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[260] bg-background rounded-t-[24px] flex flex-col",
          "transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
          "shadow-[0_-8px_40px_rgba(0,0,0,0.18)]",
          open ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 shrink-0">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/25" />
        </div>

        {/* User info header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Image
              width={44}
              height={44}
              alt="avatar"
              src={userAvatar}
              className="w-11 h-11 rounded-full border-2 border-halo-violet/40 object-cover"
            />
            <div>
              <p className="font-semibold text-foreground leading-tight">{userInfo.name}</p>
              {userInfo.email && (
                <p className="text-xs text-muted-foreground mt-0.5">{userInfo.email}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-3 py-2 shrink-0">
          <ul>
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  onClick={() => handleSelect(item.href)}
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div
          className="px-3 pt-1 border-t border-border shrink-0"
          style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
        >
          <button
            className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            onClick={onLogout}
          >
            <LogOut size={17} />
            {t("action.log_out")}
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

  const handleLogout = () => {
    setSheetOpen(false)
    onChangeAfterSelect?.()
    dispatch(signOut())
    setTimeout(() => { redirect("/login") }, 1000)
  }

  const menuItems = [
    { key: "profile",  href: `/my-task/${userInfo._id}/profile`,  label: t("module.profile") },
    { key: "product",  href: `/my-task/${userInfo._id}/product`,  label: t("module.my_task") },
    { key: "settings", href: `/my-task/${userInfo._id}/settings`, label: t("module.settings") },
  ]

  const selectItem = (link: string) => {
    router.push(link)
    onChangeAfterSelect?.()
  }

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
      <PopoverContent align="end" className="w-40 border-border shadow-lg rounded-xl p-1.5">
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => selectItem(item.href)}
              className="px-3 py-2 rounded-md cursor-pointer hover:bg-muted text-sm text-foreground transition-colors"
            >
              {item.label}
            </li>
          ))}
          <li className="border-t border-border pt-1 mt-1">
            <button
              className="w-full text-left px-3 py-2 rounded-md cursor-pointer hover:bg-muted text-sm text-destructive transition-colors"
              onClick={handleLogout}
            >
              {t("action.log_out")}
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
