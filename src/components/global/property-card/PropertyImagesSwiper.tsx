import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

interface PropertyImagesSwiperProps {
  propertyImages: { url: string }[];
  propertyName: string;
}

export default function PropertyImagesSwiper({
  propertyImages,
  propertyName,
}: PropertyImagesSwiperProps) {
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
        className="property-images-swiper"
      >
        {propertyImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="h-[300px] rounded-xl w-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={image.url}
              alt={propertyName}
              loading="lazy"
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
