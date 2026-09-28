import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import RevealOnScroll from "@/components/RevealOnScroll";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Càtering",
  description:
    "Safates de càtering forn Carné per a esdeveniments: infantil, bàsic, especial i selecte. Comandes al 93 785 79 49.",
};

type Item = { name: string; qty: string };

type Tier = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  menjar: Item[];
  postres: Item[];
};

const tiers: Tier[] = [
  {
    id: "infantil",
    title: "Carné infantil",
    subtitle: "Pensat per a celebracions amb els més petits",
    image: "/images/catering_infantil.jpg",
    menjar: [
      { name: "Croissant mini banyes", qty: "1 unitat" },
      { name: "Ensaïmada mini", qty: "1 unitat" },
      { name: "Entrepà viena mini salat", qty: "1 unitat" },
    ],
    postres: [{ name: "Pa de pessic amb xocolata o pastís d'aniversari", qty: "100 g" }],
  },
  {
    id: "basic",
    title: "Carné bàsic",
    subtitle: "El punt de partida per a qualsevol trobada",
    image: "/images/catering_basic.jpg",
    menjar: [
      { name: "Entrepà viena mini salat", qty: "1 unitat" },
      { name: "Entrepà brioix mini bikini", qty: "1 unitat" },
      { name: "Pizza pernil dolç", qty: "2 porcions" },
      { name: "Coca d'oli truita", qty: "1 porció" },
      { name: "Croissant mini salat, 4 gustos", qty: "4 unitats" },
    ],
    postres: [
      { name: "Full dolç variat, coca de forner o pastís d'aniversari amb foto", qty: "100 g" },
    ],
  },
  {
    id: "especial",
    title: "Carné especial",
    subtitle: "Una selecció més àmplia per a ocasions assenyalades",
    image: "/images/catering_especial.jpg",
    menjar: [
      { name: "Panet d'olives americà", qty: "1 unitat" },
      { name: "Croquetes", qty: "2 unitats" },
      { name: "Coca de recapte escalivada", qty: "2 porcions" },
      { name: "Xapata mini amb pernil", qty: "1 unitat" },
      { name: "Montaditos variats amb pa suís", qty: "1 unitat" },
      { name: "Truita de patates", qty: "degustació" },
      { name: "Croissant mini farcit de salmó", qty: "1 unitat" },
    ],
    postres: [{ name: "Full dolç variat o pastís a escollir", qty: "75 g" }],
  },
  {
    id: "selecte",
    title: "Carné selecte",
    subtitle: "La proposta més completa de la casa",
    image: "/images/catering_selecte.jpg",
    menjar: [
      { name: "Full salat", qty: "2 porcions" },
      { name: "Banda de full amb pernil ibèric", qty: "2 porcions" },
      { name: "Coca de recapte", qty: "1 unitat" },
      { name: "Rotllet de salmó mini", qty: "1 unitat" },
      { name: "Montaditos variats amb pa suís", qty: "3 unitats" },
      { name: "Canapès variats", qty: "1 unitat" },
      { name: "Vol-au-vents petits de gambes", qty: "1 unitat" },
      { name: "Eclairs de rocafort i nous", qty: "1 unitat" },
    ],
    postres: [{ name: "Rebosteria, full dolç variat o pastís a escollir", qty: "75 g" }],
  },
];

const begudes = ["Aigua", "Sucs de fruites, 1,5 L", "Cacaolat", "Refresc, 2 L", "Vi", "Cava Perelada", "Cava Parxet"];
const serveis = ["Got", "Plat", "Coberts", "Tovalló"];

export default function CateringPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-32 sm:px-8 lg:pt-40">
        <RevealOnScroll>
          <h1 className="font-display text-[2.25rem] font-800 tracking-[-0.02em] text-ink balance sm:text-[3rem]" style={{ fontWeight: 800 }}>
            Càtering per a cada ocasió.
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
            Quatre safates pensades per a tota mena de trobades, de l&apos;aniversari
            infantil a la celebració més formal. Totes es preparen el mateix dia, amb
            els mateixos productes de sempre.
          </p>
          <div className="mt-7">
            <Button href="tel:937857949" variant="primary">
              <Phone size={15} /> Comandes 93 785 79 49
            </Button>
          </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-16 sm:px-8">
        <div className="flex flex-col gap-5">
          {tiers.map((tier, i) => (
            <RevealOnScroll key={tier.id} delay={i * 0.05}>
              <Accordion title={tier.title} subtitle={tier.subtitle} defaultOpen={i === 0}>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-[160px_1fr]">
                  <div className="relative h-40 w-full overflow-hidden rounded-[16px] sm:h-full sm:w-[160px]">
                    <Image src={tier.image} alt={tier.title} fill sizes="160px" className="object-cover" />
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                        Menjar
                      </p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {tier.menjar.map((item) => (
                          <li key={item.name} className="flex items-baseline justify-between gap-4 text-[14.5px]">
                            <span className="text-ink">{item.name}</span>
                            <span className="shrink-0 text-ink-faint">{item.qty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                        Postres
                      </p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {tier.postres.map((item) => (
                          <li key={item.name} className="flex items-baseline justify-between gap-4 text-[14.5px]">
                            <span className="text-ink">{item.name}</span>
                            <span className="shrink-0 text-ink-faint">{item.qty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Accordion>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:pb-32">
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-[24px] border border-line bg-surface p-7">
              <h3 className="font-display text-[18px] font-700 text-ink" style={{ fontWeight: 700 }}>
                Begudes
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {begudes.map((b) => (
                  <li key={b} className="rounded-full bg-paper-deep px-3.5 py-1.5 text-[13px] text-ink-soft">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-line bg-surface p-7">
              <h3 className="font-display text-[18px] font-700 text-ink" style={{ fontWeight: 700 }}>
                Serveis inclosos
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {serveis.map((s) => (
                  <li key={s} className="rounded-full bg-paper-deep px-3.5 py-1.5 text-[13px] text-ink-soft">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
