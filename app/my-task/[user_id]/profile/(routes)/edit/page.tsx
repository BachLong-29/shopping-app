"use client";

import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/design-system/Icon";
import { Gender, UserInfo, UserPreferences } from "@/core/model/User";
import { RootState } from "@/redux/store/store";
import { setUser, updateUser } from "@/redux/reducer/profileReducer";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProfile } from "../../context/ProfileContext";
import { useGetInfoFromPath } from "@/hooks/useGetInfoFromPath";
import profileService from "../../services/profileService";
import withMyTask from "@/components/forms/withMyTask";
import { ProgressRing, Counter } from "../../components/ProfilePrimitives";

export type UserFormData = Omit<UserInfo, "_id" | "role">;

/* ─── Static config ──────────────────────────────────────────── */
const SECTIONS = [
  { id: "personal", label: "Personal",    icon: "user"    as const, tint: "bg-aurora",      desc: "Identity & bio"      },
  { id: "contact",  label: "Contact",     icon: "mail"    as const, tint: "bg-grad-ocean",  desc: "Email & phone"       },
  { id: "address",  label: "Address",     icon: "map_pin" as const, tint: "bg-grad-sunset", desc: "Where you are"       },
  { id: "social",   label: "Social",      icon: "globe"   as const, tint: "bg-grad-lime",   desc: "Online presence"     },
  { id: "prefs",    label: "Preferences", icon: "shield"  as const, tint: "bg-grad-violet", desc: "How the app behaves" },
];

const ALL_LANGS = ["English", "Vietnamese", "French", "German", "Spanish", "Chinese", "Japanese", "Arabic"];

/* ─── Styles ──────────────────────────────────────────────────── */
const S = {
  wrap: "max-w-[1180px] mx-auto px-[clamp(16px,3vw,32px)] pt-7 pb-[clamp(48px,6vw,96px)]",

  eyebrow: "text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground",

  chip: "inline-flex items-center gap-[7px] h-[30px] px-3 rounded-full text-xs font-semibold bg-muted text-foreground border border-border",
  chipGhost: "inline-flex items-center gap-[7px] h-[30px] px-3 rounded-full text-xs font-semibold bg-transparent text-foreground border border-border",

  editShell: "grid grid-cols-[248px_1fr] gap-[clamp(20px,3vw,40px)] items-start max-[940px]:grid-cols-1",
  editNav:   "sticky top-[84px] flex flex-col gap-1 max-[940px]:hidden",
  enProg:    "flex items-center gap-[14px] mb-[18px] p-4 rounded-[14px] bg-card border border-border",

  navItem: (active: boolean) => cn(
    "flex items-center gap-3 px-3 py-[9px] rounded-[10px] text-[13px] font-medium w-full text-left",
    "transition-all duration-200",
    active
      ? "bg-muted text-foreground font-semibold"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  ),
  navNum: (active: boolean) => cn(
    "w-[22px] h-[22px] rounded-full inline-flex items-center justify-center text-[11px] font-bold flex-shrink-0 border",
    active
      ? "bg-aurora text-white border-transparent"
      : "bg-muted text-muted-foreground border-border"
  ),

  section:     "scroll-mt-[84px] mb-[clamp(20px,2.4vw,30px)]",
  sectionHead: "flex items-center gap-3 mb-5",
  sectionIc:   "w-[38px] h-[38px] rounded-[10px] text-white inline-flex items-center justify-center flex-shrink-0",

  card: "bg-card border border-border rounded-[20px] p-[clamp(18px,1.8vw,24px)]",

  formGrid: "grid grid-cols-2 gap-4 max-[560px]:grid-cols-1",

  uploadCover: cn(
    "relative h-[150px] rounded-[14px] overflow-hidden border border-dashed border-border",
    "flex items-center justify-center cursor-pointer",
    "[background:radial-gradient(120%_140%_at_10%_10%,rgba(124,58,237,0.7),transparent_50%),radial-gradient(120%_160%_at_85%_0%,rgba(236,72,153,0.6),transparent_55%),linear-gradient(135deg,#2a0f4d,#5a2a08)]"
  ),
  uploadBtn: "inline-flex items-center gap-2 h-[38px] px-4 rounded-full bg-white/18 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold transition-all hover:bg-white/30",
  uploadAvRow: "flex items-center gap-[18px] -mt-[52px] pl-[18px] relative z-[2]",
  uploadAv: cn(
    "w-24 h-24 rounded-[26%] flex-shrink-0 bg-aurora text-white",
    "border-[4px] border-card flex items-center justify-center",
    "font-display text-[38px] shadow-md relative overflow-hidden group/av"
  ),
  uploadAvCam: "absolute inset-0 bg-black/45 flex items-center justify-center text-white opacity-0 group-hover/av:opacity-100 transition-opacity",

  chipSelect: "flex flex-wrap gap-2",

  savebar: cn(
    "sticky bottom-4 z-40 mt-6 flex items-center gap-[14px] justify-between flex-wrap",
    "px-5 py-[14px] rounded-[20px]",
    "bg-white/70 dark:bg-[#11101A]/60 backdrop-blur-xl backdrop-saturate-150",
    "border border-white/60 dark:border-white/10 shadow-lg"
  ),

  ctaEdit: cn(
    "inline-flex items-center justify-center gap-[9px] h-11 px-6 rounded-full",
    "bg-aurora text-white font-bold text-sm tracking-[-0.01em]",
    "shadow-[0_14px_34px_-10px_rgba(124,58,237,0.6)]",
    "transition-[transform,box-shadow,opacity] duration-300",
    "hover:-translate-y-0.5 hover:scale-[1.02]",
    "active:translate-y-0 active:scale-[0.98]",
  ),
};

