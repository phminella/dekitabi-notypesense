import { TourStyles } from "./styles/TourStyles";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper styles
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import Link from "next/link";
import useDate from "../../../lib/useDate";
import isMobile from "../../../lib/isMobile";
import Image from "next/image";
import dynamic from "next/dynamic";
const AttractionImage = dynamic(
  () => import("../Attractions/AttractionImage"),
  { ssr: false }
);
const Tour = ({ tour, language, t, showOriginal, fromHome }) => {
  const { toTimeLength, toTime } = useDate();
  return (
    <TourStyles className={`tour`}>
      <Swiper
        speed={400}
        navigation={true}
        modules={[Navigation]}
        lazyPreloadPrevNext={0}
        loop={true}
        className={tour?.photos?.length < 2 ? "no-arrows" : ""}
      >
        {tour?.attractions?.map((attraction, i) => (
          <SwiperSlide key={i}>
            <Link
              href={`/attraction/${tour?.urls[i]}`}
              prefetch={false}
              rel="noreferrer"
              target={isMobile() ? "_self" : "_blank"}
              className="tour-attraction-name"
            >
              <span>{i + 1}</span>.{" "}
              {tour?.translatedAttractions && !showOriginal
                ? tour?.translatedAttractions[language?.code]?.split(" > ")[i]
                : tour?.attractionsName?.split(" > ")[i]}
            </Link>{" "}
            <Link
              prefetch={false}
              href={`/itinerary/${tour?.url ? tour?.url : tour?.id}`}
              target={isMobile() ? "_self" : "_blank"}
              rel="noreferrer"
            >
              <AttractionImage
                attraction={tour?.urls[i]}
                size={500}
                width={fromHome ? 280 : 0}
                height={fromHome ? 270 : 0}
                quality={fromHome ? 50 : 80}
                sizes={
                  fromHome
                    ? ""
                    : "(max-width:430px) 100vw,(max-width:850px)50vw, (max-width:1200px) 33vw, 25vw"
                }
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link
        prefetch={false}
        href={`/itinerary/${tour?.url ? tour?.url : tour?.id}`}
        target={isMobile() ? "_self" : "_blank"}
        rel="noreferrer"
      >
        <div className="tour-details">
          {/* <ul className="tour-tags">
            <li>{t("private")}</li>
            <li>{t("customize")}</li>
          </ul> */}
          <p className="tour-name">
            {tour?.translatedName && !showOriginal
              ? tour?.translatedName[language?.code]
              : tour?.name}
          </p>
          {/* <div className="flex-wrapper-five tour-rating">
            <Image
              height={15}
              width={15}
              src="/img/icon-star.svg"
              alt="star"
              className="star"
            ></Image>
            <span className="rating-counter">
              {tour?.ratingScore ? tour?.ratingScore?.toFixed(1) : 0} (
              {tour?.ratingCounter})
            </span>
          </div> */}
        </div>
        <p className="tour-time">
          <span className="flex-wrapper-five">
            <Image
              height={15}
              width={15}
              src="/img/icon-clock.svg"
              alt="dekitabi-tour-start-time"
            ></Image>
            <>
              {t("start")}: {toTime(tour?.startTime)}
            </>
          </span>
          <span className="flex-wrapper-five">
            <Image
              height={15}
              width={15}
              src="/img/icon-hourglass.svg"
              alt="dekitabi-tour-duration"
            ></Image>
            {t("duration")}: {toTimeLength(tour?.duration, language?.code)}
          </span>
        </p>
      </Link>
    </TourStyles>
  );
};
export default React.memo(Tour);
