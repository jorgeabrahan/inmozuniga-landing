import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const PropertySwiper = () => {
  return (
    <div className="">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="property-swiper"
      >
        <SwiperSlide className="property-swiper-slide">Slide 1</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 2</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 3</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 4</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 5</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 6</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 7</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 8</SwiperSlide>
        <SwiperSlide className="property-swiper-slide">Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};
