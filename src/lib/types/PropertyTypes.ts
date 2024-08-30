import type { PropertyCategories, PropertyStates } from "@lib/enums";

export type PropertyType = {
  id: string;
  name: string;
  description: string;
  category: PropertyCategories;
  state: PropertyStates;
  location: string;
  measurements: {
    yards: number;
    meters: number;
  };
  media: {
    video: string;
    images: string[];
  };
  price: {
    total: number;
    fee: number;
  };
  traits: {
    bedrooms: number;
    levels: number;
    parkingLots: number;
    bathrooms: number;
  };
};

export type DBPropertyType = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: PropertyCategories;
  estado: PropertyStates;
  ubicacion: string;
  varas: string;
  metros: string;
  video: string;
  costoTotal: string;
  cuota: string;
  dormitorios: string;
  niveles: string;
  estacionamientos: string;
  banios: string;
};
