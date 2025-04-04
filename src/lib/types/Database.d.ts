import type {
  PROPERTY_AVAILABILITY,
  PROPERTY_CATEGORY,
  PROPERTY_STATUS,
} from "@lib/constants/property";

export interface TypeCosmicObject<T> {
  slug: string;
  title: string;
  type: string;
  thumbnail: string;
  metadata: T;
}

export interface TypeCosmicImage {
  image: { imgix_url: string; url: string };
}

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
export interface TypeProject {
  description: string;
  minimum_salary: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}
export type TypeCosmicProject = TypeCosmicObject<TypeProject>;
