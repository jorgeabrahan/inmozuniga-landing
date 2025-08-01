import { DotsGridIcon } from "@icons/DotsGridIcon";
import Delimiter from "@layouts/Delimiter";
import type { TypeCosmicProperty } from "@lib/types/Database";
import { useEffect, useMemo, useState } from "react";
import { SectionFullScreenSwiper } from "src/components/sections/SectionFullScreenSwiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const INITIAL_GALLERY_OPTIONS = {
  isShowing: false,
  imageToDisplay: "",
};

export const PropertySwiper = ({
  property,
}: {
  property: TypeCosmicProperty;
}) => {
  const [isDesktopSize, setIsDesktopSize] = useState(false);
  const [galleryOptions, setGalleryOptions] = useState<{
    isShowing: boolean;
    imageToDisplay: string | null;
  }>(INITIAL_GALLERY_OPTIONS);
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

  const openGallery = (image?: string) => {
    window.document.body.style.overflow = "hidden";
    setGalleryOptions({
      isShowing: true,
      imageToDisplay: image ?? null,
    });
  };
  const closeGallery = () => {
    window.document.body.style.overflow = "";
    setGalleryOptions(INITIAL_GALLERY_OPTIONS);
  };

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
          <SwiperSlide
            className="property-swiper-slide"
            key={url}
            onClick={() => {
              openGallery(url);
            }}
          >
            <img src={url} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
  if (isDesktopSize) {
    header = (
      <Delimiter className="property-images relative">
        {images.map((url) => (
          <div
            className={`relative cursor-pointer ${isNaN(Number(url)) && "after:content-[''] after:absolute after:inset-0 after:bg-gray-600/0 hover:after:bg-black/15 after:z-10 after:transition-colors after:duration-300"}`}
            onClick={() => {
              if (isNaN(Number(url))) openGallery(url);
            }}
            key={url}
          >
            {isNaN(Number(url)) ? (
              <img className="object-cover" src={url} />
            ) : (
              <div className="w-full h-full bg-gray-600/10" />
            )}
          </div>
        ))}
        <button
          className="flex items-center gap-2 absolute right-6 bottom-6 mr-8 z-20 bg-white hover:bg-gray-100 transition-colors duration-300 border border-solid border-black px-3 py-[6px] rounded-lg [&_*]:pointer-events-none"
          onClick={() => openGallery()}
        >
          <DotsGridIcon size="20" />
          <span>Abrir galería</span>
        </button>
      </Delimiter>
    );
  }
  return (
    <>
      {header}
      {galleryOptions.isShowing && (
        <SectionFullScreenSwiper
          initialImageDisplaying={galleryOptions.imageToDisplay}
          images={[
            property.thumbnail,
            ...property.metadata.images.map((obj) => obj.image.url),
          ]}
          onClose={closeGallery}
        />
      )}
    </>
  );
};
