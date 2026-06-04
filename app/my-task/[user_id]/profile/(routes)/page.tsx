"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/design-system/Icon";
import { Gender, Role } from "@/core/model/User";
import { RootState } from "@/redux/store/store";
import { setUser } from "@/redux/reducer/profileReducer";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useGetInfoFromPath } from "@/hooks/useGetInfoFromPath";
import { useProfile } from "../context/ProfileContext";
import withMyTask from "@/components/forms/withMyTask";
import {
  Reveal, Counter, ProgressRing, GlowCard,
  CardHead, InfoRow, SecHead, Spark, PSwitch,
} from "../components/ProfilePrimitives";

/* ─── Static data ────────────────────────────────────────────── */
const ROLE_LABEL: Record<Role, string> = {
  [Role.Admin]:  "Admin",
  [Role.Seller]: "Seller",
  [Role.User]:   "Member",
};

const ACTIVITIES = [
  { icon: "package"      as const, tint: "bg-grad-ocean",  title: "Order delivered",  meta: "Your recent order arrived",  time: "2 hours ago" },
  { icon: "star"         as const, tint: "bg-grad-lime",   title: "Review submitted", meta: "Left a 5-star review",       time: "Yesterday"   },
  { icon: "shopping_bag" as const, tint: "bg-aurora",      title: "New purchase",     meta: "Checked out successfully",   time: "3 days ago"  },
  { icon: "sparkles"     as const, tint: "bg-grad-sunset", title: "Points earned",    meta: "+120 reward points",         time: "Last week"   },
];

