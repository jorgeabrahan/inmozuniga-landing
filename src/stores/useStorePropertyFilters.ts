import type {
  TypePropertyAvailabilityKey,
  TypePropertyCategoryKey,
} from "@lib/types/Application";
import { create } from "zustand";

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
  setFilters: (filters: Store["filters"]) => void;
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
  setFilters: (filters) => set({ filters }),
}));
