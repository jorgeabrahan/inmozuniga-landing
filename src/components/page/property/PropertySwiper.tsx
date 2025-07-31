import Delimiter from "@layouts/Delimiter";
import type { TypeCosmicProperty } from "@lib/types/Database";
import { useEffect, useMemo, useState } from "react";
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
  const images = useMemo(() => {
    const tempImages = [
      property.thumbnail,
      ...property.metadata.images.map((obj) => obj.image.url),
    ];
    if (tempImages.length > 5) {
      tempImages.splice(5);
    }
    if (tempImages.length < 5) {
      const placeholdersToInsert = 5 - tempImages.length;
      const placeholderItems = Array(placeholdersToInsert)
        .fill(0)
        .map((_, i) => `${i + 1}`);
      tempImages.push(...placeholderItems);
    }
    return tempImages;
  }, [property]);

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
      {images
        .filter((i) => isNaN(Number(i)))
        .map((url) => (
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
          <div
            className="relative after:content-[''] after:absolute after:inset-0 after:bg-gray-600/0 hover:after:bg-black/15 after:z-10 after:transition-colors after:duration-300 cursor-pointer"
            key={url}
          >
            {isNaN(Number(url)) ? (
              <img className="object-cover" src={url} />
            ) : (
              <div className="w-full h-full bg-gray-600/10" />
            )}
          </div>
        ))}
      </Delimiter>
    );
  }
  return <>{header}</>;
};
