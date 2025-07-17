import type { TypeCosmicProperty } from "@lib/types/Database";
import { create } from "zustand";

interface Store {
  properties: TypeCosmicProperty[];
  isFetched: boolean;
  isLoading: boolean;
  setProperties: (properties: TypeCosmicProperty[]) => void;
  setIsFetched: (isFetched: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}
export const useStoreProperties = create<Store>((set) => ({
  properties: [],
  isFetched: false,
  isLoading: false,
  setProperties: (properties) => set({ properties }),
  setIsFetched: (isFetched) => set({ isFetched }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
