import { ItineraryGuideStyles } from "./styles/ItineraryGuideStyles";
import Link from "next/link";
import Avatar from "../../UI/Avatar";
import React from "react";
import isMobile from "../../../lib/isMobile";
import { User } from "../../../types/user";
import { Itinerary } from "../../../types/itinerary";
import { Attraction } from "../../../types/attraction";
import { ItineraryGuide as ItineraryGuideType } from "../../../types/itineraryGuide";

interface ItineraryGuideProps {
  itinerary: Itinerary;
  user: User;
  setShowGuideList: (show: boolean) => void;
  t: (key: string, options?: any) => string;
  itineraryAttractions?: Attraction[];
}

const ItineraryGuide = ({
  itinerary,
  user,
  setShowGuideList,
  t,
}: ItineraryGuideProps) => {
  return (
    <ItineraryGuideStyles
      className={`itinerary-details-guide ${
        itinerary?.guideFee ? "with-guide" : ""
      }`}
    >
      {!itinerary?.guideData && user?.guide !== "true" ? (
        <></>
      ) : (
        <>
          <Link
            prefetch={false}
            href={`/${(itinerary?.guideData as ItineraryGuideType | undefined)?.username}`}
            target={isMobile() ? "_self" : "_blank"}
            rel="noreferrer"
          >
            <Avatar
              width={50}
              height={50}
              src={
                (itinerary?.guideData as ItineraryGuideType | undefined)?.avatar !== "/img/avatar.png"
                  ? (itinerary?.guideData as ItineraryGuideType | undefined)?.avatar
                  : ((itinerary?.guideData as ItineraryGuideType | undefined)?.photos?.length ?? 0) > 0
                  ? (itinerary?.guideData as ItineraryGuideType | undefined)?.photos![0]
                  : "/img/avatar.png"
              }
            />
            <p>
              <span>
                {(itinerary?.guideData as ItineraryGuideType | undefined)?.firstname ? (
                  <>
                    {(itinerary?.guideData as ItineraryGuideType | undefined)?.firstname}{" "}
                    {(itinerary?.guideData as ItineraryGuideType | undefined)?.lastname}
                  </>
                ) : (
                  <>{(itinerary?.guideData as ItineraryGuideType | undefined)?.username}</>
                )}
              </span>
            </p>
          </Link>
          {user?.guide !== "true" && !itinerary.status && (
            <button
              className="normal-button"
              onClick={() => setShowGuideList(true)}
            >
              {t("changeGuide")}
            </button>
          )}
        </>
      )}
    </ItineraryGuideStyles>
  );
};
export default React.memo(ItineraryGuide);