/* ─── FF — Floating label field ──────────────────────────────── */
interface FFProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  help?: string;
  ok?: boolean;
  err?: boolean;
  affix?: React.ReactNode;
  hint?: string;
  required?: boolean;
  textarea?: boolean;
  span?: boolean;
}

function FF({ label, value, onChange, type = "text", help, ok, err, affix, hint, required, textarea, span }: FFProps) {
  const inputCls = cn(
    "peer w-full h-14 px-[14px] pt-[22px] pb-2 rounded-[10px] bg-card font-medium text-sm",
    "placeholder:text-transparent transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus:ring-[3px] focus:ring-halo-violet/15 focus:border-halo-violet",
    ok  ? "border border-halo-emerald"
      : err ? "border border-halo-rose"
      : "border border-border",
  );
  const labelCls = cn(
    "absolute left-[14px] top-[17px] text-sm font-medium pointer-events-none",
    "transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    "peer-focus:top-[9px] peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-[0.02em]",
    "peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:text-[11px]",
    "peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-[0.02em]",
    ok  ? "text-halo-emerald peer-focus:text-halo-emerald peer-[:not(:placeholder-shown)]:text-halo-emerald"
      : err ? "text-halo-rose peer-focus:text-halo-rose peer-[:not(:placeholder-shown)]:text-halo-rose"
      : "text-muted-foreground peer-focus:text-halo-violet peer-[:not(:placeholder-shown)]:text-halo-violet",
  );

  return (
    <div className={cn("relative", span && "col-span-2 max-[560px]:col-span-1")}>
      {textarea ? (
        <textarea
          id={label} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className={cn(inputCls, "h-auto min-h-[96px] !pt-[26px] resize-y leading-[1.5]")}
        />
      ) : (
        <input
          id={label} type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder=" " autoComplete="off"
          className={inputCls}
        />
      )}
      <label htmlFor={label} className={labelCls}>
        {label}{required && <span className="text-halo-rose"> *</span>}
      </label>
      {affix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">{affix}</span>
      )}
      {(help || hint) && (
        <div className={cn(
          "flex items-center gap-1.5 text-[11px] mt-1.5 pl-0.5",
          ok ? "text-halo-emerald" : err ? "text-halo-rose" : "text-muted-foreground"
        )}>
          {ok  && <Icon name="check" size={12} />}
          {err && <Icon name="alert" size={12} />}
          {!ok && !err && hint && <Icon name="info" size={12} />}
          {help || hint}
        </div>
      )}
    </div>
  );
}

/* ─── FFSelect — Select with always-shown label ─────────────── */
interface FFSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  span?: boolean;
}

