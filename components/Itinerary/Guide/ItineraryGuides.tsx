// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { ItineraryGuidesStyles } from "./styles/ItineraryGuidesStyles";
import { ItineraryGuidesResponsiveStyles } from "./styles/responsive/ItineraryGuidesResponsiveStyles";
import dynamic from "next/dynamic";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { User } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime } from "../../../types/itinerary";

const ItineraryBookedGuide = dynamic(() => import("./ItineraryBookedGuide"), {
  ssr: false,
});
const ItineraryGuideList = dynamic(() => import("./ItineraryGuideList"), {
  ssr: false,
});

interface ItineraryGuidesProps {
  itinerary: Itinerary;
  user: User;
  updateItineraryHandler: (data: any) => Promise<any>;
  t: (key: string, options?: any) => string;
  showGuideList: boolean;
  setShowGuideList: (show: boolean) => void;
  itineraryTime: ItineraryTime;
  currency: any;
  itineraryGuideData?: any;
  itineraryAttractions: Attraction[];
  itineraryDate: string;
  itineraryCreatedBy: string;
  itineraryId: string;
  itineraryStatus: boolean | string;
  includeTransport: boolean;
  setIncludeTransport: (include: boolean) => void;
}

const ItineraryGuides = ({
  itinerary,
  user,
  updateItineraryHandler,
  t,
  showGuideList,
  setShowGuideList,
  itineraryTime,
  currency,
  itineraryGuideData,
  itineraryAttractions,
  itineraryDate,
  itineraryCreatedBy,
  itineraryId,
  itineraryStatus,
  includeTransport,
  setIncludeTransport,
}: ItineraryGuidesProps) => {
  const [loading, setLoading] = useState(true);
  const guidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInsideGuides = guidesRef.current?.contains(event.target as Node);
      const clickedInsideCalendar = (event.target as HTMLElement).closest(
        ".SingleDatePicker_picker"
      );

      const isScrollbarClick =
        event.clientX >= document.documentElement.clientWidth ||
        event.clientY >= document.documentElement.clientHeight;

      if (!clickedInsideGuides && !clickedInsideCalendar && !isScrollbarClick) {
        setShowGuideList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowGuideList]);

  return (
    <ItineraryGuidesResponsiveStyles>
      <ItineraryGuidesStyles
        className={`guides ${itineraryGuideData ? "guide-page" : ""} ${
          (itineraryAttractions?.length ?? 0) === 0 ? "no-attractions" : ""
        }`}
        id="guides"
        ref={guidesRef}
      >
        {showGuideList && (
          <div className="guide-list-wrapper">
            <button
              className="close-guide-list"
              onClick={() => setShowGuideList(false)}
            >
              <Image
                height={25}
                width={25}
                src="/img/icon-close.svg"
                alt="close-guide-list-icon"
              />
            </button>
            {!itineraryGuideData && (
              <ItineraryGuideList
                updateItineraryHandler={updateItineraryHandler}
                loading={loading}
                setLoading={setLoading}
                setShowGuideList={setShowGuideList}
                t={t}
                itineraryAttractions={itineraryAttractions}
                itineraryDate={itineraryDate}
                itineraryId={itineraryId}
                itineraryStatus={itineraryStatus}
                itineraryCreatedBy={itineraryCreatedBy}
                includeTransport={includeTransport}
                itinerary={itinerary}
              />
            )}
            {itineraryGuideData && (
              <ItineraryBookedGuide
                user={user}
                itineraryGuideData={itineraryGuideData}
                t={t}
                currency={currency}
                setShowGuideList={setShowGuideList}
                updateItineraryHandler={updateItineraryHandler}
                setLoading={setLoading}
                includeTransport={includeTransport}
              />
            )}
          </div>
        )}
      </ItineraryGuidesStyles>
    </ItineraryGuidesResponsiveStyles>
  );
};
export default React.memo(ItineraryGuides);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
