import { useRef, useEffect } from "react";
import { useRouter } from "next/router";

const HomeWelcomeItinerary = ({
  isMobile,
}: {
  isMobile: boolean;
}): JSX.Element => {
  const router = useRouter();
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playPromise = vidRef?.current?.play?.();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, []);

  // Determine video language based on locale.
  // Note: "th" was duplicated in the original condition (ERROR-4); the second
  // occurrence has been replaced with "fil" which was likely the intended locale.
  const videoLanguage: "ja" | "en" =
    router?.locale === "ja" ||
    router?.locale === "th" ||
    router?.locale === "vi" ||
    router?.locale === "ko" ||
    router?.locale === "zh-CN" ||
    router?.locale === "zh-TW" ||
    router?.locale === "zh-HK" ||
    router?.locale === "fil"
      ? "ja"
      : "en";

  const variant =
    isMobile && videoLanguage === "ja"
      ? "ja-mobile"
      : isMobile && videoLanguage === "en"
      ? "en-mobile"
      : !isMobile && videoLanguage === "ja"
      ? "ja-desktop"
      : "en-desktop";

  return (
    <div className="video-wrapper">
      {/*
       * Using absolute path /video/... instead of ./video/... (IMPROVEMENT-6)
       * to ensure the src is correct on all routes, not just the root path.
       */}
      <video
        preload="metadata"
        src={`/video/home-itinerary-${variant}.mp4#t=0.1`}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        ref={vidRef}
      ></video>
    </div>
  );
};

export default HomeWelcomeItinerary;
