import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper styles
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import dynamic from "next/dynamic";
const AttractionImage = dynamic(
  () => import("../S/Attractions/AttractionImage"),
  {
    ssr: false,
  }
);
const AttractionCarousel = ({ photos, id }) => {
  const slideCount = Array.isArray(photos) && photos.length > 0 ? photos.length : 1;
  return (
    <Swiper
      modules={[Navigation]}
      speed={400}
      navigation={true}
      lazyPreloadPrevNext={0}
      loop={slideCount > 1}
    >
      {Array.from({ length: slideCount })?.map((_, i) => {
        return (
          <SwiperSlide key={i}>
            <div className="slide-background">
              <AttractionImage
                attraction={id}
                size={1000}
                quality={70}
                index={i + 1}
                sizes={"(max-width:600px) 100vw, 500px"}
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default React.memo(AttractionCarousel);
