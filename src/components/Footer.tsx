import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { navLinks } from "@/lib/nav";
import { locations } from "@/lib/locations";

export default function Footer() {
  const main = locations.find((l) => l.isMain)!;

  return (
    <footer className="bg-dark text-dark-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <p className="font-display text-2xl font-800" style={{ fontWeight: 800 }}>
              Forn Carné
            </p>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-dark-ink-soft">
              Pa i pastisseria artesana a Terrassa des de 1948. Quatre generacions fent
              cada dia el mateix pa de tota la vida.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-dark-ink-soft">
              El forn
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-dark-ink/85 transition-colors duration-150 hover:text-rust"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-dark-ink-soft">
              Botiga principal
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] text-dark-ink/85">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-dark-ink-soft" />
                <span>
                  {main.street}
                  <br />
                  {main.postal}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="shrink-0 text-dark-ink-soft" />
                <a
                  href={`tel:${main.phone?.replace(/\s/g, "")}`}
                  className="transition-colors duration-150 hover:text-rust"
                >
                  {main.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <EnvelopeSimple size={18} className="shrink-0 text-dark-ink-soft" />
                <a
                  href="mailto:carne@forncarne.cat"
                  className="transition-colors duration-150 hover:text-rust"
                >
                  carne@forncarne.cat
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-dark-line pt-8 text-[13px] text-dark-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pa i Pastisseria Carné. Terrassa.</p>
          <p>5 botigues a Terrassa · des de 1948</p>
        </div>
      </div>
    </footer>
  );
}
