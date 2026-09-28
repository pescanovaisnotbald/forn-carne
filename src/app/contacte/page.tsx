import type { Metadata } from "next";
import { EnvelopeSimple, Phone, Printer } from "@phosphor-icons/react/dist/ssr";
import RevealOnScroll from "@/components/RevealOnScroll";
import LocationsMap from "@/components/LocationsMap";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Contacte",
  description:
    "Adreça, telèfon i ubicació de les cinc botigues de forn Carné a Terrassa. Escriu-nos a carne@forncarne.cat.",
};

export default function ContactePage() {
  const main = locations.find((l) => l.isMain)!;

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-32 sm:px-8 lg:pt-40">
        <RevealOnScroll>
          <h1 className="font-display text-[2.25rem] font-800 tracking-[-0.02em] text-ink balance sm:text-[3rem]" style={{ fontWeight: 800 }}>
            Cinc botigues a Terrassa.
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
            Passa per qualsevol de les nostres botigues o escriu-nos per a qualsevol
            consulta. Toca una adreça per obtenir-hi indicacions.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[20px] border border-line bg-surface px-7 py-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                Botiga principal
              </p>
              <p className="mt-1 text-[15px] text-ink">
                {main.street}, {main.postal}
              </p>
            </div>
            <span className="hidden h-8 w-px bg-line sm:block" />
            <a
              href={`tel:${main.phone?.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-rust"
            >
              <Phone size={16} /> {main.phone}
            </a>
            <a
              href="mailto:carne@forncarne.cat"
              className="inline-flex items-center gap-2 text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-rust"
            >
              <EnvelopeSimple size={16} /> carne@forncarne.cat
            </a>
            {main.fax && (
              <span className="inline-flex items-center gap-2 text-[14.5px] text-ink-faint">
                <Printer size={16} /> Fax {main.fax}
              </span>
            )}
          </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:pb-32">
        <RevealOnScroll delay={0.12}>
          <LocationsMap />
        </RevealOnScroll>
      </section>
    </>
  );
}
