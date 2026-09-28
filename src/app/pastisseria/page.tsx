import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import TiltCard from "@/components/TiltCard";

export const metadata: Metadata = {
  title: "Pastisseria",
  description:
    "Pastisseria dolça i salada de forn Carné, elaborada cada dia amb les millors matèries primeres, a Terrassa.",
};

const categories = [
  {
    title: "Pastisseria dolça",
    body: "Pastissos, tortells i peces individuals fets cada matí a l'obrador, amb les mateixes receptes que fa quatre generacions que es transmeten a la família.",
    image: "/images/pas_dolca_pic.jpg",
    accent: "/images/stock/croissants.jpg",
  },
  {
    title: "Pastisseria salada",
    body: "Entrepans, coques de recapte i peces per compartir, pensades tant per al dia a dia com per a qualsevol celebració.",
    image: "/images/pas_salada_pic.jpg",
    accent: "/images/stock/bakery-display.jpg",
  },
];

export default function PastisseriaPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-32 sm:px-8 lg:pt-40">
        <RevealOnScroll>
          <h1 className="font-display text-[2.25rem] font-800 tracking-[-0.02em] text-ink balance sm:text-[3rem]" style={{ fontWeight: 800 }}>
            Pastisseria feta cada matí.
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
            Amb les millors matèries primeres, els nostres pastissers elaboren tot tipus
            de productes, dolços i salats, innovant contínuament i seguint sempre la
            mateixa filosofia: produir-ho tot diàriament.
          </p>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {categories.map((c, i) => (
            <RevealOnScroll key={c.title} delay={i * 0.08}>
              <TiltCard max={4} className="h-full">
                <div className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[24px] border border-line bg-surface">
                  <div className="relative h-56 shrink-0 sm:h-64">
                    <Image
                      src={c.accent}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-8">
                    <div>
                      <h2 className="font-display text-[24px] font-700 text-ink" style={{ fontWeight: 700 }}>
                        {c.title}
                      </h2>
                      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
                        {c.body}
                      </p>
                    </div>
                    <div className="relative mt-auto aspect-[4/3] w-full max-w-[220px] overflow-hidden rounded-[16px] border border-line">
                      <Image
                        src={c.image}
                        alt={`Mostra de ${c.title.toLowerCase()}`}
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