function FFSelect({ label, value, onChange, options, span }: FFSelectProps) {
  return (
    <div className={cn("relative", span && "col-span-2 max-[560px]:col-span-1")}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-14 px-[14px] pt-[22px] pb-2 rounded-[10px] bg-card border border-border",
          "text-sm font-medium appearance-none cursor-pointer",
          "focus:outline-none focus:border-halo-violet focus:ring-[3px] focus:ring-halo-violet/15",
          "transition-[border-color,box-shadow] duration-200",
          "[background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%238A8295' stroke-width='1.6' stroke-linecap='round' d='M1 1.5 6 6.5 11 1.5'/></svg>\")] [background-repeat:no-repeat] [background-position:right_14px_center]",
        )}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <label className="absolute left-[14px] top-[9px] text-[11px] font-semibold text-halo-violet tracking-[0.02em] pointer-events-none">
        {label}
      </label>
    </div>
  );
}

/* ─── ETog — Preference toggle row ──────────────────────────── */
interface ETog {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  desc: string;
  on?: boolean;
  onChange?: (v: boolean) => void;
}

function ETog({ icon, title, desc, on: initial = false, onChange }: ETog) {
  const [on, setOn] = useState(!!initial);
  const toggle = () => setOn((o) => { const next = !o; onChange?.(next); return next; });
  return (
    <div className="flex items-center gap-[14px] py-[14px] border-b border-border last:border-b-0">
      <span className="w-9 h-9 rounded-[10px] bg-muted text-muted-foreground inline-flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mt-px">{desc}</div>
      </div>
      <button
        className={cn(
          "relative w-11 h-[26px] rounded-full border flex-shrink-0 cursor-pointer",
          "transition-all duration-[250ms]",
          on ? "bg-halo-violet border-halo-violet" : "bg-muted border-border"
        )}
        onClick={toggle} role="switch" aria-checked={on} type="button"
      >
        <span className={cn(
          "absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm",
          "transition-transform duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          on && "translate-x-[18px]"
        )} />
      </button>
    </div>
  );
}

/* ─── Form state type ────────────────────────────────────────── */
type FormState = {
  name: string; email: string; phone: string; address: string;
  gender: Gender; birthdate: string; avatar: string;
  bio: string; username: string; title: string; nationality: string;
  phone2: string; emergency: string; languages: string[]; timezone: string;
  district: string; state: string; city: string; postal: string; country: string;
  website: string; linkedin: string; github: string; twitter: string;
  instagram: string; facebook: string;
  preferences: UserPreferences;
};

