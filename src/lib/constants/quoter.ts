export const FINANCING_FUND_OPTIONS = [
  {
    label: "BANHPROVI - Vivienda social (≈ 4% anual)",
    value: "banhprovi_social",
  },
  {
    label: "BANHPROVI - Clase media (≈ 7% anual)",
    value: "banhprovi_media",
  },
  {
    label: "Fondos propios / Banco privado (≈ 8-9% anual)",
    value: "fondos_propios",
  },
  { label: "RAP (≈ 10% anual)", value: "rap" },
];

export const FINANCING_FUND_PERCENTAGES = {
  rap: 0.1,
  banhprovi_social: 0.04,
  banhprovi_media: 0.07,
  fondos_propios: 0.085,
};

export const LOAN_TERM_OPTIONS = [
  { label: "30 años", value: "30" },
  { label: "25 años", value: "25" },
  { label: "20 años", value: "20" },
  { label: "15 años", value: "15" },
  { label: "10 años", value: "10" },
  { label: "5 años", value: "5" },
];
