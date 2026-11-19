import Image from "next/image";
import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import { TFunction } from "next-i18next";
import { HomeReviewItem } from "../../../types/home";

interface HomeReviewProps {
  t: TFunction;
  review: HomeReviewItem;
  showTranslate: boolean;
}

const STAR_COUNT = 5;

const HomeReview = ({
  t,
  review,
  showTranslate,
}: HomeReviewProps): JSX.Element => {
  // Simplified initial value: showTranslate is already boolean (WARNING-6)
  // Cast showTranslate to boolean to guard against any non-boolean truthy/falsy value
  const [showTranslation, setShowTranslation] = useState<boolean>(!!showTranslate);

  useEffect(() => {
    setShowTranslation(!!showTranslate);
  }, [showTranslate]);

  return (
    <div className="review">
      <div className="review-name">
        {showTranslate && (
          <button
            className="translate"
            onClick={() => {
              setShowTranslation(!showTranslation);
            }}
          >
            <Image
              src="/img/icon-translate.svg"
              alt="translate"
              width={25}
              height={25}
            />
          </button>
        )}
        {review?.store === "playstore" && (
          <Image
            src="/img/icon-play2.svg"
            alt="play-store-icon"
            width={30}
            height={30}
          />
        )}
        {review?.store === "appstore" && (
          <Image
            src="/img/icon-appstore2.svg"
            alt="app-store-icon"
            width={30}
            height={30}
          />
        )}
        {review?.store === "google" && (
          <Image
            src="/img/icon-google.svg"
            alt="google-icon"
            width={30}
            height={30}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              t("postedOn", { platform: review?.platform }),
              { USE_PROFILES: { html: true } }
            ),
          }}
        ></div>
      </div>

      {/* Replaced 5 identical Image elements with a loop (IMPROVEMENT-9) */}
      <div className="review-rating">
        {Array.from({ length: STAR_COUNT }).map((_, i) => (
          <Image
            key={i}
            src="/img/icon-star.svg"
            alt="star"
            width={25}
            height={25}
          />
        ))}
      </div>

      <div className="review-message">
        <Image
          src="/img/icon-quotes.svg"
          alt="quotation-marks"
          width={30}
          height={30}
        />
        {showTranslation ? review?.translation : review?.message}
      </div>
    </div>
  );
};

export default HomeReview;
