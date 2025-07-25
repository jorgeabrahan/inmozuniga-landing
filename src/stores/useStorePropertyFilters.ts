import type {
  TypePropertyAvailabilityKey,
  TypePropertyCategoryKey,
} from "@lib/types/Application";
import { create } from "zustand";

type TypeFilterKeys =
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
    key: TypeFilterKeys;
    value: string | number;
  }) => void;
  setFilters: (
    filters: { key: TypeFilterKeys; value: string | number }[],
  ) => void;
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
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
