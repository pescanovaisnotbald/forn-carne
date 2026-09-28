import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Storefront } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import HeroScene from "@/components/HeroScene";
import RevealOnScroll from "@/components/RevealOnScroll";
import TiltCard from "@/components/TiltCard";

const stats = [
  { value: "1948", label: "Any de fundació" },
  { value: "4", label: "Generacions al forn" },
  { value: "5", label: "Botigues a Terrassa" },
];

const teasers = [
  {
    href: "/pa",
    title: "Pa",
    body: "Pa de pagès, pa gallec i el nostre Pain Paillasse, exclusiu a Terrassa.",
    image: "/images/stock/market-loaves.jpg",
    cta: "Veure el pa",
    span: "lg:col-span-7",
  },
  {
    href: "/pastisseria",
    title: "Pastisseria",
    body: "Dolça i salada, feta cada matí amb les mateixes mans de sempre.",
    image: "/images/stock/croissants.jpg",
    cta: "Veure la pastisseria",
    span: "lg:col-span-5",
  },
  {
    href: "/catering",
    title: "Càtering",
    body: "Safates per a esdeveniments, d'infantil a selecte.",
    image: "/images/catering_selecte.jpg",
    cta: "Veure la càtering",
    span: "lg:col-span-5",
  },
  {
    href: "/diades",
    title: "Diades",
    body: "El calendari del pa i les coques de cada diada de l'any.",
    image: "/images/stock/wheat-field.jpg",
    cta: "Consultar les diades",
    span: "lg:col-span-7",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pt-24 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:pt-16">
          <div>
            <h1 className="font-display text-[2.5rem] font-800 leading-[1.05] tracking-[-0.02em] text-ink balance sm:text-[3.25rem] lg:text-[3.75rem]" style={{ fontWeight: 800 }}>
              Pa i pastisseria artesana des de 1948.
            </h1>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
              Cada dia coem el mateix pa de tota la vida al forn de pedra, a Terrassa,
              quatre generacions després.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/pa" variant="primary">
                Veure el pa <ArrowRight size={15} />
              </Button>
              <Button href="/contacte" variant="secondary">
                Com arribar-hi
              </Button>
            </div>

            <HeroScene className="mt-6 h-44 w-full max-w-[280px] sm:h-52 sm:max-w-[320px]" />
          </div>

          <div className="relative aspect-[4/5] w-full max-w-[440px] justify-self-center lg:max-w-none lg:justify-self-end">
            <div className="absolute inset-0 overflow-hidden rounded-[28px]">
              <Image
                src="/images/stock/hero-sourdough.jpg"
                alt="Crosta daurada de pa de forn Carné, acabat de coure"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage stat bar */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-line px-5 sm:px-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 py-8 text-center">
              <span className="font-display text-[2rem] font-800 text-rust sm:text-[2.5rem]" style={{ fontWeight: 800 }}>
                {s.value}
              </span>
              <span className="text-[12px] uppercase tracking-[0.1em] text-ink-soft">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* History narrative */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealOnScroll className="relative aspect-[4/5] overflow-hidden rounded-[28px] lg:order-2">
            <Image
              src="/images/historia_pic.jpg"
              alt="Corrons de fuster antics de l'obrador original de forn Carné"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover grayscale"
            />
          </RevealOnScroll>

          <RevealOnScroll className="lg:order-1">
            <h2 className="font-display text-[2rem] font-700 leading-[1.1] tracking-[-0.01em] text-ink balance sm:text-[2.5rem]" style={{ fontWeight: 700 }}>
              Un forn, quatre generacions.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-[16px] leading-relaxed text-ink-soft">
              <p>
                Tot va començar l&apos;any 1948, quan Francisco Carné va arribar a Terrassa
                procedent de Sant Llorenç Savall i va adquirir un petit forn amb obrador
                al carrer Agricultura.
              </p>
              <p>
                Uns anys més tard va obrir la primera sucursal al carrer Germà Joaquim.
                Amb el canvi generacional cap al seu fill Josep Maria i la seva dona Maria
                Carme, el negoci es va anar estenent pel barri de Can Palet.
              </p>
              <p>
                A principis dels anys 90 va arribar la gran aposta pel centre de
                Terrassa, amb la botiga de la Rambla d&apos;Egara. El 2011 va obrir la
                vuitena sucursal, a l&apos;avinguda Jacquard, ja amb la mirada de la
                generació de Carles Carné Claveria.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Sustainability banner */}
      <RevealOnScroll>
        <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-col items-start gap-6 rounded-[28px] bg-dark px-8 py-10 text-dark-ink sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rust/20 text-rust">
                <Leaf size={20} weight="fill" />
              </span>
              <div>
                <h3 className="font-display text-[20px] font-700" style={{ fontWeight: 700 }}>
                  Cap a l&apos;energia 100% renovable
                </h3>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-dark-ink-soft">
                  Amb el suport dels fons Next Generation EU, hem instal·lat plaques
                  fotovoltaiques per reduir les emissions de CO₂ i avançar cap a un
                  consum i una producció d&apos;energia totalment renovables.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Explore teaser bento */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
        <RevealOnScroll>
          <h2 className="font-display text-[2rem] font-700 tracking-[-0.01em] text-ink sm:text-[2.5rem]" style={{ fontWeight: 700 }}>
            Tot el que couem cada dia.
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {teasers.map((t, i) => (
            <RevealOnScroll key={t.href} delay={i * 0.06} className={`col-span-1 ${t.span}`}>
              <TiltCard max={5} className="h-full">
                <Link
                  href={t.href}
                  className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[24px] p-7"
                >
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
                  <div className="relative text-dark-ink">
                    <h3 className="font-display text-[22px] font-700" style={{ fontWeight: 700 }}>
                      {t.title}
                    </h3>
                    <p className="mt-1.5 max-w-[38ch] text-[14px] leading-relaxed text-dark-ink/85">
                      {t.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-dark-ink">
                      {t.cta}
                      <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Visit CTA */}
      <RevealOnScroll>
        <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:pb-32">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[28px] border border-line bg-surface px-8 py-12 sm:flex-row sm:items-center sm:px-12">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rust-tint text-rust">
                <Storefront size={20} weight="fill" />
              </span>
              <div>
                <h3 className="font-display text-[22px] font-700 text-ink" style={{ fontWeight: 700 }}>
                  Cinc botigues, un mateix pa.
                </h3>
                <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft">
                  Troba la botiga Carné més a prop teu a Terrassa.
                </p>
              </div>
            </div>
            <Button href="/contacte" variant="primary" className="shrink-0">
              Com arribar-hi <ArrowRight size={15} />
            </Button>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
