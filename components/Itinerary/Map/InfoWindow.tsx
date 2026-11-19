import { InfoWindowStyles } from "./styles/InfoWindowStyles";
import Image from "next/image";
import AttractionImage from "../../S/Attractions/AttractionImage";
import Link from "next/link";
import useDate from "../../../lib/useDate";
import isMobile from "../../../lib/isMobile";
import React from "react";
import { Attraction } from "../../../types/attraction";
import { LanguageOption } from "../../../types/user";

interface InfoWindowProps {
  attraction: Attraction;
  language?: LanguageOption;
  itineraryDate?: string;
  endPlace?: number;
  meetingPlace?: Attraction | "" | boolean;
  index?: number;
  t: (key: string, options?: any) => string;
}

const InfoWindow = ({
  attraction,
  language,
  itineraryDate,
  endPlace,
  meetingPlace,
  index,
  t,
}: InfoWindowProps) => {
  const { formatComparingDate, toTimeLength } = useDate();
  const translate = typeof t === "function" ? t : (key: string) => key;
  const isAttraction = attraction?.hide ? true : false;
  
  let date: number;
  const baseDate = itineraryDate ? new Date(itineraryDate) : new Date();
  const day = baseDate.getDay();
  if (day === 0) {
    date = 6;
  } else {
    date = day - 1;
  }

  const meetingPlaceObj = (meetingPlace as Attraction)?._geoloc ? (meetingPlace as Attraction) : null;

  return (
    <InfoWindowStyles>
      <div className="attraction">
        {attraction?.url || !attraction?.photos ? (
          <div className="attraction-image-bg">
            <AttractionImage
              attraction={attraction?.url}
              size={300}
              sizes={"250px"}
              priority={false}
            />
          </div>
        ) : (
          <div
            style={{ background: "lightblue", height: "150px", width: "100%" }}
          ></div>
        )}
        {isAttraction && (
          <div className="attraction-description">
            {!meetingPlaceObj?._geoloc && index === 1 && (
              <h3>{translate("meetingPlace")}</h3>
            )}
            {attraction?.hide === "true" ? (
              <b>{attraction?.name}</b>
            ) : (
              <Link
                prefetch={false}
                href={`/attraction/${attraction?.url}`}
                target={isMobile() ? "_self" : "_blank"}
                className="attraction-name"
              >
                {attraction?.translatedName
                  ? (attraction.translatedName as Record<string, string>)[language?.code || "en"]
                  : attraction?.name}
              </Link>
            )}
            <div className="attraction-item">
              <Image
                height={15}
                width={15}
                src="/img/icon-calendar.svg"
                alt="calendar"
              />
              {!attraction?.date?.from && !attraction?.closedDays && (
                <span>{translate("alwaysOpen")}</span>
              )}
              {attraction?.closedDays && (
                <p>
                  {translate("closed")}:{" "}
                  {attraction.closedDays.split(", ").map((closedDay, i, arr) => (
                    <b key={i}>
                      {translate(closedDay)}
                      {arr.length - 1 > i && <>{", "}</>}
                    </b>
                  ))}
                </p>
              )}
              {attraction?.date &&
                attraction.date.from !== 0 &&
                attraction.date.from === attraction.date.to && (
                  <span>
                    {formatComparingDate(attraction.date.from * 1000)
                      .split("-")
                      .join("/")}
                  </span>
                )}
              {attraction?.date &&
                attraction.date.from !== 0 &&
                attraction.date.to !== 99999999999 &&
                attraction.date.from !== attraction.date.to && (
                  <>
                    <span>
                      {formatComparingDate(attraction.date.from * 1000)
                        .split("-")
                        .join("/")}
                    </span>{" "}
                    -{" "}
                    <span>
                      {formatComparingDate(attraction.date.to * 1000)
                        .split("-")
                        .join("/")}
                    </span>
                  </>
                )}
            </div>
            <p className="attraction-item opening-hours">
              {attraction?.openingHours ? (
                <>
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-clock.svg"
                    alt="clock"
                  />
                  {(attraction.openingHours as string[])[date] ? (
                    <>
                      {(String((attraction.openingHours as string[])[date]
                        ?.split(":")
                        ?.slice(1)
                        ?.join(":")) || "")
                        ?.replaceAll("PM", translate("pm"))
                        ?.replaceAll("AM", translate("am"))}
                    </>
                  ) : (
                    <>{translate("closedToday")}</>
                  )}
                </>
              ) : (
                <>
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-clock.svg"
                    alt="clock"
                  />
                  {translate("open24h")}
                </>
              )}
            </p>
            {attraction?.website && (
              <div className="attraction-item opening-hours">
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-web.svg"
                  alt="web"
                />
                <a href={attraction.website} target="_blank" rel="noreferrer">
                  {translate("website")}
                </a>
              </div>
            )}
            {(attraction?.duration ?? 0) > 0 && (
              <div className="attraction-item opening-hours">
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-hourglass.svg"
                  alt="hourglass"
                />
                <p>
                  {translate("duration")}:{" "}
                  {toTimeLength(attraction.duration!, language?.code || "en")}
                </p>
              </div>
            )}
          </div>
        )}
        {!isAttraction && (
          <div className="meeting-place">
            {endPlace ? (
              <h3> {translate("endPlace")}</h3>
            ) : (
              <h3> {translate("meetingPlace")}</h3>
            )}
            <h4>{attraction?.name}</h4>
            <p>
              {typeof attraction?.address === "object"
                ? (attraction.address as Record<string, string>)[language?.code || "en"]
                : attraction?.address}
            </p>
          </div>
        )}
      </div>
      <button
        name="close-icon"
        id="close-icon"
        type="button"
        className="close-icon"
      >
        <Image src="/img/icon-close.svg" height={20} width={20} alt="close" />
      </button>
      {!itineraryDate && (
        <button
          className="add-to-itinerary-button"
          id="add-to-itinerary-button"
        >
          <Image
            height={45}
            width={45}
            src="/img/icon-map-pin2.svg"
            alt="plus"
          />
        </button>
      )}
    </InfoWindowStyles>
  );
};
export default InfoWindow;
