import type { TypeCosmicProperty } from "@lib/types/Database";

const waPropertyText = (property: TypeCosmicProperty) => `
Estoy interesado en obtener información sobre esta propiedad que vi en su sitio web: http://inmozuniga.com/propiedades/${property.slug}
¿Podría hablarme sobre los planes de pago y programar una visita guiada?
`;

export const generateWaUrl = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${text}`;

export const generatePropertyWaUrl = (property: TypeCosmicProperty) =>
  generateWaUrl(
    property.metadata.agent_phone_number,
    encodeURIComponent(waPropertyText(property)),
  );
