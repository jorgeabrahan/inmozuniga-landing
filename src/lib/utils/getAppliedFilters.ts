import type {
  TypePropertyAvailabilityKey,
  TypePropertyCategoryKey,
} from "@lib/types/Application";

type TypePropertyFilters = {
  status: TypePropertyAvailabilityKey | "all";
  category: TypePropertyCategoryKey | "all";
  bedrooms: number;
  bathrooms: number;
  floors: number;
  parkingLots: number;
  meters: string;
  rods: string;
  total: string;
  installment: string;
};

export function getAppliedFilters(filters: TypePropertyFilters) {
  const applied: Partial<TypePropertyFilters> = {};

  if (filters.status !== "all") applied.status = filters.status;
  if (filters.category !== "all") applied.category = filters.category;

  if (filters.bedrooms > 0) applied.bedrooms = filters.bedrooms;
  if (filters.bathrooms > 0) applied.bathrooms = filters.bathrooms;
  if (filters.floors > 0) applied.floors = filters.floors;
  if (filters.parkingLots > 0) applied.parkingLots = filters.parkingLots;

  if (filters.meters.trim() && +filters.meters > 0)
    applied.meters = filters.meters;
  if (filters.rods.trim() && +filters.rods > 0) applied.rods = filters.rods;
  if (filters.total.trim() && +filters.total > 0) applied.total = filters.total;
  if (filters.installment.trim() && +filters.installment > 0)
    applied.installment = filters.installment;

  return applied;
}
