import type { TypeCosmicProperty } from "@lib/types/Database";
import PropertyImagesSwiper from "./PropertyImagesSwiper";
import PropertyState from "./PropertyState";
import PropertyPrice from "./PropertyPrice";
import PropertyTraits from "./PropertyTraits";
import PhoneIcon from "@icons/PhoneIcon";
import MessageTextIcon from "@icons/MessageTextIcon";
import { generatePropertyWaUrl } from "@lib/utils/generateUrl";

interface PropertyCardProps {
  property: TypeCosmicProperty;
  className?: string;
}
export default function PropertyCard({
  property,
  className = "",
}: PropertyCardProps) {
  return (
    <article
      className={`cursor-pointer group ${className}`}
      data-id="property"
      id={property.slug}
    >
      <div className="relative">
        <PropertyImagesSwiper
          propertyImages={[
            { url: property.thumbnail },
            ...property.metadata.images.map((i) => i.image),
          ]}
          propertyName={property.title}
        />
        <PropertyState propertyState={property.metadata.availability.value} />
        <div className="absolute top-3 left-4 z-10 flex items-stretch gap-2">
          <a
            href={`tel:+${property.metadata.agent_phone_number}`}
            className="bg-black-950/80 text-white backdrop-blur-lg rounded-full p-2"
          >
            <PhoneIcon strokeWidth="2" size="14px" />
          </a>
          <a
            href={generatePropertyWaUrl(property)}
            target="_blank"
            className="bg-black-950/80 text-white backdrop-blur-lg rounded-full py-2 px-4 flex items-center gap-2 font-semibold"
          >
            <MessageTextIcon strokeWidth="2" size="14px" />
            <span className="text-[10px]">Mensaje</span>
          </a>
        </div>
      </div>
      <div className="py-2">
        <div className="flex items-center gap-1 justify-between mb-1">
          <h2 className="text-xl font-bold line-clamp-1">{property.title}</h2>
          <span className="capitalize text-sm">
            {property.metadata.category.value}
          </span>
        </div>
        <PropertyPrice
          propertyState={property.metadata.availability.value}
          propertyPrice={{
            fee: property.metadata.prices.installment,
            total: property.metadata.prices.total,
          }}
        />
        <PropertyTraits property={property} />
      </div>
    </article>
  );
}