const ACHIEVEMENTS = [
  { ic: "star"         as const, tint: "bg-grad-lime",    title: "Top Reviewer",   meta: "25+ verified reviews" },
  { ic: "package"      as const, tint: "bg-grad-ocean",   title: "Loyal Customer", meta: "12 months active"     },
  { ic: "shield"       as const, tint: "bg-aurora",       title: "Verified",       meta: "ID confirmed"         },
  { ic: "sparkles"     as const, tint: "bg-grad-sunset",  title: "Elite Member",   meta: "Top 10% buyer"        },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function calcCompletion(p: ReturnType<typeof useProfile>): number {
  const fields = [p.name, p.email, p.phone, p.address, p.bio, p.username,
    p.title, p.city, p.country, p.website];
  const filled = fields.filter((f) => String(f ?? "").trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

/* ─── Styles ──────────────────────────────────────────────────── */
const S = {
  wrap:      "max-w-[1180px] mx-auto px-[clamp(16px,3vw,32px)]",
  bento:     "grid grid-cols-12 gap-[clamp(12px,1.4vw,18px)]",
  col3:      "col-span-12 md:col-span-6 xl:col-span-3",
  col4:      "col-span-12 md:col-span-6 xl:col-span-4",
  col5:      "col-span-12 xl:col-span-5",
  col7:      "col-span-12 xl:col-span-7",

  hero:      "relative overflow-hidden rounded-b-[28px] mb-[clamp(56px,6vw,84px)]",
  heroCover: "relative h-[clamp(200px,26vw,300px)] overflow-hidden",
  heroGrain: "absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:4px_4px] mix-blend-overlay opacity-50",
  heroId:    "relative -mt-[68px] px-[clamp(16px,3vw,40px)] pb-[clamp(20px,2vw,28px)] flex items-end gap-[clamp(18px,2.4vw,30px)] z-[2] max-[760px]:flex-col max-[760px]:items-start max-[760px]:-mt-[56px] max-[760px]:gap-4",

  avatarInner: cn(
    "relative z-[1] w-full h-full rounded-[26%] flex items-center justify-center text-white overflow-hidden",
    "bg-aurora border-[4px] border-card",
    "font-display text-[clamp(40px,5vw,58px)] font-normal tracking-[-0.02em]",
    "shadow-[inset_0_2px_12px_rgba(255,255,255,0.25),0_18px_40px_-12px_rgba(124,58,237,0.5)]",
    "transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "group-hover/avatar:scale-[1.04] group-hover/avatar:-rotate-2",
  ),
  avatarStatus: cn(
    "absolute right-2 bottom-2 z-[2] w-[26px] h-[26px] rounded-full",
    "bg-halo-emerald border-[4px] border-card",
    "animate-p-pulse-ring",
  ),

  heroName:    "font-display font-normal text-[clamp(34px,4.6vw,56px)] leading-none tracking-[-0.02em] flex items-center gap-3 flex-wrap",
  verify:      "w-[26px] h-[26px] rounded-full bg-grad-ocean text-white inline-flex items-center justify-center shadow-[0_4px_12px_-3px_rgba(14,165,233,0.6)] flex-shrink-0",
  heroSub:     "flex items-center gap-2.5 flex-wrap mt-2.5 text-muted-foreground text-sm",
  heroHandle:  "font-mono text-[13px] text-halo-soft",
  heroBio:     "mt-[14px] max-w-[56ch] text-muted-foreground text-[15px] leading-[1.6]",
  heroBadges:  "flex flex-wrap gap-2 mt-4",
  heroActions: "flex flex-col gap-3 items-end pb-[6px] max-[760px]:w-full max-[760px]:items-stretch",
  heroStats:   "flex gap-[clamp(14px,2vw,26px)] flex-wrap max-[760px]:justify-start",
  heroStat:    "text-right max-[760px]:text-left",
  statV:       "font-display text-[clamp(20px,2vw,26px)] leading-none tabular-nums",
  statL:       "text-[11px] text-halo-soft uppercase tracking-[0.08em] mt-1",

  chip:        "inline-flex items-center gap-[7px] h-[30px] px-3 rounded-full text-xs font-semibold bg-muted text-foreground border border-border",
  chipGrad:    "inline-flex items-center gap-[7px] h-[30px] px-3 rounded-full text-xs font-semibold bg-aurora text-white border-0 shadow-[0_8px_20px_-8px_rgba(124,58,237,0.6)]",
  chipGhost:   "inline-flex items-center gap-[7px] h-[30px] px-3 rounded-full text-xs font-semibold bg-transparent text-foreground border border-border",
  dotLive:     "w-[7px] h-[7px] rounded-full bg-halo-emerald shadow-[0_0_0_3px_rgba(16,185,129,0.2)]",

  ctaEdit: cn(
    "relative inline-flex items-center justify-center gap-[9px]",
    "h-12 px-6 rounded-full bg-aurora",
    "text-white font-bold text-sm tracking-[-0.01em]",
    "shadow-[0_14px_34px_-10px_rgba(124,58,237,0.6)]",
    "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "animate-p-cta-float",
    "hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_20px_44px_-10px_rgba(124,58,237,0.7)]",
    "active:translate-y-0 active:scale-[0.98]",
  ),

  glassBtn: cn(
    "inline-flex items-center gap-2 h-9 px-[14px] rounded-full",
    "bg-white/16 backdrop-blur-sm border border-white/28",
    "text-white text-xs font-semibold",
    "transition-all duration-200 hover:bg-white/28 hover:-translate-y-px",
  ),

  metricTile: cn(
    "flex flex-col gap-1.5 p-4 rounded-[14px] bg-halo-subtle border border-border h-full",
    "transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "hover:-translate-y-[3px] hover:border-border/60",
  ),
  metricIc: "w-[34px] h-[34px] rounded-[10px] inline-flex items-center justify-center text-white",
  metricV:  "font-display text-[clamp(26px,2.6vw,34px)] leading-none tabular-nums mt-2",
  metricL:  "text-xs text-muted-foreground",

  infoGrid: "grid grid-cols-2 gap-y-0.5 gap-x-6 max-[520px]:grid-cols-1",

  mapCanvas: "relative h-[200px] rounded-[14px] overflow-hidden bg-muted border border-border",
  mapRoute:  "absolute left-[8%] top-[70%] right-[30%] h-0.5 opacity-55 -rotate-[8deg] [background:repeating-linear-gradient(90deg,#7c3aed_0_8px,transparent_8px_16px)]",
  mapPulse:  "absolute left-[58%] top-1/2 w-[18px] h-[18px] rounded-full -translate-x-1/2 -translate-y-1/2 bg-pink-400/40 animate-p-map-ping",
  mapPin:    "absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-full z-[2]",
  pinBody:   "w-[30px] h-[30px] rounded-[50%_50%_50%_0] bg-grad-sunset -rotate-45 shadow-[0_10px_22px_-6px_rgba(236,72,153,0.7)] flex items-center justify-center",
  pinDot:    "w-2.5 h-2.5 rounded-full bg-white rotate-45",
  mapCoords: "absolute left-3 bottom-3 font-mono text-[11px] text-muted-foreground bg-white/70 dark:bg-black/40 backdrop-blur-[8px] px-[9px] py-1 rounded-[6px] border border-white/60 dark:border-white/8",

  addrBlock: "grid grid-cols-2 gap-[14px] mt-4 max-[520px]:grid-cols-1",
  addrMini:  "p-[14px] rounded-[14px] bg-halo-subtle border border-border",
  eyebrow:   "text-[11px] font-semibold tracking-[0.14em] uppercase text-halo-soft",

  feedRow: "flex gap-[14px] py-3 relative [&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:left-4 [&:not(:last-child)]:after:top-[38px] [&:not(:last-child)]:after:bottom-[-12px] [&:not(:last-child)]:after:w-0.5 [&:not(:last-child)]:after:bg-border",
  feedIc:  "w-[34px] h-[34px] rounded-full inline-flex items-center justify-center text-white flex-shrink-0 z-[1] shadow-[0_0_0_4px_hsl(var(--card))]",

  socialGrid: "grid grid-cols-3 gap-3 max-[640px]:grid-cols-2",
  socialCard: cn(
    "relative flex flex-col gap-2.5 p-4 rounded-[14px] bg-halo-subtle border border-border overflow-hidden",
    "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    "hover:-translate-y-1 hover:shadow-md hover:border-border/60",
    "group",
  ),
  scIc:     "w-[38px] h-[38px] rounded-[10px] inline-flex items-center justify-center text-white font-bold text-[15px]",
  scHandle: "text-[13px] font-semibold",
  scMeta:   "text-[11px] text-halo-soft",
  scArrow:  "absolute top-[14px] right-[14px] text-halo-soft opacity-0 translate-x-[-4px] translate-y-[4px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300",

  prefRow: "flex items-center gap-[14px] py-[14px] border-b border-border last:border-b-0",
  prefIc:  "w-9 h-9 rounded-[10px] bg-muted text-muted-foreground inline-flex items-center justify-center flex-shrink-0",
  prefT:   "text-sm font-semibold",
  prefD:   "text-xs text-halo-soft mt-px",
};

/* ─── Page ───────────────────────────────────────────────────── */
const ProfilePage = () => {
  const profile = useProfile();
  const { t }   = useLanguage();
  const router  = useRouter();
  const { userId } = useGetInfoFromPath();
  const profileState = useSelector((state: RootState) => state.profile);
  const { setBreadcrumb } = useBreadcrumb();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profileState._id) dispatch(setUser(profile as Parameters<typeof setUser>[0]));
  }, [profile, dispatch, profileState._id]);

  useEffect(() => {
    setBreadcrumb([{ label: t("module.profile") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const P          = profileState._id ? profileState : profile;
  const initials   = getInitials(P.name || "U");
  const completion = calcCompletion(profile);

  const avatarSrc = P.avatar
    ? P.avatar
    : P.gender === Gender.Female ? "/images/female-avatar.jpg" : "/images/male-avatar.jpg";

  const joinedDate = (P as { createdAt?: string }).createdAt
    ? dayjs((P as { createdAt?: string }).createdAt).format("MMM YYYY")
    : "";

  const socials = [
    P.website  && { key: "web", ic: "🌐", handle: P.website,   label: "Website",   meta: "Personal site",   tint: "bg-grad-ocean"  },
    P.linkedin && { key: "li",  ic: "in", handle: P.linkedin,  label: "LinkedIn",  meta: "Professional",    tint: "bg-grad-ocean"  },
    P.github   && { key: "gh",  ic: "{}",handle: P.github,     label: "GitHub",    meta: "Open source",     tint: "bg-[#1a1626]"   },
    P.twitter  && { key: "tw",  ic: "𝕏", handle: P.twitter,   label: "X",         meta: "Social",          tint: "bg-[#1a1626]"   },
    P.instagram&& { key: "ig",  ic: "◎", handle: P.instagram,  label: "Instagram", meta: "Photos",          tint: "bg-grad-sunset" },
    P.facebook && { key: "fb",  ic: "f", handle: P.facebook,   label: "Facebook",  meta: "Social",          tint: "bg-grad-ocean"  },
  ].filter(Boolean) as { key: string; ic: string; handle: string; label: string; meta: string; tint: string }[];

  const goEdit = () => router.push(`/my-task/${userId}/profile/edit`);

  return (
    <div className="pb-[clamp(48px,6vw,96px)]">

      {/* ══ HERO ══ */}
      <section className={S.hero}>
        {/* Cover */}
        <div
          className={S.heroCover}
          style={{
            background: "radial-gradient(120% 140% at 10% 10%,rgba(124,58,237,0.9),transparent 50%),radial-gradient(120% 160% at 85% 0%,rgba(236,72,153,0.85),transparent 55%),radial-gradient(140% 180% at 60% 120%,rgba(245,158,11,0.8),transparent 60%),linear-gradient(135deg,#2a0f4d,#4a103f 60%,#5a2a08)",
          }}
        >
          {/* Floating orbs */}
          {[
            { w:260, h:260, bg:"#a855f7", t:"-80px", l:"12%",   o:0.55, dur:"12s"  },
            { w:220, h:220, bg:"#f59e0b", b:"-120px",r:"16%",   o:0.45, dur:"9s", rev:true },
            { w:180, h:180, bg:"#ec4899", t:"30%",   l:"60%",   o:0.4,  dur:"14s" },
          ].map((orb, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute rounded-full animate-float pointer-events-none"
              style={{
                width: orb.w, height: orb.h,
                background: orb.bg,
                top: orb.t, bottom: (orb as { b?: string }).b,
                left: orb.l, right: (orb as { r?: string }).r,
                opacity: orb.o,
                filter: "blur(60px)",
                animationDuration: orb.dur,
                animationDirection: (orb as { rev?: boolean }).rev ? "reverse" : "normal",
              }}
            />
          ))}
          <div aria-hidden className={S.heroGrain} />
          <div aria-hidden className="hero-sheen" />
          <div className="absolute top-4 right-4 flex gap-2 z-[3]">
            <button className={S.glassBtn} onClick={goEdit}>
              <Icon name="sparkles" size={14} /> Edit profile
            </button>
            <button className={cn(S.glassBtn, "w-9 px-0 justify-center")} aria-label="Share">
              <Icon name="send" size={14} />
            </button>
          </div>
        </div>

        {/* Identity row */}
        <div className={S.heroId}>
          {/* Avatar */}
          <div className="avatar-frame group/avatar">
            <div className={S.avatarInner}>
              {P.avatar
                ? <Image src={avatarSrc} alt={P.name} width={156} height={156} className="w-full h-full object-cover" priority />
                : initials
              }
            </div>
            <span className={S.avatarStatus} title="Online" />
          </div>

          {/* Meta */}
          <div className="flex-1 min-w-0 pb-[6px]">
            <h1 className={S.heroName}>
              {P.name || "Your Name"}
              <span className={S.verify} title="Verified"><Icon name="check" size={15} strokeWidth={3} /></span>
            </h1>
            <div className={S.heroSub}>
              {P.username && <span className={S.heroHandle}>@{P.username}</span>}
              {P.username && <span className="text-halo-soft">·</span>}
              {P.title    && <span>{P.title}</span>}
              {P.title    && <span className="text-halo-soft">·</span>}
              <span>{ROLE_LABEL[P.role as Role] ?? "Member"}</span>
            </div>
            {P.bio && <p className={S.heroBio}>{P.bio}</p>}
            <div className={S.heroBadges}>
              <span className={S.chipGrad}><Icon name="sparkles" size={13} /> {ROLE_LABEL[P.role as Role]}</span>
              <span className={S.chipGhost}><span className={S.dotLive} /> Online now</span>
              {(P.city || P.country) && (
                <span className={S.chipGhost}><Icon name="map_pin" size={13} /> {[P.city, P.country].filter(Boolean).join(", ")}</span>
              )}
              {joinedDate && (
                <span className={S.chipGhost}><Icon name="bell" size={13} /> Joined {joinedDate}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className={S.heroActions}>
            <button className={S.ctaEdit} onClick={goEdit}>
              <Icon name="sparkles" size={16} /> Edit profile
            </button>
            <div className={S.heroStats}>
              {[
                { v: 0,          l: "Orders"   },
                { v: 0,          l: "Reviews"  },
                { v: completion, l: "Complete", suffix: "%" },
              ].map(({ v, l, suffix }) => (
                <div key={l} className={S.heroStat}>
                  <div className={S.statV}><Counter value={v} suffix={suffix} format={false} /></div>
                  <div className={S.statL}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT ══ */}
      <div className={S.wrap}>

        {/* Metrics */}
        <SecHead
          kicker="Activity & insights"
          title={`The numbers behind ${P.name?.split(" ")[0] || "you"}`}
          desc="A living snapshot of everything earned, saved, and shipped."
        />
        <div className={S.bento}>
          {[
            { c: S.col3, l: "Total orders",    v: 0, ic: "package"      as const, tint: "bg-grad-ocean",  spark: [30,45,38,60,52,70,65,82], col: "#0ea5e9" },
            { c: S.col3, l: "Lifetime spend",  v: 0, ic: "shopping_bag" as const, tint: "bg-aurora",      spark: [40,42,55,50,68,72,80,90], col: "#7c3aed" },
            { c: S.col3, l: "Reward points",   v: 0, ic: "sparkles"     as const, tint: "bg-grad-sunset", spark: [20,35,30,48,55,60,75,88], col: "#ec4899" },
            { c: S.col3, l: "Reviews written", v: 0, ic: "star"         as const, tint: "bg-grad-lime",   spark: [50,48,60,58,72,68,85,92], col: "#10b981" },
          ].map((m, i) => (
            <Reveal key={m.l} className={m.c} delay={i * 70}>
              <div className={S.metricTile}>
                <span className={cn(S.metricIc, m.tint)}><Icon name={m.ic} size={17} /></span>
                <div className={S.metricV}><Counter value={m.v} /></div>
                <div className={S.metricL}>{m.l}</div>
                <Spark data={m.spark} color={m.col} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Personal + Location */}
        <SecHead kicker="Personal information" title="Who you are" desc="Contact, identity, and the essentials." />
        <div className={S.bento}>
          <Reveal className={S.col7}>
            <GlowCard style={{ height: "100%" }}>
              <CardHead icon="user" title="Personal details" tint="linear-gradient(135deg,#7c3aed,#ec4899,#f59e0b)"
                action={
                  <button className={S.chipGhost} style={{ height: 26, fontSize: 12, cursor: "pointer" }} onClick={goEdit}>
                    <Icon name="sparkles" size={12} /> Edit
                  </button>
                }
              />
              <div className={S.infoGrid}>
                <InfoRow icon="user"    label="Full name"        value={P.name} />
                <InfoRow icon="bell"    label="Date of birth"    value={P.birthdate ? dayjs(P.birthdate).format("D MMM YYYY") : ""} />
                <InfoRow icon="user"    label="Gender"           value={P.gender ? P.gender.charAt(0).toUpperCase() + P.gender.slice(1) : ""} />
                <InfoRow icon="globe"   label="Nationality"      value={P.nationality ?? ""} />
                <InfoRow icon="mail"    label="Email"            value={P.email} mono />
                <InfoRow icon="phone"   label="Phone"            value={P.phone} mono />
                {P.phone2    && <InfoRow icon="phone"  label="Secondary"       value={P.phone2} mono />}
                {P.emergency && <InfoRow icon="shield" label="Emergency"       value={P.emergency} />}
                {(P.languages ?? []).length > 0 && <InfoRow icon="chat" label="Languages" value={(P.languages ?? []).join(", ")} />}
                {P.timezone  && <InfoRow icon="globe"  label="Timezone"        value={P.timezone} />}
              </div>
            </GlowCard>
          </Reveal>

          <Reveal className={S.col5} delay={90}>
            <GlowCard style={{ height: "100%" }}>
              <CardHead icon="map_pin" title="Location" tint="linear-gradient(135deg,#ec4899,#f97316)"
                action={<span className={S.chipGhost} style={{ height: 26 }}>{P.country || "—"}</span>}
              />
              <div className={S.mapCanvas}>
                <div className="map-grid" />
                <div className={S.mapRoute} />
                <div className={S.mapPulse} />
                <div className={S.mapPin}><div className={S.pinBody}><div className={S.pinDot} /></div></div>
                <div className={S.mapCoords}>{P.city && P.country ? `${P.city}, ${P.country}` : "—, —"}</div>
              </div>
              <div className={S.addrBlock}>
                <div className={S.addrMini}>
                  <div className={cn(S.eyebrow, "mb-1.5")}>Address</div>
                  <div className="text-[13px] text-muted-foreground whitespace-pre-line leading-[1.5]">
                    {[P.address, P.district, P.city, P.state, P.postal, P.country].filter(Boolean).join("\n") || "—"}
                  </div>
                </div>
                <div className={S.addrMini}>
                  <div className={cn(S.eyebrow, "mb-1.5")}>Region</div>
                  <div className="text-[13px] text-muted-foreground leading-[1.5]">
                    {P.city || "City"}<br />{P.state || "State"}<br />{P.country || "Country"}
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* Account health + Activity */}
        <SecHead kicker="Account & security" title="Status & standing" desc="Membership, completion, and account health." />
        <div className={S.bento}>
          <Reveal className={S.col5}>
            <GlowCard style={{ height: "100%" }}>
              <CardHead icon="shield" title="Account health" tint="linear-gradient(135deg,#84cc16,#10b981)" />
              <div className="flex gap-[18px] items-center justify-around flex-wrap py-[6px] pb-[14px]">
                <ProgressRing value={completion} size={120} cap="Complete" colors={["#7c3aed","#ec4899","#f59e0b"]} />
                <ProgressRing value={80}         size={120} cap="Security" colors={["#84cc16","#10b981"]} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { l: "Status", v: <span className="flex items-center gap-[7px]"><span className={S.dotLive} /> Active</span> },
                  { l: "Role",   v: ROLE_LABEL[P.role as Role] },
                ].map(({ l, v }) => (
                  <div key={l} className={S.addrMini}>
                    <div className="text-[11px] text-halo-soft uppercase tracking-[0.06em]">{l}</div>
                    <div className="mt-1 font-semibold text-sm">{v}</div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>

          <Reveal className={S.col4} delay={80}>
            <GlowCard glow={false} style={{ height: "100%" }}>
              <CardHead icon="info" title="Account" tint="linear-gradient(135deg,#0ea5e9,#6366f1)" />
              <div className="flex flex-col">
                <InfoRow icon="command" label="User ID"    value={P._id.slice(-8).toUpperCase()} mono />
                <InfoRow icon="sparkles" label="Membership" value={ROLE_LABEL[P.role as Role]} />
                <InfoRow icon="mail"   label="Email"      value={P.email} mono />
                <InfoRow icon="bell"   label="Birthday"   value={P.birthdate ? dayjs(P.birthdate).format("DD MMM YYYY") : "—"} />
              </div>
            </GlowCard>
          </Reveal>

          <Reveal className={S.col3} delay={150}>
            <GlowCard style={{ height: "100%" }}>
              <CardHead icon="zap" title="Recent activity" tint="linear-gradient(135deg,#7c3aed,#ec4899,#f59e0b)"
                action={<span className={S.chipGhost} style={{ height: 26 }}>Live</span>}
              />
              <div>
                {ACTIVITIES.map((a, i) => (
                  <div className={S.feedRow} key={i}>
                    <span className={cn(S.feedIc, a.tint)}><Icon name={a.icon} size={15} /></span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold tracking-[-0.01em]">{a.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{a.meta}</div>
                      <div className="text-[11px] text-halo-soft mt-[3px]">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* Social */}
        {socials.length > 0 && (
          <>
            <SecHead kicker="Social & online presence" title="Find me elsewhere" desc="Every channel, linked and verified." />
            <Reveal>
              <GlowCard glow={false}>
                <div className={S.socialGrid}>
                  {socials.map((s) => (
                    <a key={s.key} className={S.socialCard} href={`https://${s.handle}`} target="_blank" rel="noopener noreferrer">
                      <span className={cn(S.scIc, s.tint)}>{s.ic}</span>
                      <div>
                        <div className={S.scHandle}>{s.handle}</div>
                        <div className={S.scMeta}>{s.label} · {s.meta}</div>
                      </div>
                      <span className={S.scArrow}><Icon name="arrow_up_right" size={16} /></span>
                    </a>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          </>
        )}

        {/* Preferences + Achievements */}
        <SecHead kicker="Preferences & highlights" title="Tuned to taste" desc="How the platform behaves for you." />
        <div className={S.bento}>
          <Reveal className={S.col7}>
            <GlowCard glow={false} style={{ height: "100%" }}>
              <CardHead icon="shield" title="Preferences" tint="linear-gradient(135deg,#0ea5e9,#6366f1)"
                action={
                  <button className={S.chipGhost} style={{ height: 26, cursor: "pointer" }} onClick={goEdit}>
                    <Icon name="sparkles" size={12} /> Manage
                  </button>
                }
              />
              {([
                { icon: "bell"     as const, title: "Order updates",  desc: "Shipping, delivery & returns", key: "orderUpdates"    },
                { icon: "sparkles" as const, title: "Product news",   desc: "New drops & restocks",         key: "productNews"     },
                { icon: "mail"     as const, title: "Marketing emails",desc:"Editorials & offers",          key: "marketingEmails" },
                { icon: "eye"      as const, title: "Public profile", desc: "Anyone can view your showcase",key: "publicProfile"   },
                { icon: "zap"      as const, title: "Show activity",  desc: "Display recent orders",        key: "showActivity"    },
                { icon: "search"   as const, title: "Searchable",     desc: "Appear in member directory",   key: "searchable"      },
              ] as { icon: Parameters<typeof Icon>[0]["name"]; title: string; desc: string; key: keyof NonNullable<typeof P.preferences> }[]).map(({ icon, title, desc, key }) => (
                <div className={S.prefRow} key={key}>
                  <span className={S.prefIc}><Icon name={icon} size={16} /></span>
                  <div className="flex-1 min-w-0">
                    <div className={S.prefT}>{title}</div>
                    <div className={S.prefD}>{desc}</div>
                  </div>
                  <PSwitch on={Boolean(P.preferences?.[key])} />
                </div>
              ))}
            </GlowCard>
          </Reveal>

          <Reveal className={S.col5} delay={90}>
            <GlowCard glow={false} style={{ height: "100%" }}>
              <CardHead icon="sparkles" title="Achievements" tint="linear-gradient(135deg,#ec4899,#f97316)" />
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} className={cn(S.addrMini, "flex flex-col gap-2")}>
                    <span className={cn(S.metricIc, a.tint, "w-[34px] h-[34px]")}><Icon name={a.ic} size={16} /></span>
                    <div className="text-[13px] font-bold tracking-[-0.01em]">{a.title}</div>
                    <div className="text-[11px] text-halo-soft">{a.meta}</div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* CTA strip */}
        <Reveal>
          <div
            className="relative rounded-[20px] mt-[clamp(32px,4vw,48px)] p-[clamp(24px,3vw,40px)] overflow-hidden text-white"
            style={{ background: "linear-gradient(135deg,#1a0b2e,#2d0a4e 60%,#3a1208)" }}
          >
            <div aria-hidden className="absolute w-[240px] h-[240px] rounded-full blur-[60px] bg-pink-400 top-[-100px] right-[10%] opacity-40" />
            <div aria-hidden className="absolute w-[200px] h-[200px] rounded-full blur-[60px] bg-amber-400 bottom-[-120px] left-[20%] opacity-35" />
            <div className="relative flex items-center justify-between gap-6 flex-wrap">
              <div>
                <div className={cn(S.eyebrow, "!text-white/60")}>Your profile is {completion}% complete</div>
                <h3 className="font-display text-[clamp(24px,3vw,34px)] font-normal mt-2 text-white">
                  Make it unmistakably you.
                </h3>
                <p className="text-white/70 mt-1.5 text-sm max-w-[46ch]">
                  Add a few missing details and let the world see who you really are.
                </p>
              </div>
              <button
                className={cn(S.ctaEdit, "!animate-none h-12")}
                onClick={goEdit}
              >
                <Icon name="sparkles" size={16} /> Edit profile
              </button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default withMyTask(ProfilePage);
