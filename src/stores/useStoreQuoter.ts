import { create } from "zustand";

interface Store {
  salary: string;
  maxMonthlyPayment: number;
  maxLoanAmount: number;
  maxPropertyPrice: number;
  setQuoteResult: (result: {
    maxMonthlyPayment: number;
    maxLoanAmount: number;
    maxPropertyPrice: number;
    salary: string;
  }) => void;
  reset: () => void;
}
const INITIAL_STATE = {
  salary: "",
  maxMonthlyPayment: 0,
  maxLoanAmount: 0,
  maxPropertyPrice: 0,
};
export const useStoreQuoter = create<Store>((set) => ({
  ...INITIAL_STATE,
  setQuoteResult: ({
    maxMonthlyPayment,
    maxLoanAmount,
    maxPropertyPrice,
    salary,
  }) => set({ maxMonthlyPayment, maxLoanAmount, maxPropertyPrice, salary }),
  reset: () => set(INITIAL_STATE),
}));
