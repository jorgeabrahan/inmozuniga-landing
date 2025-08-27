import type {
  PROPERTY_AVAILABILITY,
  PROPERTY_CATEGORY,
  PROPERTY_STATUS,
} from "@lib/constants/property";
import type {
  TypePropertyAvailability,
  TypePropertyAvailabilityKey,
  TypePropertyCategory,
  TypePropertyCategoryKey,
  TypePropertyStatus,
  TypePropertyStatusKey,
} from "./Application";

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
    key: TypePropertyAvailabilityKey;
    value: TypePropertyAvailability;
  };
  category: {
    key: TypePropertyCategoryKey;
    value: TypePropertyCategory;
  };
  description: string;
  images: TypeCosmicImage[];
  location: string;
  agent_phone_number: string;
  measurements: { rods: number; meters: number };
  prices: { total: number; installment: number };
  status: {
    key: TypePropertyStatusKey;
    value: TypePropertyStatus;
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
  long_description: string;
  minimum_salary: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  images: {
    image: {
      url: string;
      imgix_url: string;
    };
  }[];
}
export type TypeCosmicProject = TypeCosmicObject<TypeProject>;
