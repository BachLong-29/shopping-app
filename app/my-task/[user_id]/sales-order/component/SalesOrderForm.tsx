"use client";

import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import { Icon } from "@/components/design-system/Icon";
import type { IconName } from "@/components/design-system/Icon";
import { SalesOrder, SalesOrderStatus } from "@/core/model/SO";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/core/context/LanguageContext";
import { SOFormData } from "../services/salesOrdertService";
import { formatCurrency, formatNumber } from "@/core/utils/format";

interface Props {
  form: UseFormReturn<SOFormData>;
  isNew?: boolean;
  orderId?: string;
  order?: SalesOrder;
  userId: string;
  loading?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

/* ─── Section IDs ─── */
type SectionId = "details" | "items" | "notes";

const SECTION_GRADIENTS: Record<SectionId, string> = {
  details: "linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)",
  items:   "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
  notes:   "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
};

function PESection({
  id,
  icon,
  title,
  sub,
  open,
  onToggle,
  children,
}: {
  id: SectionId;
  icon: IconName;
  title: string;
  sub: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="bg-card border border-border rounded-2xl mb-4 overflow-hidden scroll-mt-20 transition-colors"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3.5 px-5 py-[18px] text-left cursor-pointer select-none"
      >
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{ background: SECTION_GRADIENTS[id] }}
        >
          <Icon name={icon} size={16} />
        </span>
        <div className="flex-1 flex flex-col min-w-0">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            {title}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">{sub}</span>
        </div>
        <span
          className={cn(
            "w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground transition-transform duration-200",
            open && "bg-muted text-foreground rotate-180"
          )}
        >
          <Icon name="chevron_down" size={14} />
        </span>
      </button>
      {open && (
        <div className="px-5 pt-5 pb-6 border-t border-border">{children}</div>
      )}
    </section>
  );
}

function Field({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        {label}
        {required && <span className="text-halo-rose">*</span>}
        {optional && (
          <span className="text-[10px] px-1.5 rounded-full bg-muted text-muted-foreground font-semibold tracking-wide">
            OPTIONAL
          </span>
        )}
      </label>
      {children}
      {hint && (
        <span className="text-[11px] mt-0.5 text-muted-foreground">{hint}</span>
      )}
    </div>
  );
}

const inputCls =
  "w-full h-10 px-3 bg-card border border-border rounded-lg text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 hover:border-foreground/20 focus:border-halo-violet focus:ring-2 focus:ring-halo-violet/10";

const textareaCls =
  "w-full px-3 py-2.5 bg-card border border-border rounded-lg text-[13px] text-foreground outline-none resize-y min-h-[80px] leading-relaxed transition-colors placeholder:text-muted-foreground/60 hover:border-foreground/20 focus:border-halo-violet focus:ring-2 focus:ring-halo-violet/10";

const STATUS_CONFIG: Record<
  SalesOrderStatus,
  { dot: string; label: string; sub: string }
> = {
  [SalesOrderStatus.Draft]:     { dot: "#8b5cf6", label: "Draft",     sub: "Not submitted" },
  [SalesOrderStatus.Pending]:   { dot: "#f59e0b", label: "Pending",   sub: "Awaiting review" },
  [SalesOrderStatus.Completed]: { dot: "#10b981", label: "Completed", sub: "Fulfilled" },
  [SalesOrderStatus.Cancelled]: { dot: "#71717a", label: "Cancelled", sub: "Voided" },
};

/* ─── Main component ─── */

