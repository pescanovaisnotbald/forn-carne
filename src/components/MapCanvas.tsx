"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Location } from "@/lib/locations";

function pinIcon(active: boolean) {
  const size = active ? 34 : 26;
  const fill = active ? "#c2410c" : "#1a1a1e";
  return L.divIcon({
    className: "carne-pin",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,.35))">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.373 18.627 0 12 0z" fill="${fill}"/>
      <circle cx="12" cy="12" r="4.5" fill="#fdfcfa"/>
    </svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

export default function MapCanvas({
  locations,
  activeId,
  onSelect,
}: {
  locations: Location[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([41.5595, 2.018], 13.3);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Esri's light-gray canvas basemap: clean, no API key required.
    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
        maxZoom: 16,
      }
    ).addTo(map);
    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 16 }
    ).addTo(map);

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon(false) })
        .addTo(map)
        .on("click", () => onSelect(loc.id));
      markersRef.current[loc.id] = marker;
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      marker.setIcon(pinIcon(id === activeId));
      marker.setZIndexOffset(id === activeId ? 1000 : 0);
    });
    if (activeId && mapRef.current) {
      const loc = locations.find((l) => l.id === activeId);
      if (loc) {
        mapRef.current.flyTo([loc.lat, loc.lng], 15, { duration: 0.8 });
      }
    }
  }, [activeId, locations]);

  return <div ref={containerRef} className="h-full w-full" />;
}
