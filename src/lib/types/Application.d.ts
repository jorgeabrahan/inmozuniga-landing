import type {
  PROPERTY_AVAILABILITY,
  PROPERTY_CATEGORY,
  PROPERTY_STATUS,
} from "@lib/constants/property";

export type TypePropertyAvailabilityKey = keyof typeof PROPERTY_AVAILABILITY;
export type TypePropertyAvailability =
  (typeof PROPERTY_AVAILABILITY)[TypePropertyAvailabilityKey];

export type TypePropertyCategoryKey = keyof typeof PROPERTY_CATEGORY;
export type TypePropertyCategory =
  (typeof PROPERTY_CATEGORY)[TypePropertyCategoryKey];

export type TypePropertyStatusKey = keyof typeof PROPERTY_STATUS;
export type TypePropertyStatus =
  (typeof PROPERTY_STATUS)[TypePropertyStatusKey];
