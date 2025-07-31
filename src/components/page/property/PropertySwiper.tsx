import Delimiter from "@layouts/Delimiter";
import type { TypeCosmicProperty } from "@lib/types/Database";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const PropertySwiper = ({
  property,
}: {
  property: TypeCosmicProperty;
}) => {
  const [isDesktopSize, setIsDesktopSize] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(width > 1200px)");
    setIsDesktopSize(mql.matches);

    const onResize = (event: MediaQueryListEvent) => {
      setIsDesktopSize(event.matches);
    };

    mql.addEventListener("change", onResize);
    return () => mql.removeEventListener("change", onResize);
  }, []);
  const images = [
    property.thumbnail,
    ...property.metadata.images.map((obj) => obj.image.url),
  ];
  let header = (
    <Swiper
      cssMode={true}
      slidesPerView={"auto"}
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="property-swiper"
    >
      {images.map((url) => (
        <SwiperSlide className="property-swiper-slide" key={url}>
          <img src={url} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
  if (isDesktopSize) {
    header = (
      <Delimiter className="property-images">
        {images.map((url) => (
          <div key={url}>
            <img className="object-cover" src={url} />
          </div>
        ))}
      </Delimiter>
    );
  }
  return <>{header}</>;
};
