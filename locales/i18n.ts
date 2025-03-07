import { createTranslator } from "next-intl";

export async function getMessages(locale: string) {
  const messages = await import(`../locales/${locale}.json`).then(
    (mod) => mod.default
  );
  return messages;
}

export async function useI18n(locale: string) {
  const messages = await getMessages(locale);
  return createTranslator({ locale, messages });
}
