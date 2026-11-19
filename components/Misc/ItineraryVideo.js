import { useState } from "react";
import { ItineraryVideoStyles } from "./styles/ItineraryVideoStyles";
import { useRouter } from "next/router";
import Image from "next/image";
const ItineraryVideo = ({ t, isMobile }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [videoLanguage, setVideoLanguage] = useState(
    router?.locale === "ja" ||
      router?.locale === "th" ||
      router?.locale === "vi" ||
      router?.locale === "ko" ||
      router?.locale === "zh-CN" ||
      router?.locale === "zh-TW" ||
      router?.locale === "zh-HK" ||
      router?.locale === "th"
      ? "ja"
      : "en"
  );
  return (
    <ItineraryVideoStyles>
      <div className="video-wrapper">
        {!clicked ? (
          <div className="fake-video">
            <button className="play-wrapper" onClick={() => setClicked(true)}>
              <Image
                src={`/img/icon-play.png`}
                className="play"
                alt="play"
                width={80}
                height={50}
              />
            </button>
            <Image
              src={`https://i.ytimg.com/vi/${
                isMobile && videoLanguage === "ja"
                  ? "IDzRgjvqNYk"
                  : isMobile && videoLanguage === "en"
                  ? "CRBgT0b2q7M"
                  : !isMobile && videoLanguage === "ja"
                  ? "ZUw7e9nr6sw"
                  : "y3QfAcmTsMg"
              }/${videoLanguage === "ja" ? "hqdefault" : "maxresdefault"}.jpg`}
              layout="fill"
              objectFit="cover"
              alt="yt thumbnail"
              className="youtube"
              priority={true}
              // width={950}
              // height={450}
              sizes={"(max-width:950px) 100vw, calc(0vw + 950px)"}
            />
          </div>
        ) : (
          <iframe
            title="itinerary-video"
            id="itinerary-video"
            width="100%"
            height="450"
            src={
              isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/IDzRgjvqNYk?si=FqlRXewZ5NZ2-K1z&rel=0&autoplay=1"
                : isMobile && videoLanguage === "en"
                ? "https://www.youtube.com/embed/CRBgT0b2q7M?si=5IvG-cQ0weMBG-6j&rel=0&autoplay=1"
                : !isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/ZUw7e9nr6sw?si=8X1K0LN1W9ULHK1N&rel=0&autoplay=1"
                : "https://www.youtube.com/embed/y3QfAcmTsMg?si=F9MoKntXvoIupFGI&rel=0&autoplay=1"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <button
        onClick={() => {
          setVideoLanguage(videoLanguage === "en" ? "ja" : "en");
        }}
        className="video-language-button"
      >
        {t("viewVideoIn", {
          language: videoLanguage === "ja" ? "English" : "日本語",
        })}
      </button>
    </ItineraryVideoStyles>
  );
};
export default ItineraryVideo;
