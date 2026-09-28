import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Pa",
  description:
    "Pa català, pa gallec, pa integral i el nostre Pain Paillasse, exclusiu a Terrassa. Elaborats cada dia amb fermentació natural i cuits en forn de pedra.",
};

const breads = [
  {
    title: "Pa català",
    body: "Pa de pagès, de parròquia, de flor, blanc, de barra. Fermentació natural, fet a mà i cuit en forn de pedra perquè es mantingui cruixent més temps.",
  },
  {
    title: "Pa gallec",
    body: "Elaboració totalment artesanal: després del pastat, la massa reposa tres hores. És aquest repòs el que li dona el sabor i la consistència que el caracteritza.",
  },
  {
    title: "Pa integral",
    body: "Farina personalitzada amb un alt percentatge de fibra, per un pa amb molt de sabor i altament nutritiu.",
  },
  {
    title: "Especialitats",
    body: "Xapata, espelta, lli, alemany, soja, fibra, llavors, civada, cereals, Viena, sobado, sense sal. Sempre amb ingredients naturals de màxima qualitat.",
  },
];

export default function PaPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-32 sm:px-8 lg:pt-40">
        <RevealOnScroll>
          <h1 className="font-display text-[2.25rem] font-800 tracking-[-0.02em] text-ink balance sm:text-[3rem]" style={{ fontWeight: 800 }}>
            El pa de tota la vida.
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
            A forn Carné elaborem cada dia les masses de totes les especialitats de pa,
            treballant amb les mans i el temps necessari per a cada una. L&apos;elaboració
            tradicional no ens priva d&apos;innovar: recorrem els principals països
            d&apos;Europa per triar les millors farines.
          </p>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <RevealOnScroll>
            <TiltCard max={4} className="h-full">
              <div className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[24px] p-8">
                <Image
                  src="/images/barra_pa.jpg"
                  alt="Pain Paillasse, el pa de llaç exclusiu de forn Carné"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/0" />
                <div className="relative text-dark-ink">
                  <span className="inline-flex rounded-full bg-rust px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em]">
                    Exclusiu a Terrassa
                  </span>
                  <h2 className="mt-4 font-display text-[26px] font-700" style={{ fontWeight: 700 }}>
                    Pa suís · Pain Paillasse
                  </h2>
                  <p className="mt-2 max-w-[46ch] text-[14.5px] leading-relaxed text-dark-ink/85">
                    Elaborat amb farines i cereals de qualitat superior i un repòs de
                    fermentació excepcionalment llarg, a l&apos;estil d&apos;abans. Molla
                    tendra i consistent, amb un gust i una olor inusuals que el fan únic:
                    l&apos;autèntic pa de llaç, amb farina importada de França.
                  </p>
                </div>
              </div>
            </TiltCard>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {breads.map((b, i) => (
              <RevealOnScroll key={b.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-[24px] border border-line bg-surface p-7">
                  <h3 className="font-display text-[19px] font-700 text-ink" style={{ fontWeight: 700 }}>
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
