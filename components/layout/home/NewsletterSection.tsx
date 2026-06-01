'use client'

import { ArrowRight, CheckCircle, Mail } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/core/context/LanguageContext'

export default function NewsletterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setEmail('')
  }

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div
          className="relative overflow-hidden rounded-[28px] p-[clamp(40px,6vw,80px)] text-white"
          style={{ background: 'linear-gradient(135deg, #0a0816 0%, #1a0b2e 50%, #2d0e54 100%)' }}
        >
          {/* Orbs */}
          <div className="pointer-events-none absolute -top-20 left-[40%] h-96 w-96 rounded-full bg-halo-pink opacity-40 blur-[80px] animate-float" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-halo-amber opacity-35 blur-[80px] animate-float [animation-delay:2s]" />
          <div className="pointer-events-none absolute top-5 left-10 h-56 w-56 rounded-full bg-halo-violet opacity-35 blur-[80px] animate-float [animation-delay:4s]" />

          <div className="relative z-10 max-w-[600px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em]">
              <Mail size={12} /> {t('home.newsletter.subscribers', { count: '84.210' })}
            </div>

            {/* Headline */}
            <h2 className="font-display text-[clamp(36px,5vw,60px)] font-normal mt-5 leading-[1.05] tracking-[-0.02em]">
              {t('home.newsletter.title')}{' '}
              <span className="bg-[linear-gradient(90deg,#ec4899,#f59e0b)] bg-clip-text text-transparent">
                {t('home.newsletter.title_accent')}
              </span>
            </h2>
            <p className="text-[17px] opacity-75 mt-4 leading-relaxed">
              {t('home.newsletter.sub')}
            </p>

            {/* Form */}
            <form
              onSubmit={submit}
              className="flex mt-8 max-w-[520px] rounded-full border border-white/16 bg-white/8 backdrop-blur-md p-1.5"
            >
              <input
                type="email"
                placeholder={t('home.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none px-5 text-[15px] text-white placeholder:text-white/50"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)' }}
              >
                {sent ? (
                  <><CheckCircle size={14} /> {t('home.newsletter.subscribed')}</>
                ) : (
                  <>{t('home.newsletter.subscribe')} <ArrowRight size={14} /></>
                )}
              </button>
            </form>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 mt-6 text-[12px] opacity-70">
              {[
                t('home.newsletter.trust_1'),
                t('home.newsletter.trust_2'),
                t('home.newsletter.trust_3'),
              ].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <CheckCircle size={12} /> {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
