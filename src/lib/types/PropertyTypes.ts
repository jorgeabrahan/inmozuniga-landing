import type { PropertyCategories, PropertyStates } from "@lib/enums";
import type { TypeCosmicImage, TypeCosmicObject } from "./TypesCosmic";
import type {
  PROPERTY_AVAILABILITY,
  PROPERTY_CATEGORY,
  PROPERTY_STATUS,
} from "@lib/constants/property";

export interface TypeProperty {
  availability: {
    key: keyof typeof PROPERTY_AVAILABILITY;
    value: (typeof PROPERTY_AVAILABILITY)[keyof typeof PROPERTY_AVAILABILITY];
  };
  category: {
    key: keyof typeof PROPERTY_CATEGORY;
    value: (typeof PROPERTY_CATEGORY)[keyof typeof PROPERTY_CATEGORY];
  };
  description: string;
  images: TypeCosmicImage[];
  location: string;
  measurements: { rods: number; meters: number };
  prices: { total: number; installment: number };
  status: {
    key: keyof typeof PROPERTY_STATUS;
    value: (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];
  };
  traits: {
    bedrooms: number;
    bathrooms: number;
    floors: number;
    parking_lots: number;
  };
}
export type TypeCosmicProperty = TypeCosmicObject<TypeProperty>;

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
