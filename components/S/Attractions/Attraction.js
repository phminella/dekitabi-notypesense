import Image from "next/legacy/image";
import { AttractionStyles } from "./styles/AttractionStyles";
import dynamic from "next/dynamic";
const AttractionOptions = dynamic(() => import("./AttractionOptions"));
import React, { useState } from "react";
import useDate from "../../../lib/useDate";
const AttractionImage = dynamic(() => import("./AttractionImage"), {
  ssr: false,
});
const Attraction = ({
  language,
  selectedAttraction,
  setSelectedAttraction,
  i,
  setShowMap,
  attraction,
  t,
  setShowItinerary,
  setAttractionToAdd,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { formatComparingDate } = useDate();
  if (!language || !attraction) return <></>;
  return (
    <AttractionStyles
      id={i}
      name={i}
      className={`attraction ${
        selectedAttraction === i ? "selected-attraction" : ""
      } `}
    >
      <AttractionOptions
        setShowOptions={setShowOptions}
        showOptions={showOptions}
        setShowItinerary={setShowItinerary}
        url={attraction?.url}
        website={attraction?.website}
        setAttractionToAdd={setAttractionToAdd}
        attraction={attraction}
      />
      <div
        className={`grid-wrapper`}
        onClick={() => {
          if (setSelectedAttraction) {
            setSelectedAttraction(i);
            setShowMap(true);
          }
        }}
      >
        <div className="attraction-image">
          <AttractionImage
            attraction={attraction?.url}
            size={500}
            quality={100}
            sizes={
              "(max-width:430px) 100vw, (max-width:800px) 50vw, (max-width:1350px) 30vw, 20vw"
            }
          />
        </div>

        <div className="attraction-marker-wrapper">
          <div
            className={`attraction-marker ${
              selectedAttraction === i ? "selected" : ""
            }`}
          >
            <p>{i + 1}</p>
          </div>
        </div>
        <div className="attraction-wrapper">
          <div className="attraction-description">
            <div className="attraction-description-details">
              <div className="attraction-name">
                {attraction?.translatedName
                  ? attraction?.translatedName[language?.code]
                  : attraction?.name}
              </div>
              {attraction?.rating ? (
                <p className="attraction-rating">
                  <Image
                    height={12}
                    width={12}
                    src="/img/icon-star.svg"
                    alt="google"
                  ></Image>
                  {attraction?.rating}
                  <span className="attraction-rating-score">
                    ({attraction?.ratingCounter})
                  </span>
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="attraction-more-info">
            <div className="attraction-item">
              <Image
                height={15}
                width={15}
                src="/img/icon-hourglass.svg"
                alt="hourglass"
              ></Image>
              {t("duration")}: {attraction?.duration}
              {t("min")}
            </div>
            {!attraction?.dateFrom && (
              <div className="attraction-item">
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-calendar.svg"
                  alt="calendar"
                ></Image>
                {!attraction?.date?.from && !attraction?.closedDays && (
                  <span>{t("alwaysOpen")}</span>
                )}
                {attraction?.closedDays && (
                  <p>
                    {t("closed")}:
                    {attraction?.closedDays
                      ?.split(", ")
                      ?.map((closedDay, i) => (
                        <b key={i}>
                          {t(closedDay)}{" "}
                          {attraction?.closedDays?.split(", ")?.length - 1 >
                            i && <>{", "}</>}
                        </b>
                      ))}
                  </p>
                )}
                {attraction?.date?.from &&
                  attraction?.date?.from === attraction?.date?.to && (
                    <span>
                      {formatComparingDate(attraction?.date?.from * 1000)
                        .split("-")
                        .join("/")}
                    </span>
                  )}
                {attraction?.date?.from !== 0 &&
                  attraction?.date?.to !== 99999999999 &&
                  attraction?.date?.from !== attraction?.date?.to && (
                    <>
                      <span>
                        {formatComparingDate(attraction?.date?.from * 1000)
                          .split("-")
                          .join("/")}
                      </span>{" "}
                      -{" "}
                      <span>
                        {formatComparingDate(attraction?.date?.to * 1000)
                          .split("-")
                          .join("/")}
                      </span>
                    </>
                  )}
              </div>
            )}
            {attraction?.date?.from &&
              attraction?.date?.from === attraction?.date?.to && (
                <p className="attraction-item">
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-calendar.svg"
                    alt="calendar"
                  ></Image>
                  <span>
                    {formatComparingDate(attraction?.date?.from * 1000)
                      .split("-")
                      .join("/")}
                  </span>
                </p>
              )}
            {attraction?.date?.from &&
              attraction?.date?.from !== attraction?.date?.to && (
                <p className="attraction-item">
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-calendar.svg"
                    alt="calendar"
                  ></Image>
                  <span>
                    {formatComparingDate(attraction?.date?.from * 1000)
                      .split("-")
                      .join("/")}
                  </span>{" "}
                  -{" "}
                  <span>
                    {formatComparingDate(attraction?.date?.to * 1000)
                      .split("-")
                      .join("/")}
                  </span>
                </p>
              )}
            {!attraction?.openingPeriods ? (
              <p className="attraction-item">
                <span>
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-clock.svg"
                    alt="clock"
                  ></Image>
                  {t("open24h")}
                </span>
              </p>
            ) : (
              <p className="attraction-item">
                {attraction?.openingHours ? (
                  <span>
                    <Image
                      height={15}
                      width={15}
                      src="/img/icon-clock.svg"
                      alt="clock"
                    ></Image>
                    {attraction?.openingHours[
                      new Date()?.getDay() === 0 ? 6 : new Date()?.getDay() - 1
                    ] ? (
                      <>
                        {(
                          String(
                            attraction?.openingHours?.[
                              new Date()?.getDay() === 0
                                ? 6
                                : new Date()?.getDay() - 1
                            ]
                              ?.split(":")
                              ?.slice(1)
                              ?.join(":")
                          ) || ""
                        )
                          .replaceAll("PM", t("pm"))
                          .replaceAll("AM", t("am")) === " Closed" ? (
                          t("open24h")
                        ) : (
                          <>
                            {(
                              String(
                                attraction?.openingHours?.[
                                  new Date()?.getDay() === 0
                                    ? 6
                                    : new Date()?.getDay() - 1
                                ]
                                  ?.split(":")
                                  ?.slice(1)
                                  ?.join(":")
                              ) || ""
                            )
                              .replaceAll("PM", t("pm"))
                              .replaceAll("AM", t("am"))}{" "}
                          </>
                        )}
                      </>
                    ) : (
                      <>{t("closedToday")}</>
                    )}
                  </span>
                ) : (
                  <span>
                    <Image
                      height={15}
                      width={15}
                      src="/img/icon-clock.svg"
                      alt="clock"
                    ></Image>
                    {t("open24h")}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </AttractionStyles>
  );
};
export default React.memo(Attraction);
