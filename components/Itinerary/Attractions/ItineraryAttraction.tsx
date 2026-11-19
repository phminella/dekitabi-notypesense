// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { ItineraryAttractionStyles } from "./styles/ItineraryAttractionStyles";
import Image from "next/image";
import useDate from "../../../lib/useDate";
import React, { useEffect, useState } from "react";
import useItinerary from "../../../lib/useItinerary";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import isMobile from "../../../lib/isMobile";
import { useTranslation } from "next-i18next";
import EditAttractionDuration from "./EditAttractionDuration";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryError } from "../../../types/itinerary";

const ItineraryAttractionOptions = dynamic(
  () => import("./ItineraryAttractionOptions"),
  { ssr: false }
);
const ItineraryAttractionTime = dynamic(
  () => import("./ItineraryAttractionTime"),
  { ssr: false }
);
const AttractionImage = dynamic(
  () => import("../../S/Attractions/AttractionImage"),
  { ssr: false }
);

interface ItineraryAttractionProps {
  itineraryDurations?: number[];
  index: number;
  attraction: Attraction;
  arrivalDepartureTime: { arrival: string; departure: string }[];
  dragging: boolean;
  setSelectedAttraction: (index: number | null) => void;
  selectedAttraction: number | null;
  setShowModal: (modal: string | boolean) => void;
  closedAttractions: string[];
  openSendReport: (name: string) => void;
  user: User;
  language: LanguageOption;
  itineraryDate: string;
  itineraryId: string;
  itineraryStatus: boolean;
  itineraryCreatedBy?: string;
  i: number;
  setAttractionToDelete?: (attr: Attraction | null) => void;
  itineraryMeetingPlace?: Attraction | "" | false;
  setShowMap: (show: boolean) => void;
  showTutorial: boolean;
  updateItineraryHandler?: (data: Partial<Itinerary>) => Promise<boolean>;
  loadingPhotos?: string[];
  setErrors?: (errors: ItineraryError[]) => void;
  t: (key: string, options?: any) => string;
}

