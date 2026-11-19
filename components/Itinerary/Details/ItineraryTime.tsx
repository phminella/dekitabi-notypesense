import { ItineraryTimeStyles } from "./styles/ItineraryTimeStyles";
import useDate from "../../../lib/useDate";
import Image from "next/image";
import React from "react";
import { LanguageOption } from "../../../types/user";

interface ItineraryTimeProps {
  duration: number;
  transitTime: number;
  t: (key: string, options?: any) => string;
  language: LanguageOption;
  itineraryLunch: number;
}

const ItineraryTime = ({
  duration,
  transitTime,
  t,
  language,
  itineraryLunch,
}: ItineraryTimeProps) => {
  const { toTimeLength } = useDate();
  return (
    <ItineraryTimeStyles>
      <ul className="itinerary-time">
        <li className="duration">
          <div className="icon-wrapper">
            <Image
              height={17}
              width={17}
              src="/img/icon-hourglass.svg"
              alt="clock"
              className="icon"
              priority={true}
            />
          </div>
          {t("duration")}
          <div className="flex-wrapper-five p-replacement">
            <Image
              height={15}
              width={15}
              src={`/img/icon-around.svg`}
              alt="around"
              className="icon-around"
              priority={true}
            />{" "}
            <span>
              {toTimeLength(
                itineraryLunch > -1
                  ? duration + transitTime + 60
                  : duration + transitTime,
                language?.code
              )}
            </span>
          </div>
        </li>
        <li className="transit-time">
          <div className="icon-wrapper">
            <Image
              height={17}
              width={17}
              src="/img/icon-train.svg"
              alt="train"
              className="icon"
              priority={true}
            />
          </div>
          {t("transit")}
          <div className="flex-wrapper-five p-replacement">
            <Image
              height={15}
              width={15}
              src={`/img/icon-around.svg`}
              alt="around"
              className="icon-around"
              priority={true}
            />
            <span>
              {toTimeLength(transitTime, language?.code)}
            </span>
          </div>
        </li>
        {itineraryLunch > -1 && (
          <li className="lunch-break">
            <div className="icon-wrapper">
              <Image
                height={23}
                width={23}
                src={`/img/icon-food2.svg`}
                alt="travel-mode"
                className="icon"
                priority={true}
              />
            </div>
            {t("lunchBreak")}
            <div className="flex-wrapper-five p-replacement">
              <span>
                1{t("h")}00{t("m")}
              </span>
            </div>
          </li>
        )}
      </ul>
    </ItineraryTimeStyles>
  );
};
export default React.memo(ItineraryTime);
