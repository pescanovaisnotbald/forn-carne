import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Diades",
  description:
    "El calendari de diades de forn Carné: el pa, la coca o el tortell tradicional de cada data assenyalada de l'any a Catalunya.",
};

type Day = { date: number; name: string };
type Month = { name: string; days: Day[] };

const months: Month[] = [
  { name: "Gener", days: [{ date: 6, name: "Reis" }, { date: 17, name: "St. Antoni" }] },
  {
    name: "Febrer",
    days: [
      { date: 2, name: "La Candelera" },
      { date: 14, name: "St. Valentí, dia dels enamorats" },
      { date: 16, name: "Dijous Gras" },
      { date: 19, name: "Carnestoltes" },
      { date: 22, name: "Divendres de Cendra" },
    ],
  },
  { name: "Març", days: [{ date: 19, name: "St. Josep, dia del pare" }] },
  {
    name: "Abril",
    days: [
      { date: 1, name: "Diumenge de Rams" },
      { date: 9, name: "Dilluns de Pasqua" },
      { date: 23, name: "St. Jordi" },
      { date: 27, name: "Mare de Déu de Montserrat" },
    ],
  },
  { name: "Maig", days: [{ date: 6, name: "Dia de la Mare" }] },
  {
    name: "Juny",
    days: [
      { date: 13, name: "St. Antoni" },
      { date: 23, name: "St. Joan" },
      { date: 28, name: "St. Pere" },
    ],
  },
  {
    name: "Juliol",
    days: [
      { date: 10, name: "St. Cristòfol" },
      { date: 16, name: "Mare de Déu del Carme" },
      { date: 25, name: "St. Jaume" },
      { date: 26, name: "Sta. Anna" },
    ],
  },
  { name: "Agost", days: [{ date: 15, name: "Sta. Maria" }] },
  { name: "Setembre", days: [{ date: 11, name: "Diada de Catalunya" }] },
  {
    name: "Octubre",
    days: [
      { date: 12, name: "Mare de Déu del Pilar" },
      { date: 15, name: "Sta. Teresa" },
      { date: 31, name: "La Castanyada" },
    ],
  },
  { name: "Novembre", days: [] },
  { name: "Desembre", days: [{ date: 13, name: "Sta. Llúcia" }] },
];

export default function DiadesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] sm:h-[340px]">
          <Image
            src="/images/stock/wheat-field.jpg"
            alt="Camp de blat daurat a la posta de sol"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/35 to-dark/10" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 pt-28 sm:px-8 sm:pb-14">
            <h1 className="font-display text-[2.25rem] font-800 tracking-[-0.02em] text-dark-ink balance sm:text-[3rem]" style={{ fontWeight: 800 }}>
              El calendari del forn.
            </h1>
            <p className="mt-4 max-w-[58ch] text-[15.5px] leading-relaxed text-dark-ink/85">
              A la nostra terra celebrem moltes diades: dies assenyalats en què és
              tradicional un tipus de pa, coca, pasta o tortell.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {months.map((m, i) => (
            <RevealOnScroll key={m.name} delay={(i % 4) * 0.05}>
              <div className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-6">
                <h2 className="font-display text-[15px] font-700 uppercase tracking-[0.08em] text-rust" style={{ fontWeight: 700 }}>
                  {m.name}
                </h2>
                {m.days.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-3">
                    {m.days.map((d) => (
                      <li key={d.name} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rust-tint text-[12px] font-medium text-rust-deep">
                          {d.date}
                        </span>
                        <span className="pt-0.5 text-[13.5px] leading-snug text-ink-soft">
                          {d.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-[13.5px] italic text-ink-faint">
                    Sense diada destacada aquest mes.
                  </p>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
