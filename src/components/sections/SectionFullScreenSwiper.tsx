import CloseIcon from "@icons/CloseIcon";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const SectionFullScreenSwiper = ({
  initialImageDisplaying,
  images,
  onClose,
}: {
  initialImageDisplaying: string | null;
  images: string[];
  onClose: () => void;
}) => {
  const initialSlide = initialImageDisplaying
    ? images.findIndex((url) => url === initialImageDisplaying)
    : 0;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/85 z-[1000] py-16 xl:py-20">
      <Swiper
        initialSlide={initialSlide >= 0 ? initialSlide : 0}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="h-full w-full [&>.swiper-pagination]:text-white"
      >
        {images.map((url) => (
          <SwiperSlide
            className="w-full h-full !flex !items-center !justify-center"
            key={url}
          >
            <img className="object-contain" src={url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="absolute top-4 right-4 text-white flex items-center gap-1 bg-black-700 hover:bg-black-600 transition-colors duration-300 px-3 py-[6px] rounded-lg [&_*]:pointer-events-none"
        onClick={onClose}
      >
        <CloseIcon size="20" strokeWidth="2" />
        <span>Cerrar</span>
      </button>
    </div>
  );
};
