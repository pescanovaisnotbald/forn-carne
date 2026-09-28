import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-[transform,background-color,color,border-color] duration-150 ease-out active:scale-[0.97] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-rust text-paper hover:bg-rust-deep",
  secondary: "border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/[0.03]",
  ghost: "text-ink hover:bg-ink/[0.04]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = `${base} ${variants[variant]} ${className ?? ""}`;

  if (external) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
