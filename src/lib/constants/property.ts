import type { TypePropertyCategoryKey } from "@lib/types/Application";

export const PROPERTY_MEASUREMENT_TYPE_KEYS = {
  meters: "meters",
  rods: "rods",
} as const;
export const PROPERTY_MEASUREMENT_TYPE = {
  meters: "Metros",
  rods: "Varas",
} as const;

export const PROPERTY_SHARED_CATEGORIES = [
  "house",
  "condominium",
  "townHouse",
] as const;
export const PROPERTY_SALE_CATEGORIES = [
  "house",
  "condominium",
  "townHouse",
  "land",
] as const;
export const PROPERTY_RENT_CATEGORIES = [
  "house",
  "apartment",
  "condominium",
  "townHouse",
  "commercialPremises",
  "warehouse",
  "industrialUnit",
] as const;

export const PROPERTY_TRAIT_FILTERS_BY_CATEGORY = {
  all: {
    bedrooms: false,
    bathrooms: false,
    floors: false,
    parkingLots: false,
  },
  house: {
    bedrooms: true,
    bathrooms: true,
    floors: true,
    parkingLots: true,
  },
  apartment: {
    bedrooms: true,
    bathrooms: true,
    floors: true,
    parkingLots: true,
  },
  condominium: {
    bedrooms: true,
    bathrooms: true,
    floors: false,
    parkingLots: false,
  },
  townHouse: {
    bedrooms: true,
    bathrooms: true,
    floors: true,
    parkingLots: false,
  },
  commercialPremises: {
    bedrooms: false,
    bathrooms: true,
    floors: false,
    parkingLots: true,
  },
  warehouse: {
    bedrooms: false,
    bathrooms: false,
    floors: false,
    parkingLots: false,
  },
  industrialUnit: {
    bedrooms: false,
    bathrooms: false,
    floors: false,
    parkingLots: false,
  },
  land: {
    bedrooms: false,
    bathrooms: false,
    floors: false,
    parkingLots: false,
  },
} as const;

export const PROPERTY_CATEGORY = {
  house: "Vivienda",
  apartment: "Apartamento",
  condominium: "Condominio",
  townHouse: "Townhouse",
  commercialPremises: "Local Comercial",
  warehouse: "Bodega",
  industrialUnit: "Nave Industrial",
  land: "Terreno",
} as const;

export const DEFAULT_PROPERTY_CATEGORY = "all";

export const PROPERTY_CATEGORY_KEYS = {
  house: "house",
  apartment: "apartment",
  condominium: "condominium",
  townHouse: "townHouse",
  commercialPremises: "commercialPremises",
  warehouse: "warehouse",
  industrialUnit: "industrialUnit",
  land: "land",
} as const;

export const PROPERTY_CATEGORY_MEASUREMENT_TYPE: Record<
  TypePropertyCategoryKey,
  keyof typeof PROPERTY_MEASUREMENT_TYPE_KEYS
> = {
  house: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  apartment: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  condominium: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  townHouse: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  commercialPremises: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  warehouse: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  industrialUnit: PROPERTY_MEASUREMENT_TYPE_KEYS.meters,
  land: PROPERTY_MEASUREMENT_TYPE_KEYS.rods,
} as const;

export const PROPERTY_AVAILABILITY = {
  sale: "Venta",
  rent: "Renta",
} as const;

export const DEFAULT_PROPERTY_AVAILABILITY = "all";

export const PROPERTY_AVAILABILITY_KEYS = {
  sale: "sale",
  rent: "rent",
} as const;

export const PROPERTY_STATUS = {
  available: "Disponible",
  inNegotiation: "En negociación",
  soldOrRented: "Vendida / Rentada",
} as const;

export const PROPERTY_STATUS_KEYS = {
  available: "available",
  inNegotiation: "inNegotiation",
  soldOrRented: "soldOrRented",
} as const;
