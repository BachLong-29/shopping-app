"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import { Icon } from "@/components/design-system/Icon";

import { Gender, Role } from "@/core/model/User";
import { RootState } from "@/redux/store/store";
import { setUser } from "@/redux/reducer/profileReducer";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useGetInfoFromPath } from "@/hooks/useGetInfoFromPath";
import { useProfile } from "../context/ProfileContext";
import withMyTask from "@/components/forms/withMyTask";

/* ─── static config ─────────────────────────────────────────── */

const ROLE_CONFIG: Record<Role, { label: string; variant: "gradient" | "new" | "soft" }> = {
  [Role.Admin]:  { label: "Admin",  variant: "gradient" },
  [Role.Seller]: { label: "Seller", variant: "new"      },
  [Role.User]:   { label: "User",   variant: "soft"     },
};

const CARD_GRADIENTS = [
  ["#7c3aed", "#ec4899"],
  ["#0ea5e9", "#10b981"],
  ["#f59e0b", "#f43f5e"],
  ["#ec4899", "#f59e0b"],
  ["#10b981", "#0ea5e9"],
];

/* ─── sub-components ────────────────────────────────────────── */

function Orb({
  style,
  color1,
  color2,
  delay = "0s",
}: {
  style: React.CSSProperties;
  color1: string;
  color2: string;
  delay?: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute rounded-full animate-float pointer-events-none"
      style={{
        background: `radial-gradient(circle at 40% 40%, ${color1} 0%, ${color2} 55%, transparent 80%)`,
        filter: "blur(72px)",
        animationDelay: delay,
        ...style,
      }}
    />
  );
}

function InfoCard({
  icon,
  label,
  value,
  colorFrom,
  colorTo,
  delay,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  value: string;
  colorFrom: string;
  colorTo: string;
  delay: number;
}) {
  return (
    <div
      className="animate-reveal-up group relative bg-card border border-border rounded-2xl p-5 overflow-hidden
                 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.15)]
                 transition-all duration-300 cursor-default"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Hover gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
      />

      {/* Left accent strip */}
      <div
        aria-hidden
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
        style={{ background: `linear-gradient(to bottom, ${colorFrom}, ${colorTo})` }}
      />

      <div className="flex items-center gap-4 pl-3">
        {/* Icon bubble */}
        <div
          className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
        >
          <Icon name={icon} size={18} strokeWidth={1.75} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground mb-0.5">
            {label}
          </p>
          <p className="text-sm font-medium text-foreground truncate leading-tight">
            {value || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────── */

const ProfilePage = () => {
  const profile = useProfile();
  const { t } = useLanguage();
  const router = useRouter();
  const { userId } = useGetInfoFromPath();
  const profileState = useSelector((state: RootState) => state.profile);
  const { setBreadcrumb } = useBreadcrumb();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profileState._id) dispatch(setUser(profile));
  }, [profile, dispatch, profileState._id]);

  useEffect(() => {
    setBreadcrumb([{ label: t("module.profile") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleConf = ROLE_CONFIG[profileState.role] ?? ROLE_CONFIG[Role.User];

  const avatarSrc = profileState.avatar
    ? profileState.avatar
    : profileState.gender === Gender.Female
    ? "/images/female-avatar.jpg"
    : "/images/male-avatar.jpg";

  const infoFields = [
    {
      icon: "mail"    as const,
      label: t("user.info.email"),
      value: profileState.email,
      ci: 0,
    },
    {
      icon: "phone"   as const,
      label: t("user.info.phone"),
      value: profileState.phone,
      ci: 1,
    },
    {
      icon: "map_pin" as const,
      label: t("user.info.address"),
      value: profileState.address,
      ci: 2,
    },
    {
      icon: "bell"    as const,
      label: t("user.info.birthday"),
      value: profileState.birthdate
        ? dayjs(profileState.birthdate).format("DD / MM / YYYY")
        : "",
      ci: 3,
    },
    {
      icon: "user"    as const,
      label: t("user.info.gender"),
      value: t(`general.${profileState.gender}`),
      ci: 4,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center
                   pt-14 pb-20 px-6 text-center"
        style={{ background: "#08070d" }}
      >
        {/* Floating ambient orbs */}
        <Orb color1="#7c3aed" color2="#ec4899" delay="0s"    style={{ width: 400, height: 400, top: -120, left: -80, opacity: 0.35 }} />
        <Orb color1="#0ea5e9" color2="#10b981" delay="-4s"   style={{ width: 320, height: 320, bottom: -80, right: -60, opacity: 0.28 }} />
        <Orb color1="#f59e0b" color2="#f43f5e" delay="-7.5s" style={{ width: 200, height: 200, top: "30%", right: "18%", opacity: 0.22 }} />

        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Avatar ─────────────────────────────────────── */}
        <div className="relative z-10 mb-7">
          {/* Outer glow pulse */}
          <div
            aria-hidden
            className="absolute rounded-full animate-pulse pointer-events-none"
            style={{
              inset: -18,
              background:
                "conic-gradient(from 0deg, #7c3aed, #ec4899, #f59e0b, #10b981, #0ea5e9, #7c3aed)",
              borderRadius: "50%",
              opacity: 0.35,
              filter: "blur(12px)",
            }}
          />
          {/* Conic gradient ring */}
          <div
            className="relative rounded-full"
            style={{
              padding: 3,
              background:
                "conic-gradient(from 0deg, #7c3aed, #ec4899, #f59e0b, #10b981, #0ea5e9, #7c3aed)",
              borderRadius: "50%",
              boxShadow:
                "0 0 48px rgba(124,58,237,0.55), 0 0 96px rgba(236,72,153,0.25)",
            }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 130, height: 130, background: "#08070d" }}
            >
              <Image
                src={avatarSrc}
                alt={profileState.name || "avatar"}
                width={130}
                height={130}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Name ────────────────────────────────────────── */}
        <h1
          className="font-display text-5xl md:text-[64px] font-normal leading-none tracking-[-0.02em] z-10 mb-3"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #a78bfa 0%, #f472b6 40%, #fbbf24 70%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {profileState.name || profile.name}
        </h1>

        {/* Badges ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 z-10 mb-2">
          <Badge variant={roleConf.variant}>{roleConf.label}</Badge>
          <Badge
            className="border-white/20 text-white/60"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {t(`general.${profileState.gender}`)}
          </Badge>
        </div>

        {/* Email hint */}
        <p className="text-sm text-white/30 z-10">{profileState.email}</p>

        {/* Bottom gradient fade into page bg */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsl(var(--background)))",
          }}
        />
      </div>

      {/* ══ INFO CARDS ════════════════════════════════════════ */}
      <div className="flex-1 px-4 md:px-8 pb-8 -mt-6 z-10 relative">
        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 ml-1">
          Account details
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoFields.map((f, i) => {
            const [cf, ct] = CARD_GRADIENTS[f.ci];
            return (
              <InfoCard
                key={f.label}
                icon={f.icon}
                label={f.label}
                value={f.value}
                colorFrom={cf}
                colorTo={ct}
                delay={i * 70}
              />
            );
          })}
        </div>

        {/* Edit CTA ─────────────────────────────────────────── */}
        <div
          className="mt-8 animate-reveal-up"
          style={{ animationDelay: `${infoFields.length * 70 + 60}ms`, animationFillMode: "both" }}
        >
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => router.push(`/my-task/${userId}/profile/edit`)}
          >
            <Icon name="shield" size={16} />
            {t("action.edit")} Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withMyTask(ProfilePage);
