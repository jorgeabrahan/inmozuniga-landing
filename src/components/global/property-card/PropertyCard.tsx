import type { TypeCosmicProperty } from "@lib/types/Database";
import PropertyImagesSwiper from "./PropertyImagesSwiper";
import PropertyState from "./PropertyState";
import PropertyPrice from "./PropertyPrice";
import PropertyTraits from "./PropertyTraits";
import PhoneIcon from "@icons/PhoneIcon";
import MessageTextIcon from "@icons/MessageTextIcon";
import { generatePropertyWaUrl } from "@lib/utils/generateUrl";
import { UtilsFormat } from "@lib/utils/UtilsFormat";
import { WhatsappIcon } from "@icons/WhatsappIcon";

interface PropertyCardProps {
  property: TypeCosmicProperty;
  className?: string;
}
export default function PropertyCard({
  property,
  className = "",
}: PropertyCardProps) {
  const goToDetail = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a")) return;
    window.location.href = `/propiedades/${property.slug}`;
  };
  return (
    <article
      className={`cursor-pointer group ${className}`}
      data-id="property"
      id={property.slug}
      onClick={goToDetail}
    >
      <div className="relative">
        <PropertyImagesSwiper
          propertyImages={[
            { url: property.thumbnail },
            ...property.metadata.images.map((i) => i.image),
          ]}
          propertyName={property.title}
        />
        <PropertyState property={property} />
      </div>
      <div className="py-2">
        <h2 className="text-xl font-bold line-clamp-1">{property.title}</h2>
        <p className="line-clamp-1 text-sm mb-1 text-black-800 font-light">
          {UtilsFormat.asPlainText(property.metadata.description)}
        </p>

        <div className="flex items-center justify-between mb-1">
          <PropertyPrice
            propertyState={property.metadata.availability.value}
            propertyPrice={{
              fee: property.metadata.prices.installment,
              total: property.metadata.prices.total,
            }}
          />
          <a
            href={generatePropertyWaUrl(property)}
            target="_blank"
            className="bg-black backdrop-blur-md text-white rounded-full py-2 px-[14px] flex items-center gap-[6px] md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsappIcon size="16px" />
            <span className="text-[10px] font-light leading-[normal]">
              Contáctanos
            </span>
          </a>
        </div>
        <PropertyTraits property={property} />
      </div>
    </article>
  );
}
