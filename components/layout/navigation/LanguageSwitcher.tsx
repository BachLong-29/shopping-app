"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { useLanguage } from "@/core/context/LanguageContext"

const LanguageSwitcher = () => {
  const { locale, switchLanguage } = useLanguage()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          aria-label="Language"
        >
          <Image
            width={18}
            height={18}
            alt={locale === 'vi' ? 'Vietnam' : 'English'}
            src={locale === 'vi' ? '/images/vietnam.png' : '/images/english.png'}
            className="rounded-sm object-cover"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36 p-1.5 border-border">
        <ul className="space-y-0.5">
          <li
            className="flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer hover:bg-muted text-sm text-foreground transition-colors"
            onClick={() => switchLanguage("vi")}
          >
            <Image width={16} height={16} alt="vietnam" src="/images/vietnam.png" />
            Tiếng Việt
          </li>
          <li
            className="flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer hover:bg-muted text-sm text-foreground transition-colors"
            onClick={() => switchLanguage("en")}
          >
            <Image width={16} height={16} alt="english" src="/images/english.png" />
            English
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default LanguageSwitcher
