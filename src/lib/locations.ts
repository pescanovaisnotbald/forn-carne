export type Location = {
  id: string;
  name: string;
  street: string;
  postal: string;
  phone?: string;
  fax?: string;
  isMain?: boolean;
  lat: number;
  lng: number;
};

export const locations: Location[] = [
  {
    id: "agricultura",
    name: "Botiga principal",
    street: "Carrer de l'Agricultura, 54",
    postal: "08223 Terrassa",
    phone: "93 785 79 49",
    fax: "93 785 30 32",
    isMain: true,
    lat: 41.5573192,
    lng: 2.0232333,
  },
  {
    id: "raval-montserrat",
    name: "Raval de Montserrat",
    street: "Raval de Montserrat, 32",
    postal: "08221 Terrassa",
    phone: "93 789 16 50",
    lat: 41.5632545,
    lng: 2.0094376,
  },
  {
    id: "jacquard",
    name: "Avinguda Jacquard",
    street: "Avinguda de Jacquard, 40",
    postal: "08222 Terrassa",
    phone: "93 783 63 14",
    lat: 41.5635695,
    lng: 2.0195925,
  },
  {
    id: "germa-joaquim",
    name: "Germà Joaquim",
    street: "Carrer del Germà Joaquim, 43",
    postal: "08223 Terrassa",
    phone: "93 785 37 87",
    lat: 41.5532104,
    lng: 2.0215891,
  },
  {
    id: "topete",
    name: "Topete",
    street: "Carrer de Topete, 84",
    postal: "08221 Terrassa",
    phone: "93 783 89 07",
    lat: 41.560286,
    lng: 2.017167,
  },
];

export function mapsDirectionsUrl(loc: Location) {
  const q = encodeURIComponent(`${loc.street}, ${loc.postal}, Terrassa`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}
