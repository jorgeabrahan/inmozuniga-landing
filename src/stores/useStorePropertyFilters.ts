import type {
  TypePropertyAvailabilityKey,
  TypePropertyCategoryKey,
} from "@lib/types/Application";
import { create } from "zustand";

export type TypePropertyFilterKeys =
  | "status"
  | "category"
  | "bedrooms"
  | "bathrooms"
  | "floors"
  | "parkingLots"
  | "meters"
  | "rods"
  | "total"
  | "installment";
export type TypePropertyFilter = {
  key: TypePropertyFilterKeys;
  value: string | number;
};
interface Store {
  isShowingFilters: boolean;
  filters: {
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
  setIsShowingFilters: (isShowingFilters: boolean) => void;
  setAllFilters: (filters: Store["filters"]) => void;
  setFilter: ({
    key,
    value,
  }: {
    key: TypePropertyFilterKeys;
    value: string | number;
  }) => void;
  setFilters: (filters: TypePropertyFilter[]) => void;
}

export const useStorePropertyFilters = create<Store>((set) => ({
  isShowingFilters: false,
  filters: {
    status: "all",
    category: "all",
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    parkingLots: 0,
    meters: "",
    rods: "",
    total: "",
    installment: "",
  },
  setIsShowingFilters: (isShowingFilters) => set({ isShowingFilters }),
  setAllFilters: (filters) => set({ filters }),
  setFilter: ({ key, value }) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setFilters: (filters) =>
    set((state) => {
      const newFilters: Partial<Store["filters"]> = {};
      filters.forEach(({ key, value }) => {
        newFilters[key] = value as any;
      });
      return {
        filters: {
          ...state.filters,
          ...newFilters,
        },
      };
    }),
}));
