"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { navLinks } from "@/lib/nav";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled((prev) => {
      const next = y > 8;
      return prev === next ? prev : next;
    });
  });

  // Close the mobile menu on route change (adjusting state during render,
  // not in an effect, avoids an extra cascading render).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="border-b transition-[background-color,border-color,backdrop-filter] duration-300"
        style={{
          background: scrolled ? "rgba(244, 243, 239, 0.72)" : "rgba(244, 243, 239, 0)",
          borderColor: scrolled ? "var(--line)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-[19px] font-800 tracking-tight text-ink"
            style={{ fontWeight: 800 }}
          >
            Forn Carné
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className="relative block rounded-full px-4 py-2 text-[13px] font-medium tracking-wide text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink/[0.06]"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                      />
                    )}
                    <span className={`relative ${active ? "text-ink" : ""}`}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contacte"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.97] lg:inline-flex lg:items-center"
          >
            Com arribar-hi
          </Link>

          <button
            type="button"
            aria-label={open ? "Tancar el menú" : "Obrir el menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform duration-150 ease-out active:scale-90 lg:hidden"
          >
            {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="border-b border-line bg-paper lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4 sm:px-8">
              {navLinks.map((link, i) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1], delay: i * 0.04 }}
                    className="border-b border-line/70 last:border-none"
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-4 text-[17px] font-display font-medium ${
                        active ? "text-rust" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
