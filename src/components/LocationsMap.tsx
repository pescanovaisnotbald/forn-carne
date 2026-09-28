"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowUpRight, Storefront } from "@phosphor-icons/react";
import { locations, mapsDirectionsUrl } from "@/lib/locations";

const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-paper-deep text-sm text-ink-faint">
      Carregant el mapa…
    </div>
  ),
});

export default function LocationsMap() {
  const [activeId, setActiveId] = useState<string | null>(locations[0].id);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_1px_2px_rgba(26,26,30,0.04)] lg:grid-cols-[1.3fr_1fr]">
      <div className="h-[340px] lg:h-[520px]">
        <MapCanvas locations={locations} activeId={activeId} onSelect={setActiveId} />
      </div>

      <div className="flex flex-col divide-y divide-line lg:h-[520px] lg:overflow-y-auto">
        {locations.map((loc) => {
          const active = loc.id === activeId;
          return (
            <a
              key={loc.id}
              href={mapsDirectionsUrl(loc)}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveId(loc.id)}
              onFocus={() => setActiveId(loc.id)}
              className="group flex items-start justify-between gap-4 px-6 py-5 transition-colors duration-150 ease-out hover:bg-paper-deep focus-visible:bg-paper-deep focus-visible:outline-none"
              style={{ backgroundColor: active ? "var(--paper-deep)" : "transparent" }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rust-tint text-rust">
                  <Storefront size={16} weight="fill" />
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-ink">
                    {loc.name}
                    {loc.isMain && (
                      <span className="ml-2 rounded-full bg-rust/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rust">
                        Principal
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[13px] text-ink-soft transition-colors duration-150 group-hover:text-ink-soft/80">
                    {loc.street}, {loc.postal}
                  </span>
                  {loc.phone && (
                    <span className="mt-1 block text-[13px] text-ink-faint">{loc.phone}</span>
                  )}
                </span>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1.5 shrink-0 text-ink-faint transition-colors duration-150 group-hover:text-rust"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
