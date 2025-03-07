"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { createTranslator } from "next-intl";
import { getMessages } from "@/locales/i18n";

interface LanguageContextType {
  locale: string;
  switchLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState(() => {
    // Kiểm tra xem đã lưu ngôn ngữ trước đó chưa
    if (typeof window !== "undefined") {
      return localStorage.getItem("locale") || "en";
    }
    return "en";
  });
  const [isLoading, setIsLoading] = useState(true);

  console.log({ locale });
  const [t, setT] = useState<(key: string) => string>(
    () => (key: string) => key
  );

  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true);
      const messages = await getMessages(locale);
      const translator = createTranslator({ locale, messages });
      setT(() => translator);
      setIsLoading(false);
    }
    loadTranslations();
  }, [locale]);

  const switchLanguage = (lang: string) => {
    setLocale(lang);
    localStorage.setItem("locale", lang); // Lưu ngôn ngữ vào localStorage để nhớ sau khi reload trang
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading translations...</p>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
