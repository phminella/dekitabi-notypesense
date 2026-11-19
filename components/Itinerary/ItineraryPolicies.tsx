import { ItineraryPoliciesStyles } from "./styles/ItineraryPoliciesStyles";
import Image from "next/image";
import ItineraryLunchBreak from "./ItineraryLunchBreak";
import React from "react";
import { Itinerary } from "../../types/itinerary";
import { Attraction } from "../../types/attraction";
import { User, LanguageOption } from "../../types/user";

interface ItineraryPoliciesProps {
  t: (key: string, options?: any) => string;
  itinerary: Itinerary;
  itineraryAttractions: Attraction[];
  language: LanguageOption;
  user: User;
}

const ItineraryPolicies = ({
  t,
  itinerary,
  itineraryAttractions,
  language,
  user,
}: ItineraryPoliciesProps) => {
  return (
    <ItineraryPoliciesStyles>
      <div className="important" id="important">
        <h2 className="itinerary-titles">{t("guidedTours")}</h2>
        <h3>{t("includes")}</h3>
        <ul>
          <li>
            <Image
              height={10}
              width={15}
              src="/img/icon-check.svg"
              alt="checked"
              className="included"
            />
            {t("includes1")}
          </li>
          <li>
            <Image
              height={10}
              width={15}
              src="/img/icon-check.svg"
              alt="checked"
              className="included"
            />
            {t("includes2")}
          </li>
        </ul>
        <h3>{t("notIncluded")}</h3>
        <ul>
          <li>
            <Image
              height={15}
              width={15}
              src="/img/icon-close4.svg"
              alt="checked"
              className="not-included"
            />
            {t("excludes1")}
          </li>
          <li>
            <Image
              height={15}
              width={15}
              src="/img/icon-close4.svg"
              alt="checked"
              className="not-included"
            />
            {t("excludes2")}¹
          </li>
          <li>
            <Image
              height={15}
              width={15}
              src="/img/icon-close4.svg"
              alt="checked"
              className="not-included"
            />
            {t("excludes3")}
          </li>
          <li>
            <Image
              height={15}
              width={15}
              src="/img/icon-close4.svg"
              alt="checked"
              className="not-included"
            />
            {t("excludes4")}
          </li>
          <li>
            <Image
              height={15}
              width={15}
              src="/img/icon-close4.svg"
              alt="checked"
              className="not-included"
            />
            {t("excludes5")}
          </li>
          <li>
            ¹ <span>{t("importantNotes3")}</span>
          </li>
        </ul>
        <div className="more-important-notes">
          <p className="first-note">{t("importantNotes1")}</p>
          <p>
            {t("meetingPlace")}:{" "}
            {(itinerary?.meetingPlace as Attraction)?._geoloc
              ? (itinerary?.meetingPlace as Attraction)?.translatedName
                ? ((itinerary?.meetingPlace as Attraction)?.translatedName as Record<string, string>)[itinerary?.locale || "en"]
                : (itinerary?.meetingPlace as Attraction)?.name
              : itineraryAttractions[0]?.translatedName
              ? (itineraryAttractions[0]?.translatedName as Record<string, string>)[itinerary?.locale || "en"]
              : itineraryAttractions[0]?.name}
            ² (
            <a
              href={
                (itinerary?.meetingPlace as Attraction)?._geoloc
                  ? `${(itinerary?.meetingPlace as Attraction)?.mapUrl}&hl=${itinerary?.locale}`
                  : `${itineraryAttractions[0]?.mapUrl}&hl=${itinerary?.locale}`
              }
              target="_blank"
              rel="noreferrer"
            >
              {t("openWith")}
            </a>
            )
          </p>
          <p>
            ² <span>{t("importantNotes2")}</span>
          </p>
          <p className="last-note">{t("importantNotes4")}</p>
        </div>
      </div>
      <div className="guide-fees">
        <p className="date-info">
          {t("guideFeeTimeInfo1")}
          <b>{t("guideFeeTimeInfo2")}</b>
          {t("guideFeeTimeInfo3")}
          <b>{t("guideFeeTimeInfo4")}</b>
        </p>
      </div>{" "}
      <ItineraryLunchBreak t={t} user={user} />
      <div className="purchase-notice">
        <h2>{t("purchaseNotice")}</h2>
        <ul>
          <li>
            <div className="circle"></div>
            <p>{t("purchaseNotice2")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("purchaseNotice3")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("purchaseNotice4")}</p>
          </li>
        </ul>
      </div>
      <div className="cancelation-policy">
        <h2>{t("cancelationPolicy")}</h2>
        <h3>{t("cancelationFee")}</h3>
        <p>{t("cancelationPolicyMsg4")}</p>
        <ul>
          <li>
            <div className="cancelation-days">{t("cancelationPolicy2")}</div>
            <div className="cancelation-fee">0%</div>
          </li>
          <li>
            <div className="cancelation-days">{t("cancelationPolicy3")}</div>
            <div className="cancelation-fee">50%</div>
          </li>
          <li>
            <div className="cancelation-days">{t("cancelationPolicy4")}</div>
            <div className="cancelation-fee">100%</div>
          </li>
        </ul>
        <p>{t("cancelationPolicyMsg3")}</p>
      </div>
      <div className="reminders">
        <h2>{t("reminders")}</h2>
        <ul>
          <li>
            <div className="circle"></div>
            <p>{t("reminders1")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("reminders2")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("reminders3")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("reminders4")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("reminders5")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>
              {t("travelersNumberDetails")} {t("travelersNumberDetails2")}
            </p>
          </li>
        </ul>
      </div>
    </ItineraryPoliciesStyles>
  );
};
export default React.memo(ItineraryPolicies);
