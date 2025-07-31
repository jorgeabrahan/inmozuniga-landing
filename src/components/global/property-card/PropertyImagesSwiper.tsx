import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { useState } from "react";

interface PropertyImagesSwiperProps {
  propertyImages: { url: string }[];
  propertyName: string;
}

export default function PropertyImagesSwiper({
  propertyImages,
  propertyName,
}: PropertyImagesSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="group user-select-none rounded-xl overflow-hidden">
      <Swiper
        cssMode={true}
        mousewheel={true}
        slidesPerView={1}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="property-images-swiper"
      >
        {propertyImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className={`h-[300px] rounded-xl w-full object-cover transition-transform duration-500 ${
                index === activeIndex ? "group-hover:scale-110" : ""
              }`}
              src={image.url}
              alt={propertyName}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
