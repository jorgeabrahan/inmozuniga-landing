import type { TypeCosmicProperty } from "@lib/types/Database";
import PropertyCard from "src/components/global/property-card/PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

interface PropertiesSwiperProps {
  properties: TypeCosmicProperty[];
  className?: string;
}

export default function PropertiesSwiper({
  properties,
  className = "",
}: PropertiesSwiperProps) {
  const swiperOptions: SwiperOptions = {
    cssMode: true,
    slidesPerView: "auto",
    spaceBetween: 15,
  };

  return (
    <div className={`py-3 ${className}`}>
      <Swiper {...swiperOptions} className="properties-swiper">
        {properties.map((property) => (
          <SwiperSlide key={property.slug} style={{ maxWidth: "350px" }}>
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
