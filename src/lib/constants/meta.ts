type PageMeta = {
  title: string;
  description: string;
  keywords: string;
};

type Pages =
  | "index"
  | "propiedades"
  | "propiedad"
  | "proyectos"
  | "contactanos"
  | "cotizador"
  | "politicas";

export const meta: { [K in Pages]: PageMeta } = {
  index: {
    title:
      "Inmobiliaria Zúniga | Líderes en Bienes Raíces | Casas, Apartamentos y Terrenos en Venta y Alquiler",
    description:
      "Inmobiliaria Zúniga, líderes en bienes raíces. Descubre la mejor selección de viviendas, apartamentos, condominios, town houses, terrenos, locales comerciales, bodegas y naves industriales en venta y alquiler en tu localidad. Nuestro equipo de expertos está listo para ayudarte a encontrar la propiedad de tus sueños.",
    keywords:
      "Inmobiliaria Zúniga, Líderes en Bienes Raíces, Casas en Venta, Apartamentos en Venta, Propiedades en Alquiler, Agente Inmobiliario, Propiedades Locales, Compra de Casas, Alquiler de Apartamentos, Terrenos en Venta, Proyectos Residenciales, Condominios en Venta",
  },
  propiedades: {
    title: "Propiedades en Venta y Alquiler | Inmobiliaria Zúniga",
    description:
      "Explora nuestra amplia selección de viviendas, apartamentos, condominios, town houses, terrenos, locales comerciales, bodegas y naves industriales en venta y alquiler. Encuentra la propiedad perfecta para ti con Inmobiliaria Zúniga.",
    keywords:
      "Propiedades en Venta, Propiedades en Alquiler, Casas, Apartamentos, Condominios, Town Houses, Terrenos, Locales Comerciales, Bodegas, Naves Industriales, Inmobiliaria Zúniga",
  },
  propiedad: {
    title: "Detalles de la Propiedad | Inmobiliaria Zúniga",
    description:
      "Obtén todos los detalles que necesitas sobre nuestras propiedades en venta y alquiler. Inmobiliaria Zúniga te ayuda a tomar la mejor decisión.",
    keywords:
      "Detalles de la Propiedad, Propiedades en Venta, Propiedades en Alquiler, Inmobiliaria Zúniga",
  },
  proyectos: {
    title: "Proyectos Inmobiliarios | Inmobiliaria Zúniga",
    description:
      "Descubre nuestros emocionantes proyectos inmobiliarios y encuentra la propiedad de tus sueños. Ofrecemos proyectos residenciales, de condominios y de venta de terrenos. Inmobiliaria Zúniga, líderes en bienes raíces.",
    keywords:
      "Proyectos Inmobiliarios, Propiedades Nuevas, Proyectos Residenciales, Venta de Terrenos, Condominios, Inmobiliaria Zúniga",
  },
  contactanos: {
    title: "Contáctanos | Inmobiliaria Zúniga",
    description:
      "¿Tienes alguna pregunta o necesitas ayuda para encontrar la propiedad perfecta? Contáctanos, estamos aquí para ayudarte.",
    keywords: "Contacto, Ayuda, Inmobiliaria Zúniga",
  },
  cotizador: {
    title: "Cotizador de Propiedades | Inmobiliaria Zúniga",
    description:
      "Utiliza nuestro cotizador de propiedades para ver a qué propiedades o proyectos puedes aplicar según tu salario mensual. Inmobiliaria Zúniga, facilitando tu búsqueda de la propiedad perfecta.",
    keywords: "Cotizador de Propiedades, Salario Mensual, Inmobiliaria Zúniga",
  },
  politicas: {
    title: "Políticas | Inmobiliaria Zúniga",
    description:
      "Conoce nuestras políticas y entiende cómo trabajamos para proporcionarte el mejor servicio en bienes raíces.",
    keywords: "Políticas, Términos y Condiciones, Inmobiliaria Zúniga",
  },
};
