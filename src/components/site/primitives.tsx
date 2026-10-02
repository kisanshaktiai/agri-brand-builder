import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { type Maturity } from "@/content/site";
import { useLocale } from "@/i18n";
import type { TechKey } from "@/content/technologies";

/* ── Layout ─────────────────────────────────────────────────────── */

export function Container({ className, children, as: Tag = "div" }: { className?: string; children: React.ReactNode; as?: keyof JSX.IntrinsicElements }) {
  const C = Tag as React.ElementType;
  return <C className={cn("ks-container", className)}>{children}</C>;
}

export function Section({ id, className, children, band = false, labelledBy }: { id?: string; className?: string; children: React.ReactNode; band?: boolean; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("ks-section", band && "bg-ks-paper-2", className)}>
      {children}
    </section>
  );
}

/* ── Type ───────────────────────────────────────────────────────── */

export function Eyebrow({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <p id={id} className={cn("ks-label mb-4", className)}>
      {children}
    </p>
  );
}

export function Heading({ as: Tag = "h2", size = "h2", className, children, id }: { as?: "h1" | "h2" | "h3" | "p"; size?: "display-1" | "display-2" | "h2" | "h3"; className?: string; children: React.ReactNode; id?: string }) {
  return (
    <Tag id={id} className={cn(`ks-${size}`, className)}>
      {children}
    </Tag>
  );
}

export function Lead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("ks-lead mt-6 max-w-prose", className)}>{children}</p>;
}

export function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("ks-body max-w-prose", className)}>{children}</p>;
}

/* ── Marks and badges ───────────────────────────────────────────── */

const TECH_HUE: Record<TechKey, string> = {
  tatva: "bg-ks-tatva",
  tarka: "bg-ks-tarka",
  riitu: "bg-ks-riitu",
  pahra: "bg-ks-pahra",
  rukh: "bg-ks-rukh",
};

/**
 * Technology mark. Renders the house mark + name ("KisanShakti TARKA") in
 * running-copy mode, or the name alone with its hue chip. TATVA carries a
 * small numeral 5 for the five elements.
 */
export function TechMark({ tech, name, house = true, size = "md", className }: { tech: TechKey; name: string; house?: boolean; size?: "sm" | "md" | "lg"; className?: string }) {
  const chip = size === "lg" ? "h-3 w-3" : size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  const text = size === "lg" ? "text-base" : size === "sm" ? "text-[0.6875rem]" : "text-xs";
  return (
    <span className={cn("inline-flex items-center gap-2 ks-mark text-ks-ink", text, className)}>
      <span aria-hidden className={cn("rounded-full", chip, TECH_HUE[tech])} />
      <span>
        {house && <span className="text-ks-ink-3 font-normal">KisanShakti </span>}
        <span className="font-medium">{name}</span>
        {tech === "tatva" && (
          <sup aria-label="five elements" className="ml-0.5 text-[0.6em] font-medium text-ks-ink-3 align-super">
            5
          </sup>
        )}
      </span>
    </span>
  );
}

export function MaturityBadge({ maturity, className }: { maturity: Maturity; className?: string }) {
  const { content } = useLocale();
  const tone =
    maturity === "beta"
      ? "bg-ks-signal-soft text-ks-signal border-transparent"
      : maturity === "planned"
        ? "bg-transparent text-ks-ink-3 border-ks-line-strong"
        : "bg-ks-field-soft text-ks-field-deep border-transparent";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 ks-label normal-case tracking-[0.02em] text-[0.6875rem]", tone, className)}>
      {content.MATURITY_LABEL[maturity]}
    </span>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────── */

type BtnVariant = "primary" | "secondary" | "ghost";

const btn = (variant: BtnVariant, size: "md" | "lg") =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,transform] duration-200 ease-ks-out active:scale-[0.98] whitespace-nowrap",
    size === "lg" ? "h-12 px-6 text-base" : "h-10 px-4 text-sm",
    variant === "primary" && "bg-ks-ink text-ks-paper hover:bg-ks-field-deep",
    variant === "secondary" && "bg-transparent text-ks-ink border border-ks-line-strong hover:border-ks-ink",
    variant === "ghost" && "bg-transparent text-ks-ink-2 hover:text-ks-ink",
  );

export function ButtonLink({ to, href, children, variant = "primary", size = "md", className, onClick, ...rest }: { to?: string; href?: string; children: React.ReactNode; variant?: BtnVariant; size?: "md" | "lg"; className?: string; onClick?: () => void } & Record<string, unknown>) {
  const cls = cn(btn(variant, size), className);
  const { href: localize } = useLocale();
  if (href) {
    return (
      <a href={href} className={cls} data-variant={variant} onClick={onClick} target="_blank" rel="noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={localize(to ?? "/")} className={cls} data-variant={variant} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ children, variant = "primary", size = "md", className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: "md" | "lg" }) {
  return (
    <button className={cn(btn(variant, size), className)} data-variant={variant} {...rest}>
      {children}
    </button>
  );
}

/* ── Hairline list ───────────────────────────────────────────────── */

export function HairlineList({ items, className }: { items: { title?: string; body: string; meta?: React.ReactNode }[]; className?: string }) {
  return (
    <ul className={cn("divide-y divide-ks-line border-y border-ks-line", className)}>
      {items.map((it, i) => (
        <li key={i} className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6">
          <div>
            {it.title && <p className="ks-h3 mb-1 text-[1.125rem]">{it.title}</p>}
            <p className="ks-body">{it.body}</p>
          </div>
          {it.meta && <div className="shrink-0">{it.meta}</div>}
        </li>
      ))}
    </ul>
  );
}
