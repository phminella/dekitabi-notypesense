import { AttractionStyles } from "./styles/AttractionStyles";
import { useState } from "react";
import Image from "next/legacy/image";
import useDate from "../../lib/useDate";
import AttractionReviews from "./AttractionReviews";
import AttractionOpeningHours from "./AttractionOpeningHours";
import AttractionCarousel from "./AttractionCarousel";
import { useSelector, shallowEqual } from "react-redux";
import MapWrapper from "./Map/MapWrapper";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import type { Attraction, LanguageCode } from "../../types/attraction";
import type { RootState } from "../../store/store";
const AttractionReportProblem = dynamic(
  () => import("../Misc/AttractionReport/AttractionReportProblem"),
  {
    ssr: false,
  }
);
import { AttractionResponsiveStyles } from "./styles/responsive/AttractionResponsiveStyles";
import AttractionItinerary from "../S/Attractions/AttractionItinerary";
import BasicModal from "../UI/BasicModal";
import { isLanguageCode } from "../../lib/isLanguageCode";

const getSafeExternalUrl = (url?: string) => {
  if (!url) {
    return null;
  }
  const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  try {
    const parsedUrl = new URL(normalizedUrl);
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return parsedUrl.toString();
    }
  } catch {
    return null;
  }
  return null;
};

const Attraction: React.FC<{ id: string; attraction: Attraction }> = ({
  id,
  attraction,
}) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.app.user, shallowEqual);
  const [showReport, setShowReport] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);
  const language = useSelector(
    (state: RootState) => state.app.language,
    shallowEqual
  );
  const { toTimeLength } = useDate();
  const languageCode: LanguageCode = isLanguageCode(language?.code)
    ? (language.code as LanguageCode)
    : "en";
  const attractionName =
    attraction?.translatedName?.[languageCode] ||
    attraction?.translatedName?.en ||
    attraction?.name ||
    "Attraction";
  const attractionDescription =
    attraction?.translatedDescription?.[languageCode] ||
    attraction?.translatedDescription?.en ||
    attraction?.description;
  const attractionAddress =
    typeof attraction?.address === "object"
      ? attraction?.address?.[languageCode] || attraction?.address?.en
      : attraction?.address;
  const safeWebsiteUrl = getSafeExternalUrl(attraction?.website);
  const attractionReviews = Array.isArray(attraction?.reviews)
    ? attraction.reviews
    : attraction?.reviews?.[languageCode] ||
      attraction?.reviews?.en ||
      [];
  const hasReviews = attractionReviews?.length > 0;

  return (
    <AttractionResponsiveStyles>
      <AttractionStyles>
        {showReport && (
          <AttractionReportProblem
            attractionName={attractionName}
            t={t}
            showModal={showReport}
            setShowModal={setShowReport}
          />
        )}
        <BasicModal
          setShowModal={setShowItineraries}
          showModal={showItineraries}
        >
          <AttractionItinerary
            attraction={attraction}
            setShowItinerary={setShowItineraries}
            t={t}
          />
        </BasicModal>
        <div className="attraction-wrapper">
          <div className="attraction-intro">
            <div className="attraction-title">
              <Image
                height={22}
                width={25}
                src="/img/icon-marker.svg"
                alt="marker"
                priority={true}
              ></Image>
              <h1>
                {attractionName}
              </h1>
            </div>
            {user?.guide === "true" && (
              <button
                className="report-problem"
                onClick={() => setShowReport(true)}
              >
                <Image
                  height={35}
                  width={35}
                  src="/img/icon-report.svg"
                  alt="report"
                  priority={true}
                ></Image>
              </button>
            )}
            <div className="attraction-information">
              {attraction?.rating ? (
                <div className="attraction-rating">
                  <Image
                    height={18}
                    width={18}
                    src="/img/icon-star.svg"
                    alt="star"
                    className="star"
                    priority={true}
                  ></Image>
                  <p>
                    {attraction?.rating}{" "}
                    <span>({attraction?.ratingCounter})</span>
                  </p>
                </div>
              ) : (
                <></>
              )}
              <p className="attraction-location">{attractionAddress}</p>
              <div className="attraction-info">
                <p>{attractionDescription}</p>
                <p className="attraction-duration">
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-hourglass.svg"
                    alt="hourglass"
                    priority={true}
                  ></Image>
                  {t("duration")}:{" "}
                  {toTimeLength(attraction?.duration, languageCode)}
                </p>
                {safeWebsiteUrl && (
                  <div className="attraction-website">
                    <Image
                      height={15}
                      width={15}
                      src="/img/icon-web.svg"
                      alt="web"
                      priority={true}
                    ></Image>
                    <a
                      href={safeWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {safeWebsiteUrl}
                    </a>
                  </div>
                )}
                {attraction.phoneNumber && (
                  <div className="attraction-website">
                    <Image
                      height={15}
                      width={15}
                      src="/img/icon-phone.svg"
                      alt="phone"
                      priority={true}
                    ></Image>
                    {attraction.phoneNumber}
                  </div>
                )}
              </div>
            </div>
            <button
              className="normal-button add-attraction-button"
              onClick={() => setShowItineraries(true)}
            >
              <Image
                height={20}
                width={20}
                src="/img/icon-map-pin2.svg"
                alt="plus"
                priority={true}
              ></Image>
              {t("addToItinerary")}
            </button>
          </div>
          <div className="carousel-wrapper">
            <AttractionCarousel photos={attraction?.photos} id={id} />
          </div>
          <div className="attraction-tags">
            {attraction?.tags?.map((tag, i) => (
              <div className="tag" key={i}>
                <div>
                  <Image
                    width={25}
                    height={25}
                    src={`/img/tags/icon-${tag}.svg`}
                    alt={tag}
                  ></Image>
                  <br />
                  {t(tag)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`attraction-more-info ${
            !attraction.openingHours ? "always-open" : ""
          }`}
        >
          {attraction.openingHours && (
            <AttractionOpeningHours
              t={t}
              openingHours={attraction.openingHours}
            />
          )}
          <div className="map">
            <MapWrapper attraction={attraction} />
          </div>
        </div>
        {hasReviews && (
          <AttractionReviews
            t={t}
            rating={attraction.rating}
            ratingCounter={attraction.ratingCounter}
            reviews={attractionReviews}
            language={language}
          />
        )}
      </AttractionStyles>
    </AttractionResponsiveStyles>
  );
};
export default Attraction;
