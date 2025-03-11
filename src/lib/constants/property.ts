export const PROPERTY_CATEGORY = {
  house: "Vivienda",
  apartment: "Apartamento",
  condominium: "Condominio",
  townHouse: "Townhouse",
  residentialLand: "Terreno Residencial",
  beachLand: "Terreno de Playa",
  investmentProperty: "Propiedad de Inversion",
  commercialLocal: "Local Comercial",
  warehouse: "Bodega",
  industrialUnit: "Nave Industrial",
} as const;

export const PROPERTY_AVAILABILITY = {
  sale: "Venta",
  rent: "Renta",
} as const;

export const PROPERTY_STATUS = {
  available: "Disponible",
  inNegotiation: "En negociación",
  soldOrRented: "Vendida / Rentada",
} as const;