/* ─── Page ───────────────────────────────────────────────────── */
const EditPage = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { user_id: userId } = use(params);
  const profile     = useProfile();
  const { t }       = useLanguage();
  const router      = useRouter();
  const dispatch    = useDispatch();
  const { setBreadcrumb }  = useBreadcrumb();
  const profileState       = useSelector((s: RootState) => s.profile);
  const { userId: pathId } = useGetInfoFromPath();

  const P = profileState._id ? profileState : profile;

  const [loading, setLoading] = useState(false);
  const [active,  setActive]  = useState("personal");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const [f, setF] = useState<FormState>({
    name:        P.name        ?? "",
    email:       P.email       ?? "",
    phone:       P.phone       ?? "",
    address:     P.address     ?? "",
    gender:      (P.gender as Gender) ?? Gender.Male,
    birthdate:   P.birthdate ? new Date(P.birthdate).toISOString().split("T")[0] : "",
    avatar:      P.avatar      ?? "",
    bio:         P.bio         ?? "",
    username:    P.username    ?? "",
    title:       P.title       ?? "",
    nationality: P.nationality ?? "",
    phone2:      P.phone2      ?? "",
    emergency:   P.emergency   ?? "",
    languages:   P.languages   ?? [],
    timezone:    P.timezone    ?? "",
    district:    P.district    ?? "",
    state:       P.state       ?? "",
    city:        P.city        ?? "",
    postal:      P.postal      ?? "",
    country:     P.country     ?? "",
    website:     P.website     ?? "",
    linkedin:    P.linkedin    ?? "",
    github:      P.github      ?? "",
    twitter:     P.twitter     ?? "",
    instagram:   P.instagram   ?? "",
    facebook:    P.facebook    ?? "",
    preferences: P.preferences ?? {
      theme: "System", language: "English",
      orderUpdates: true, productNews: true, marketingEmails: false,
      publicProfile: true, showActivity: false, searchable: true,
    },
  });

  const set  = (k: keyof FormState) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const setP = (k: keyof UserPreferences) => (v: boolean) =>
    setF((p) => ({ ...p, preferences: { ...p.preferences, [k]: v } }));
  const toggleLang = (l: string) =>
    setF((p) => ({
      ...p,
      languages: p.languages.includes(l) ? p.languages.filter((x) => x !== l) : [...p.languages, l],
    }));

  const tracked = ["name","username","title","bio","email","phone","country","city","postal","address","website"] as (keyof FormState)[];
  const filled  = tracked.filter((k) => String(f[k] ?? "").trim().length > 0).length;
  const completion = Math.round((filled / tracked.length) * 100);

  const emailOk = /.+@.+\..+/.test(f.email);
  const userOk  = f.username.length === 0 || f.username.length >= 3;

  useEffect(() => {
    setBreadcrumb([
      { label: t("module.profile"), href: `/my-task/${userId}/profile` },
      { label: t("breadcrumb.edit_profile") },
    ]);
    if (!profileState._id) dispatch(setUser(profile as Parameters<typeof setUser>[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => { const el = refs.current[s.id]; if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const el = refs.current[id];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  const onSave = async () => {
    setLoading(true);
    try {
      await profileService.editUserProfile({ id: userId, ...f, birthdate: f.birthdate as unknown as Date });
      dispatch(updateUser({ ...f, _id: userId, birthdate: f.birthdate, role: P.role }));
      toast.success("Profile updated", { description: "Your changes are now live." });
      setTimeout(() => router.push(`/my-task/${pathId}/profile`), 1200);
    } catch {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={S.wrap}>

      {/* Page header */}
      <div className="flex items-end justify-between gap-5 flex-wrap mb-7">
        <div>
          <button type="button" onClick={() => router.back()} className={cn(S.chipGhost, "mb-3 cursor-pointer")}>
            <Icon name="chevron_left" size={14} /> Back to profile
          </button>
          <div className={cn(S.eyebrow, "mb-2")}>Edit profile</div>
          <h1 className="font-display text-[clamp(30px,4vw,46px)] font-normal leading-none tracking-[-0.02em]">
            Refine your identity
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Five quick sections. Preview before saving.
          </p>
        </div>
      </div>

      <div className={S.editShell}>

        {/* ── Sticky nav ── */}
        <aside className={S.editNav}>
          <div className={S.enProg}>
            <ProgressRing value={completion} size={64} stroke={7} cap="" colors={["#7c3aed","#ec4899","#f59e0b"]}>
              <span className="text-base font-bold tabular-nums">
                <Counter value={completion} suffix="%" format={false} />
              </span>
            </ProgressRing>
            <div>
              <div className="text-[13px] font-bold">Profile {completion}%</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{filled} of {tracked.length} key fields</div>
            </div>
          </div>
          {SECTIONS.map((s, i) => (
            <button key={s.id} type="button" className={S.navItem(active === s.id)} onClick={() => jumpTo(s.id)}>
              <span className={S.navNum(active === s.id)}>{i + 1}</span>
              <span className="flex-1">{s.label}</span>
              {active === s.id && <Icon name="chevron_right" size={14} />}
            </button>
          ))}
          <div className="mt-2 px-3 py-[14px] text-[11px] text-muted-foreground leading-[1.5]">
            <Icon name="info" size={12} className="inline-block align-[-2px] mr-1" />
            Nothing is public until you save.
          </div>
        </aside>

        {/* ── Form ── */}
        <div>

          {/* PERSONAL */}
          <section className={S.section} id="personal" ref={(el) => { refs.current.personal = el; }}>
            <div className={S.sectionHead}>
              <span className={cn(S.sectionIc, SECTIONS[0].tint)}><Icon name="user" size={18} /></span>
              <div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">Personal</h3>
                <p className="text-xs text-muted-foreground mt-px">Your avatar, name, and the story up top.</p>
              </div>
            </div>

            {/* Avatar/cover upload */}
            <div className={cn(S.card, "mb-4")}>
              <div className={S.uploadCover}>
                <span className={S.uploadBtn}><Icon name="image" size={14} /> Change cover image</span>
              </div>
              <div className={S.uploadAvRow}>
                <div className={S.uploadAv}>
                  {f.name ? f.name.slice(0, 2).toUpperCase() : "?"}
                  <span className={S.uploadAvCam}><Icon name="image" size={18} /></span>
                </div>
                <div className="mt-[52px]">
                  <div className="text-sm font-bold">Profile photo</div>
                  <div className="text-xs text-muted-foreground mt-0.5 mb-2">PNG or JPG, at least 400×400px.</div>
                  <FF label="Avatar URL" value={f.avatar} onChange={set("avatar")} hint="Paste a direct image URL" />
                </div>
              </div>
            </div>

            <div className={S.card}>
              <div className={S.formGrid}>
                <FF label="Full name"           value={f.name}        onChange={set("name")}        required ok={f.name.length > 2} />
                <FF label="Username"            value={f.username}    onChange={set("username")}
                  ok={f.username.length > 0 && userOk}
                  err={f.username.length > 0 && !userOk}
                  affix={userOk && f.username.length > 0 ? <Icon name="check" size={15} className="text-halo-emerald" /> : null}
                  help={f.username.length > 0 ? (userOk ? `@${f.username}` : "Min. 3 characters") : undefined}
                />
                <FF label="Professional title"  value={f.title}       onChange={set("title")}       span />
                <FF label="Bio"                 value={f.bio}         onChange={set("bio")}          textarea span hint={`${f.bio.length}/240`} />
                <FF label="Date of birth"       value={f.birthdate}   onChange={set("birthdate")}   type="date" />
                <FFSelect label="Gender" value={f.gender} onChange={(v) => setF((p) => ({ ...p, gender: v as Gender }))} options={[Gender.Male, Gender.Female, Gender.Other]} />
                <FF label="Nationality"         value={f.nationality} onChange={set("nationality")} />
                <div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] mb-2">Languages</div>
                  <div className={S.chipSelect}>
                    {ALL_LANGS.map((l) => (
                      <button
                        key={l} type="button"
                        className={cn(
                          "h-[34px] px-[14px] rounded-full text-xs font-semibold border transition-all duration-200",
                          f.languages.includes(l)
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card text-muted-foreground border-border hover:border-border/60 hover:text-foreground"
                        )}
                        onClick={() => toggleLang(l)}
                      >{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className={S.section} id="contact" ref={(el) => { refs.current.contact = el; }}>
            <div className={S.sectionHead}>
              <span className={cn(S.sectionIc, SECTIONS[1].tint)}><Icon name="mail" size={18} /></span>
              <div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">Contact</h3>
                <p className="text-xs text-muted-foreground mt-px">How we and customers reach you.</p>
              </div>
            </div>
            <div className={S.card}>
              <div className={S.formGrid}>
                <FF label="Email address"    value={f.email}     onChange={set("email")}     type="email" required
                  ok={emailOk} err={f.email.length > 0 && !emailOk}
                  affix={emailOk
                    ? <span className="text-[11px] font-semibold text-halo-emerald bg-green-50 dark:bg-halo-emerald/10 px-2 py-0.5 rounded-full">Verified</span>
                    : null
                  }
                  help={emailOk ? "Confirmed & primary" : f.email.length > 0 ? "Enter a valid email" : undefined}
                />
                <FF label="Primary phone"   value={f.phone}     onChange={set("phone")}     type="tel" ok={f.phone.length > 6} hint="Used for delivery & 2FA" />
                <FF label="Secondary phone" value={f.phone2}    onChange={set("phone2")}    type="tel" hint="Optional backup" />
                <FF label="Emergency contact" value={f.emergency} onChange={set("emergency")} hint="Name · number" />
                <FF label="Timezone"        value={f.timezone}  onChange={set("timezone")}  hint="e.g. Asia/Ho_Chi_Minh" />
              </div>
            </div>
          </section>

          {/* ADDRESS */}
          <section className={S.section} id="address" ref={(el) => { refs.current.address = el; }}>
            <div className={S.sectionHead}>
              <span className={cn(S.sectionIc, SECTIONS[2].tint)}><Icon name="map_pin" size={18} /></span>
              <div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">Address</h3>
                <p className="text-xs text-muted-foreground mt-px">Billing & shipping — fill in your location.</p>
              </div>
            </div>
            <div className={S.card}>
              <div className={S.formGrid}>
                <FF label="Country"        value={f.country}  onChange={set("country")}  required ok={f.country.length > 1} />
                <FF label="State / Province" value={f.state}  onChange={set("state")} />
                <FF label="City"           value={f.city}     onChange={set("city")}     required ok={f.city.length > 1} />
                <FF label="District"       value={f.district} onChange={set("district")} />
                <FF label="Postal code"    value={f.postal}   onChange={set("postal")}   required ok={f.postal.length > 2}
                  affix={<Icon name="map_pin" size={15} className="text-muted-foreground" />}
                />
                <FF label="Full street address" value={f.address} onChange={set("address")} span hint="Street, ward, district" />
              </div>
            </div>
          </section>

          {/* SOCIAL */}
          <section className={S.section} id="social" ref={(el) => { refs.current.social = el; }}>
            <div className={S.sectionHead}>
              <span className={cn(S.sectionIc, SECTIONS[3].tint)}><Icon name="globe" size={18} /></span>
              <div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">Social</h3>
                <p className="text-xs text-muted-foreground mt-px">Link the channels you want on your showcase.</p>
              </div>
            </div>
            <div className={S.card}>
              <div className={S.formGrid}>
                <FF label="Website"    value={f.website}   onChange={set("website")}   affix={<Icon name="globe"  size={15} className="text-muted-foreground" />} />
                <FF label="LinkedIn"   value={f.linkedin}  onChange={set("linkedin")}  affix={<span className="text-[11px] text-muted-foreground font-bold">in</span>} />
                <FF label="GitHub"     value={f.github}    onChange={set("github")}    affix={<span className="font-mono text-xs text-muted-foreground">{"{ }"}</span>} />
                <FF label="X (Twitter)" value={f.twitter}  onChange={set("twitter")}   affix={<span className="text-[13px] text-muted-foreground">𝕏</span>} />
                <FF label="Instagram"  value={f.instagram} onChange={set("instagram")} hint="Optional" />
                <FF label="Facebook"   value={f.facebook}  onChange={set("facebook")}  hint="Optional" />
              </div>
            </div>
          </section>

          {/* PREFERENCES */}
          <section className={S.section} id="prefs" ref={(el) => { refs.current.prefs = el; }}>
            <div className={S.sectionHead}>
              <span className={cn(S.sectionIc, SECTIONS[4].tint)}><Icon name="shield" size={18} /></span>
              <div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em]">Preferences</h3>
                <p className="text-xs text-muted-foreground mt-px">Theme, language, notifications & privacy.</p>
              </div>
            </div>
            <div className={S.card}>
              <div className={cn(S.formGrid, "mb-2")}>
                <FFSelect label="Theme"    value={f.preferences.theme}    onChange={(v) => setP("theme")(v as unknown as boolean)}    options={["System","Light","Dark"]} />
                <FFSelect label="Language" value={f.preferences.language} onChange={(v) => setP("language")(v as unknown as boolean)} options={["English","Vietnamese","Français","Deutsch","日本語"]} />
              </div>
              <div className="border-t border-border pt-1.5">
                <ETog icon="bell"     title="Order updates"     desc="Shipping, delivery & returns"    on={f.preferences.orderUpdates}    onChange={setP("orderUpdates")}    />
                <ETog icon="sparkles" title="Product news"      desc="New drops & restocks"            on={f.preferences.productNews}     onChange={setP("productNews")}     />
                <ETog icon="mail"     title="Marketing emails"  desc="Editorials & seasonal offers"    on={f.preferences.marketingEmails} onChange={setP("marketingEmails")} />
                <ETog icon="eye"      title="Public profile"    desc="Anyone can view your showcase"   on={f.preferences.publicProfile}   onChange={setP("publicProfile")}   />
                <ETog icon="zap"      title="Show activity"     desc="Display recent orders & reviews" on={f.preferences.showActivity}    onChange={setP("showActivity")}    />
                <ETog icon="search"   title="Searchable"        desc="Appear in member directory"      on={f.preferences.searchable}      onChange={setP("searchable")}      />
              </div>
            </div>
          </section>

          {/* ── Save bar ── */}
          <div className={S.savebar}>
            <div className="flex items-center gap-3">
              <ProgressRing value={completion} size={42} stroke={5} cap="" colors={["#7c3aed","#ec4899"]}>
                <span className="text-[11px] font-bold tabular-nums">{completion}</span>
              </ProgressRing>
              <div>
                <div className="text-[13px] font-bold">
                  {completion === 100 ? "All set — ready to save" : `${completion}% complete`}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {completion === 100
                    ? "Everything required is filled in."
                    : `${tracked.length - filled} field${tracked.length - filled === 1 ? "" : "s"} left.`}
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <button type="button" className={cn(S.chip, "h-11 px-5 cursor-pointer")} onClick={() => router.back()}>
                Cancel
              </button>
              <button
                type="button"
                className={cn(S.ctaEdit, loading && "opacity-70 pointer-events-none")}
                onClick={onSave}
              >
                <Icon name={loading ? "rotate" : "check"} size={16} />
                {loading ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>

        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default withMyTask(EditPage);
