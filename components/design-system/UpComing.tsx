'use client'

import { useEffect, useState } from 'react'

/* ─── Types ─── */
export interface UpComingProps {
  title: string
  description?: string
  features?: string[]
  launchDate?: Date
  badge?: string
  accentColor?: 'violet' | 'pink' | 'amber' | 'sky' | 'emerald'
}

/* ─── Accent palette ─── */
const ACCENT = {
  violet:  { from: '#6d28d9', to: '#a855f7', dot: '#7c3aed', glow1: 'rgba(124,58,237,0.55)',  glow2: 'rgba(236,72,153,0.3)' },
  pink:    { from: '#9d174d', to: '#f472b6', dot: '#ec4899', glow1: 'rgba(236,72,153,0.55)',  glow2: 'rgba(124,58,237,0.3)' },
  amber:   { from: '#b45309', to: '#fbbf24', dot: '#f59e0b', glow1: 'rgba(245,158,11,0.55)',  glow2: 'rgba(124,58,237,0.25)' },
  sky:     { from: '#0369a1', to: '#38bdf8', dot: '#0ea5e9', glow1: 'rgba(14,165,233,0.55)',  glow2: 'rgba(99,102,241,0.3)' },
  emerald: { from: '#065f46', to: '#34d399', dot: '#10b981', glow1: 'rgba(16,185,129,0.55)', glow2: 'rgba(14,165,233,0.3)' },
} as const

/* ─── Countdown ─── */
function pad(n: number) { return String(n).padStart(2, '0') }

function msToTime(ms: number) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  const total = Math.floor(ms / 1000)
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  }
}

function CountdownBlock({ target }: { target: Date }) {
  const [time, setTime] = useState(() => msToTime(target.getTime() - Date.now()))
  useEffect(() => {
    const id = setInterval(() => setTime(msToTime(target.getTime() - Date.now())), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div className="flex gap-2 sm:gap-3">
      {([['Days', time.d], ['Hours', time.h], ['Mins', time.m], ['Secs', time.s]] as const).map(([label, val]) => (
        <div
          key={label}
          className="w-[66px] h-[74px] sm:w-[82px] sm:h-[90px] flex flex-col items-center justify-center rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm gap-1"
        >
          <span className="font-mono text-[26px] sm:text-[34px] font-bold tabular-nums text-white leading-none">
            {pad(val)}
          </span>
          <span className="text-[9px] tracking-[0.14em] text-white/40 uppercase">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── "In dev" card ─── */
function InDevCard({ from, to }: { from: string; to: string }) {
  const BARS = [75, 52, 88, 35, 61] as const
  return (
    <div className="w-56 rounded-[20px] overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-md shadow-2xl">
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] font-mono text-white/25 tracking-wider">building.tsx</span>
      </div>

      {/* Skeleton rows */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-2.5">
        {BARS.map((w, i) => (
          <div key={i} className="h-2 rounded-full overflow-hidden bg-white/[0.08]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${w}%`,
                background: i === 0 ? `linear-gradient(90deg,${from},${to})` : 'rgba(255,255,255,0.13)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Progress meter */}
      <div className="px-4 pb-4 pt-2 border-t border-white/[0.07]">
        <div className="flex justify-between mb-1.5">
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Progress</span>
          <span className="text-[9px] font-mono font-bold" style={{ color: to }}>68%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full w-[68%] rounded-full"
            style={{ background: `linear-gradient(90deg,${from},${to})` }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Sparkle ─── */
function Sparkle({ top, left, right, bottom, scale = 1, opacity = 0.5 }: {
  top?: number; left?: number; right?: number; bottom?: number; scale?: number; opacity?: number
}) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      className="pointer-events-none absolute"
      style={{ top, left, right, bottom, transform: `scale(${scale})`, opacity }}
    >
      <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2Z" fill="white" />
    </svg>
  )
}

/* ─── Main Component ─── */
export function UpComing({
  title,
  description,
  features = [],
  launchDate,
  badge = 'Coming Soon',
  accentColor = 'violet',
}: UpComingProps) {
  const a = ACCENT[accentColor]

  const words = title.split(' ')
  const head  = words.slice(0, -1).join(' ')
  const last  = words[words.length - 1]

  return (
    <div className="w-full flex items-center justify-center px-3 py-8 min-h-[calc(100vh-12rem)]">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-16"
        style={{ background: 'linear-gradient(145deg, #0c0318 0%, #170924 40%, #2a0844 75%, #3b0a5e 100%)' }}
      >
        {/* ── Background glows ── */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-[380px] w-[380px] rounded-full blur-[100px] animate-float"
          style={{ background: a.glow1 }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-20 h-[280px] w-[280px] rounded-full blur-[90px] animate-float [animation-delay:3s]"
          style={{ background: a.glow2 }}
        />
        <div
          className="pointer-events-none absolute top-1/3 right-1/4 h-[200px] w-[200px] rounded-full blur-[70px] animate-float [animation-delay:1.5s] opacity-35"
          style={{ background: 'rgba(245,158,11,0.28)' }}
        />

        {/* ── Dot grid ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.9) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* ── Decorative gradient ring ── */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-[320px] w-[320px] rounded-full opacity-20"
          style={{
            background: 'none',
            border: `1px solid`,
            borderColor: a.dot,
            boxShadow: `inset 0 0 60px ${a.dot}22`,
          }}
        />

        {/* ── Sparkles ── */}
        <Sparkle top={36} right={88} scale={0.75} opacity={0.55} />
        <Sparkle top={100} right={200} scale={0.4} opacity={0.25} />
        <Sparkle bottom={56} left={72} scale={0.55} opacity={0.3} />
        <Sparkle top={200} left={40} scale={0.35} opacity={0.2} />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

          {/* Left column */}
          <div className="flex-1 min-w-0">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.09] border border-white/[0.12] backdrop-blur-sm px-3.5 py-1.5 mb-7">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: a.dot, boxShadow: `0 0 0 4px ${a.dot}30` }}
              />
              <span className="text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase">
                {badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-[clamp(36px,5vw,62px)] font-normal tracking-[-0.025em] leading-[1.04] text-white mb-5">
              {head && <span>{head} </span>}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(100deg,${a.from},${a.to})` }}
              >
                {last}
              </span>
            </h2>

            {/* Description */}
            {description && (
              <p className="text-[15px] leading-[1.7] text-white/50 max-w-[400px] mb-8">
                {description}
              </p>
            )}

            {/* Feature pills */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-9">
                {features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] border border-white/[0.11] px-3 py-[5px] text-[12px] text-white/60 backdrop-blur-sm"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-white/35" />
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* CTA button */}
            <button
              className="inline-flex items-center gap-2.5 h-11 px-7 rounded-full font-semibold text-[13px] text-white transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
              style={{
                background: `linear-gradient(100deg,${a.from},${a.to})`,
                boxShadow: `0 6px 28px ${a.dot}40`,
              }}
            >
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Notify me when ready
            </button>

            {/* Status line */}
            <div className="flex items-center gap-3 mt-7">
              <span className="h-px w-8 bg-white/15" />
              <span className="text-[11px] text-white/30 font-mono tracking-widest">
                {launchDate
                  ? `ETA ${launchDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                  : 'ACTIVE DEVELOPMENT'}
              </span>
              <span className="h-px flex-1 bg-white/15" />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">
            {launchDate ? (
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase lg:text-right">
                  Launches in
                </span>
                <CountdownBlock target={launchDate} />
              </div>
            ) : (
              <InDevCard from={a.from} to={a.to} />
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
