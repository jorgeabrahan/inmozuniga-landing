export const social = {
  whatsappMessage:
    "Vengo del sitio web de Inmobiliaria Zúniga y Asoc. y me encuentro interesado en sus ponerme en contacto con un agente inmobiliario lo mas pronto posible.",
  facebookUser: "inmobiliariazunigayasociados",
  instagramUser: "inmobiliariazuniga",
};

export const columns = [
  {
    title: "Compra",
    links: [
      {
        text: "Vivienda",
        url: "/propiedades?status=sale&category=house",
      },
      {
        text: "Condominio",
        url: "/propiedades?status=sale&category=condominium",
      },
      {
        text: "Town House",
        url: "/propiedades?status=sale&category=townHouse",
      },
      {
        text: "Terreno",
        url: "/propiedades?status=sale&category=land",
      },
    ],
  },
  {
    title: "Renta",
    links: [
      {
        text: "Apartamento",
        url: "/propiedades?status=rent&category=apartment",
      },
      {
        text: "Condominio",
        url: "/propiedades?status=rent&category=condominium",
      },
      {
        text: "Local Comercial",
        url: "/propiedades?status=rent&category=commercialPremises",
      },
      {
        text: "Nave Industrial",
        url: "/propiedades?status=rent&category=industrialUnit",
      },
    ],
  },
  {
    title: "Navega",
    links: [
      { text: "Propiedades", url: "/propiedades#properties-section" },
      { text: "Proyectos", url: "/proyectos" },
      { text: "Contáctanos", url: "/#contact-section" },
      { text: "Cotización", url: "/#quoter-section" },
    ],
  },
];