const ItineraryAttraction = ({
  itineraryDurations,
  index,
  attraction,
  arrivalDepartureTime,
  dragging,
  setSelectedAttraction,
  selectedAttraction,
  setShowModal,
  closedAttractions,
  openSendReport,
  user,
  language,
  itineraryDate,
  itineraryId,
  itineraryStatus,
  itineraryCreatedBy,
  i,
  setAttractionToDelete,
  itineraryMeetingPlace,
  setShowMap,
  showTutorial,
  updateItineraryHandler,
  loadingPhotos,
}: ItineraryAttractionProps) => {
  const { formatComparingDate, toTime } = useDate();
  const { attractionOpeningTime } = useItinerary();
  const { t } = useTranslation();

  const [attractionClosed, setAttractionClosed] = useState(false);

  useEffect(() => {
    setAttractionClosed(closedAttractions?.includes(attraction?.name));
  }, [closedAttractions, attraction?.name]);

  const isSelected = selectedAttraction === index;
  const attractionName =
    attraction?.translatedName?.[language?.code as keyof typeof attraction.translatedName] || attraction?.name;

  const renderClosedDays = () => {
    if (!attraction?.closedDays) return null;

    const days = attraction.closedDays.split(", ");
    return (
      <p>
        {t("closed")}:{" "}
        {days.map((day, idx) => (
          <b key={idx}>
            {t(day)}
            {idx < days.length - 1 && ", "}
          </b>
        ))}
      </p>
    );
  };

  const renderDateRange = () => {
    const { from, to } = attraction?.date || {};
    if (!from || from === 0) return null;

    const formattedFrom = formatComparingDate(from * 1000).replace(/-/g, "/");
    const formattedTo = formatComparingDate(to * 1000).replace(/-/g, "/");

    if (from === to) {
      return <span>{formattedFrom}</span>;
    }

    if (to !== 99999999999) {
      return (
        <>
          <span>{formattedFrom}</span> - <span>{formattedTo}</span>
        </>
      );
    }

    return null;
  };

  const renderOpeningHours = () => {
    const { openingHours = [] } = attraction || {};

    if (!openingHours || openingHours?.length === 1) {
      return <>{t("open24h")}</>;
    }

    const time = attractionOpeningTime(itineraryDate, openingHours);

    if (!time) {
      return (
        <>
          {t("closedOn")} {itineraryDate?.replace(/-/g, "/")}
        </>
      );
    }

    return (
      <ItineraryAttractionTime
        t={t}
        attractionOpeningTime={attractionOpeningTime}
        itineraryDate={itineraryDate}
        attractionOpeningHours={openingHours}
      />
    );
  };

  return (
    <ItineraryAttractionStyles
      className={`itinerary-attraction ${
        attractionClosed ? "closed-attraction" : ""
      } ${user?.guide === "true" ? "guide-styles" : ""} ${
        itineraryStatus ? "fixed-attraction" : ""
      }`}
      id={String(index)}
    >
      <div className="attraction">
        <div
          className="attraction-image-bg"
          onClick={() => {
            setSelectedAttraction(i);
            setShowMap(true);
          }}
        >
          {!loadingPhotos?.includes(attraction?.url) ? (
            <AttractionImage
              attraction={attraction?.url}
              size={300}
              sizes="90px"
              priority={false}
            />
          ) : (
            <Skeleton
              variant="circular"
              width={100}
              height={100}
              sx={{ zIndex: 5 }}
            />
          )}
        </div>

        <div className="attraction-time">
          <div
            className={`attraction-id-pin ${
              isSelected ? "selected-attraction" : ""
            }`}
          />
          <div className="attraction-id">
            <div style={{ zIndex: 0 }}>{index + 1}</div>
          </div>
        </div>

        {!showTutorial && (
          <ItineraryAttractionOptions
            openSendReport={openSendReport}
            setAttractionToDelete={setAttractionToDelete}
            setShowModal={setShowModal}
            attraction={attraction}
            t={t}
            user={user}
            itineraryId={itineraryId}
            itineraryStatus={itineraryStatus}
          />
        )}

        <div
          className="attraction-description"
          onClick={() => setSelectedAttraction(i)}
        >
          {index === 0 && !(itineraryMeetingPlace as Attraction)?._geoloc && (
            <h4>{t("meetingPlace")}</h4>
          )}

          <div className="attraction-itinerary-wrapper">
            <div className="attraction-itinerary">
              <Image
                src="/img/icon-marker2.svg"
                height={13}
                width={13}
                alt="marker"
              />
              {toTime(arrivalDepartureTime[index]?.arrival)} -{" "}
              {toTime(arrivalDepartureTime[index]?.departure)}
            </div>

            <EditAttractionDuration
              attractionDuration={attraction?.duration}
              itineraryCreatedBy={itineraryCreatedBy}
              user={user}
              language={language}
              t={t}
              index={i}
              itineraryDurations={itineraryDurations}
              updateItineraryHandler={updateItineraryHandler}
              itineraryMeetingPlace={itineraryMeetingPlace}
              itineraryStatus={itineraryStatus}
            />
          </div>

          {attraction?.hide !== "true" ? (
            <Link
              prefetch={false}
              href={`/attraction/${attraction?.url}`}
              target={isMobile() ? "_self" : "_blank"}
              className="attraction-name"
            >
              {attractionName}
            </Link>
          ) : (
            <div className="attraction-name attraction-name-no-link">
              {attractionName}
            </div>
          )}

          <br />

          <div className="attraction-item">
            <Image
              height={13}
              width={13}
              src="/img/icon-calendar.svg"
              alt="calendar"
            />
            {!attraction?.date?.from && !attraction?.closedDays && (
              <span>{t("alwaysOpen")}</span>
            )}
            {renderClosedDays()}
            {renderDateRange()}
          </div>

          <br />

          <div className="attraction-item opening-hours">
            <Image
              height={13}
              width={13}
              src="/img/icon-clock.svg"
              alt="clock"
            />
            {renderOpeningHours()}
          </div>
        </div>
      </div>
    </ItineraryAttractionStyles>
  );
};

export default React.memo(ItineraryAttraction);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
