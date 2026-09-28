import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cabinetGrotesk = localFont({
  src: [
    { path: "../../public/fonts/CabinetGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/CabinetGrotesk-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/CabinetGrotesk-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "../../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Forn Carné — Pa i pastisseria artesana des de 1948",
    template: "%s · Forn Carné",
  },
  description:
    "Forn de pa i pastisseria artesana a Terrassa des de 1948. Pa de forn de pedra, pastisseria dolça i salada, càtering per a esdeveniments i el calendari de diades de tota la vida.",
  metadataBase: new URL("https://www.forncarne.cat"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ca"
      className={`${cabinetGrotesk.variable} ${generalSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
