import { ItineraryDetailsFooterStyles } from "./styles/ItineraryDetailsFooterStyles";
import React from "react";
import dynamic from "next/dynamic";
import useItinerary from "../../../lib/useItinerary";
import { User } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime } from "../../../types/itinerary";

const ItineraryCartBook = dynamic(() => import("./ItineraryCartBook"));

interface ItineraryDetailsFooterProps {
  itinerary: Itinerary;
  itineraryTime: ItineraryTime;
  itineraryId: string;
  user: User;
  t: (key: string, options?: any) => string;
  itineraryAttractions: Attraction[];
  includeTransport: boolean;
  setShowGuideList: (show: boolean) => void;
  checkedGuides: () => void;
  errors?: any[];
  setPublished?: (pub: boolean) => void;
  setUnpublished?: (unpub: boolean) => void;
  setSaved?: (saved: boolean) => void;
  updateItineraryHandler?: (data: Partial<Itinerary>) => Promise<boolean>;
}

const ItineraryDetailsFooter = ({
  itinerary,
  itineraryTime,
  itineraryId,
  user,
  t,
  itineraryAttractions,
  includeTransport,
  setShowGuideList,
  checkedGuides
}: ItineraryDetailsFooterProps) => {
  const { hasItinerary } = useItinerary();
  return (
    <ItineraryDetailsFooterStyles
      className={
        (!user?.uid || user?.guide === "false") && hasItinerary(itineraryId)
          ? "traveler-details"
          : ""
      }
    >
      {!itinerary?.status && (
        <>
          {(!user?.uid || user?.guide === "false") && (
            <ItineraryCartBook
              t={t}
              user={user}
              itinerary={itinerary}
              itineraryTime={itineraryTime}
              itineraryAttractions={itineraryAttractions}
              includeTransport={includeTransport}
              setShowGuideList={setShowGuideList}
              checkedGuides={checkedGuides}
            />
          )}
        </>
      )}
    </ItineraryDetailsFooterStyles>
  );
};
export default React.memo(ItineraryDetailsFooter);
