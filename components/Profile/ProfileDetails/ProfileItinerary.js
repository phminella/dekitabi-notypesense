import { ProfileItineraryStyles } from "./styles/ProfileItineraryStyles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AttractionImage from "../../S/Attractions/AttractionImage";
import Link from "next/link";
import isMobile from "../../../lib/isMobile";
const ProfileItinerary = ({ t, language, itinerary }) => {
  return (
    <ProfileItineraryStyles>
      <Swiper
        speed={400}
        navigation={true}
        modules={[Navigation]}
        lazyPreloadPrevNext={0}
        loop={true}
        className={itinerary?.attractions?.length < 2 ? "no-arrows" : ""}
      >
        {itinerary?.attractions?.map((attraction, i) => (
          <SwiperSlide key={i}>
            <Link
              href={`/itinerary/${
                itinerary?.url ? itinerary?.url : itinerary?.id
              }`}
              prefetch={false}
              rel="noreferrer"
              target={isMobile() ? "_self" : "_blank"}
              className="tour-attraction-name"
            >
              <AttractionImage
                attraction={attraction?.split(" ").join("-")}
                size={500}
                quality={80}
                sizes={
                  "(max-width:430px) 100vw,(max-width:850px)50vw, (max-width:1200px) 33vw, 25vw"
                }
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link
        href={`/itinerary/${itinerary?.url ? itinerary?.url : itinerary?.id}`}
        prefetch={false}
        rel="noreferrer"
        target={isMobile() ? "_self" : "_blank"}
        className="itinerary-name"
      >
        {itinerary?.name}
      </Link>
    </ProfileItineraryStyles>
  );
};
export default ProfileItinerary;
