import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/core/context/LanguageContext";

const LanguageSwitcher = () => {
  const { locale, switchLanguage } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center border rounded-md cursor-pointer shrink-0 hover:bg-gray-100"
          )}
        >
          {locale === "vi" ? (
            <div className="flex items-center  gap-2 px-3 rounded-md ">
              <Image
                width={20}
                height={20}
                alt="vietnam"
                src="/images/vietnam.png"
              />
              Tiếng Việt
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 rounded-md ">
              <Image
                width={20}
                height={20}
                alt="english"
                src="/images/english.png"
              />
              English
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 bg-white border border-gray-200 shadow-lg rounded-lg p-2"
      >
        <ul className="space-y-2">
          <li
            className="flex items-center cursor-pointer gap-2 px-3 py-1 rounded-md hover:bg-gray-100"
            onClick={() => switchLanguage("vi")}
          >
            <Image
              width={20}
              height={20}
              alt="vietnam"
              src="/images/vietnam.png"
            />
            Tiếng Việt
          </li>
          <li
            className="flex items-center cursor-pointer gap-2 px-3 py-1 rounded-md hover:bg-gray-100"
            onClick={() => switchLanguage("en")}
          >
            <Image
              width={20}
              height={20}
              alt="english"
              src="/images/english.png"
            />
            English
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
