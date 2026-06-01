'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

// Sync imports – bundled at build time (no async flash, no reload)
import enMessages from '@/locales/en.json'
import viMessages from '@/locales/vi.json'

/* ─── Types ──────────────────────────────────────────────── */
export type Locale = 'en' | 'vi'
export type Params = Record<string, string | number>

const MESSAGES: Record<Locale, Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  vi: viMessages as Record<string, unknown>,
}

/* ─── Helpers ────────────────────────────────────────────── */
function resolveValue(messages: Record<string, unknown>, key: string): unknown {
  const parts = key.split('.')
  let cur: unknown = messages
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[part]
  }
  return cur
}

function resolve(messages: Record<string, unknown>, key: string): string {
  const val = resolveValue(messages, key)
  return typeof val === 'string' ? val : key
}

function interpolate(str: string, params?: Params): string {
  if (!params) return str
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
    str,
  )
}

/* ─── Context ────────────────────────────────────────────── */
interface LanguageContextType {
  locale: Locale
  switchLanguage: (lang: Locale) => void
  t: (key: string, params?: Params) => string
  tArr: (key: string) => string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/* ─── Provider ───────────────────────────────────────────── */
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Default to 'vi'; read stored locale after mount to avoid SSR/hydration mismatch
  const [locale, setLocale] = useState<Locale>('vi')

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && MESSAGES[stored]) setLocale(stored)
  }, [])

  const t = useCallback(
    (key: string, params?: Params): string => {
      const messages = MESSAGES[locale] ?? MESSAGES.vi
      return interpolate(resolve(messages, key), params)
    },
    [locale],
  )

  const tArr = useCallback(
    (key: string): string[] => {
      const messages = MESSAGES[locale] ?? MESSAGES.vi
      const val = resolveValue(messages, key)
      if (!Array.isArray(val)) return []
      return val.map(String)
    },
    [locale],
  )

  const switchLanguage = useCallback((lang: Locale) => {
    if (!MESSAGES[lang]) return
    setLocale(lang)
    localStorage.setItem('locale', lang)
    // No reload — React state update re-renders in-place
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  )
}

/* ─── Hook ───────────────────────────────────────────────── */
export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
