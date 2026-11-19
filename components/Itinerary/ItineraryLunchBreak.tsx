import { ItineraryLunchBreakStyles } from "./styles/ItineraryLunchBreakStyles";
import Image from "next/image";
import React from "react";
import { User } from "../../types/user";

interface ItineraryLunchBreakProps {
  t: (key: string) => string;
  user: User;
}

const ItineraryLunchBreak = ({ t, user }: ItineraryLunchBreakProps) => {
  return (
    <ItineraryLunchBreakStyles>
      <div className="attraction">
        <div className="attraction-image-bg">
          <Image
            height={85}
            width={85}
            src="/img/icon-food.svg"
            alt="hourglass"
          ></Image>
        </div>
        <div className="attraction-description">
          <span className="lunch-bold">{t("lunchBreak")}</span>
          <p>
            {t("lunchBreak1")}{" "}
            {user?.guide === "true" ? (
              <>{t("lunchBreakGuide")}</>
            ) : (
              <>{t("lunchBreakTraveler")}</>
            )}
            {user?.guide !== "true" && (
              <>
                <br />
                {t("lunchBreak2")}
              </>
            )}
            <br />
            {t("enjoyIt")}
          </p>
          <div className="attraction-item">
            <Image
              height={15}
              width={15}
              src="/img/icon-hourglass.svg"
              alt="hourglass"
            ></Image>
            <p className="lunch-bold">
              {t("duration")}: 1{t("h")}00{t("m")}
            </p>
          </div>
        </div>
      </div>
    </ItineraryLunchBreakStyles>
  );
};
export default React.memo(ItineraryLunchBreak);
