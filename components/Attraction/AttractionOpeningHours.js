import { AttractionOpeningHoursStyles } from "./styles/AttractionOpeningHoursStyles";
import Image from "next/image";
const AttractionOpeningHours = ({ openingHours, t }) => {
  return (
    <AttractionOpeningHoursStyles>
      <div>
        <h2>
          <Image
            height={20}
            width={20}
            src="/img/icon-clock.svg"
            alt="clock"
          ></Image>
          {t("openingHours")}
        </h2>
        {openingHours?.map((time, i) => (
          <p
            key={i}
            className={
              typeof time === "string" && /closed$/i.test(time.trim())
                ? "closed"
                : ""
            }
          >
            {t(`${time?.split(":")[0]}s`)}:
            {/open 24 hours/i.test(
              time?.split(": ")?.slice(1)?.join(": ") || ""
            ) ? (
              <>{" " + t("open24h")}</>
            ) : (
              (String(time?.split(":")?.slice(1)?.join(":")) || "")
                ?.replaceAll("PM", t("pm"))
                ?.replaceAll("AM", t("am"))
            )}
          </p>
        ))}
      </div>
    </AttractionOpeningHoursStyles>
  );
};
export default AttractionOpeningHours;