const SalesOrderForm = ({
  form,
  isNew = false,
  orderId,
  order,
  loading,
  onSave,
  onCancel,
}: Props) => {
  const { t } = useLanguage();
  const isDirty = form.formState.isDirty;

  const [open, setOpen] = useState<Record<SectionId, boolean>>({
    details: true,
    items:   true,
    notes:   false,
  });
  const [activeSection, setActiveSection] = useState<SectionId>("details");

  function toggle(id: SectionId) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function jumpTo(id: SectionId) {
    setOpen((prev) => ({ ...prev, [id]: true }));
    setActiveSection(id);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // Scroll-spy
  useEffect(() => {
    const sectionIds: SectionId[] = ["details", "items", "notes"];
    function onScroll() {
      const passed = sectionIds
        .map((id) => ({
          id,
          top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity,
        }))
        .filter((o) => o.top <= 140);
      if (passed.length) setActiveSection(passed[passed.length - 1].id);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ctrl+S
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        onSave();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSave]);

  const currentStatus = form.watch("status") ?? SalesOrderStatus.Draft;
  const statusConf =
    STATUS_CONFIG[currentStatus as SalesOrderStatus] ?? STATUS_CONFIG[SalesOrderStatus.Draft];

  const navSections: Array<{ id: SectionId; label: string; icon: IconName }> = [
    { id: "details", label: "Details",  icon: "info"     },
    { id: "items",   label: "Items",    icon: "shopping_bag" },
    { id: "notes",   label: "Notes",    icon: "chat"     },
  ];

  const headTitle = isNew
    ? "New Sales Order"
    : order
    ? `Order #${order._id.slice(-6).toUpperCase()}`
    : `Order #${orderId?.slice(-6).toUpperCase() ?? "—"}`;

  return (
    <Form {...form}>
      <div>
        {/* ══════════════════════════ HEAD STRIP ══════════════════════════ */}
        <div className="flex items-center gap-4 py-4 border-b border-border mb-6 flex-wrap">
          <button
            type="button"
            onClick={onCancel}
            className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground transition-all hover:bg-foreground hover:text-background hover:-translate-x-0.5 shrink-0"
          >
            <Icon name="chevron_left" size={16} />
          </button>

          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-[clamp(22px,3vw,34px)] font-normal tracking-tight text-foreground">
                {headTitle}
              </h1>
              <Badge
                variant={
                  currentStatus === SalesOrderStatus.Completed ? "success" :
                  currentStatus === SalesOrderStatus.Pending   ? "warning" :
                  currentStatus === SalesOrderStatus.Cancelled ? "error"   : "soft"
                }
              >
                {statusConf.label}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              {!isNew && orderId && (
                <>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted tracking-wide">
                    {orderId.slice(0, 8)}…
                  </span>
                  <span>·</span>
                </>
              )}
              {isDirty ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Unsaved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  All changes saved
                </span>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Discard
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onSave}
              loading={loading}
            >
              <Icon name="check" size={13} />
              Save draft
            </Button>
            <Button
              type="button"
              variant="gradient"
              size="sm"
              onClick={onSave}
              loading={loading}
            >
              <Icon name="zap" size={13} />
              {isNew ? "Create order" : "Update"}
            </Button>
          </div>
        </div>

        {/* ══════════════════════════ QUICK NAV ══════════════════════════ */}
        <nav className="flex gap-1 mb-6 overflow-x-auto pb-0.5 border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navSections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => jumpTo(s.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 -mb-px transition-all",
                activeSection === s.id
                  ? "text-foreground font-semibold border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              <Icon name={s.icon} size={13} />
              {s.label}
            </button>
          ))}
        </nav>

        {/* ══════════════════════════ BODY GRID ══════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start pb-32">
          {/* ── Main content ── */}
          <div>
            {/* ORDER DETAILS */}
            <PESection
              id="details"
              icon="info"
              title="Order details"
              sub="Status and core order information"
              open={open.details}
              onToggle={() => toggle("details")}
            >
              <div className="flex flex-col gap-4">
                {/* Status as radio buttons */}
                <Field label="Order status" required>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-2">
                            {(Object.values(SalesOrderStatus) as SalesOrderStatus[]).map((s) => {
                              const conf = STATUS_CONFIG[s];
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => field.onChange(s)}
                                  className={cn(
                                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all",
                                    field.value === s
                                      ? "border-halo-violet bg-halo-violet/5 shadow-[0_0_0_1px_#7c3aed]"
                                      : "border-border bg-card hover:border-foreground/20"
                                  )}
                                >
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ background: conf.dot }}
                                  />
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[13px] font-medium text-foreground">
                                      {conf.label}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground">
                                      {conf.sub}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>

                {/* Customer info (read-only in edit) */}
                {!isNew && order && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Customer
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/40">
                      <div className="w-9 h-9 rounded-full bg-aurora flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {(order.user?.name ?? "?")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-foreground truncate">
                          {order.user?.name ?? "Unknown"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {order.user?.email ?? "—"}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        Customer
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Total amount */}
                <Field
                  label="Total amount"
                  hint="Calculated from the order items."
                >
                  <FormField
                    control={form.control}
                    name="totalAmount"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-[13px] pointer-events-none select-none">
                            $
                          </span>
                          <FormControl>
                            <input
                              type="number"
                              min={0}
                              className={cn(inputCls, "pl-7")}
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === "" ? 0 : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
              </div>
            </PESection>

            {/* ORDER ITEMS */}
            <PESection
              id="items"
              icon="shopping_bag"
              title="Order items"
              sub="Products included in this order"
              open={open.items}
              onToggle={() => toggle("items")}
            >
              {!isNew && order?.products ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {(order.products as any)?.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={(order.products as any).images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="package" size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground truncate">
                        {(order.products as any)?.name ?? "Product"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {(order.products as any)?.price != null ? formatCurrency((order.products as any).price) : "—"}
                      </p>
                    </div>
                    <Badge variant="soft">
                      ×1
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    To modify line items, create a new order.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Icon name="shopping_bag" size={22} className="text-muted-foreground" />
                  </div>
                  <p className="text-[13px] font-medium text-foreground">
                    No items yet
                  </p>
                  <p className="text-xs text-muted-foreground max-w-[240px]">
                    Product line items will be visible here once the order is created via the API.
                  </p>
                </div>
              )}
            </PESection>

            {/* NOTES */}
            <PESection
              id="notes"
              icon="chat"
              title="Notes"
              sub="Internal notes visible only to your team"
              open={open.notes}
              onToggle={() => toggle("notes")}
            >
              <Field label="Order notes" optional hint="Not shown to the customer.">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          className={textareaCls}
                          placeholder="Add internal notes about this order…"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Field>
            </PESection>
          </div>

          {/* ── Right rail ── */}
          <aside className="sticky top-20 flex flex-col gap-3">
            {/* Order summary card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a0b2e 0%, #2d0a4e 100%)",
              }}
            >
              <div className="p-4 flex flex-col gap-3">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/70">
                  Order summary
                </div>

                {/* Status summary */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-1">
                    Status
                  </div>
                  {(Object.values(SalesOrderStatus) as SalesOrderStatus[]).map((s) => {
                    const conf = STATUS_CONFIG[s];
                    const isActive = form.watch("status") === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => form.setValue("status", s, { shouldDirty: true })}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left transition-all",
                          isActive
                            ? "bg-white/[0.14] border-white/25"
                            : "bg-white/5 border-white/[0.08] hover:bg-white/10"
                        )}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: conf.dot }} />
                        <span className="flex-1 text-[13px] font-medium text-white">{conf.label}</span>
                        <span className="text-[11px] text-white/70">{conf.sub}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-2 border-t border-white/10 mt-1">
                  <span className="text-[12px] text-white/70">Total</span>
                  <span className="text-[15px] font-semibold text-white">
                    {formatCurrency(form.watch("totalAmount") ?? 0)}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onSave}
                    loading={loading}
                    className="flex-1 !bg-white/15 !text-white hover:!bg-white/25"
                  >
                    <Icon name="check" size={13} />
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="gradient"
                    size="sm"
                    onClick={onSave}
                    loading={loading}
                    className="flex-[1.4]"
                  >
                    <Icon name="zap" size={13} />
                    {isNew ? "Create" : "Update"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Danger zone (edit only) */}
            {!isNew && (
              <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-2">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                  Danger zone
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full justify-start !text-halo-rose !border-halo-rose/30 hover:!bg-halo-rose/5"
                >
                  <Icon name="trash" size={12} />
                  Cancel order
                </Button>
              </div>
            )}

            {/* Shortcuts */}
            <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3">
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                Shortcuts
              </div>
              <ul className="flex flex-col gap-0">
                {[
                  { label: "Save draft", keys: ["⌘", "S"] },
                  { label: "Discard",    keys: ["Esc"] },
                ].map((sh) => (
                  <li
                    key={sh.label}
                    className="flex justify-between items-center text-xs py-1.5 border-b border-dashed border-border last:border-0 text-muted-foreground"
                  >
                    <span className="text-foreground font-medium">{sh.label}</span>
                    <span className="flex gap-1">
                      {sh.keys.map((k) => (
                        <kbd
                          key={k}
                          className="px-1.5 py-0.5 rounded bg-muted text-[11px] font-mono border border-border"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* ══════════════════════════ FLOATING SAVE BAR ══════════════════════════ */}
        {isDirty && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-card border border-border shadow-2xl rounded-full px-5 py-2 z-50 max-w-[calc(100vw-2rem)] animate-reveal-up">
            <span className="w-2 h-2 rounded-full bg-halo-amber animate-pulse shadow-[0_0_0_4px_rgba(245,158,11,0.2)]" />
            <div className="flex flex-col gap-px">
              <strong className="text-[13px] font-semibold text-foreground">
                Unsaved changes
              </strong>
              <span className="text-[11px] text-muted-foreground hidden sm:block">
                Hit ⌘S to save quickly
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                Discard
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onSave}
                loading={loading}
              >
                Save draft
              </Button>
              <Button
                type="button"
                variant="gradient"
                size="sm"
                onClick={onSave}
                loading={loading}
              >
                <Icon name="zap" size={12} />
                {isNew ? "Create" : "Update"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
};

export default SalesOrderForm;
