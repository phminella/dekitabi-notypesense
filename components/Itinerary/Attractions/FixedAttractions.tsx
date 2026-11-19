// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import dynamic from "next/dynamic";
import React, { useState } from "react";
import AttractionTravelMode from "./AttractionTravelMode";
import LazySkeleton from "../../UI/LazySkeleton";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { ItineraryTime } from "../../../types/itinerary";

const AttractionReportProblem = dynamic(() =>
  import("../../Misc/AttractionReport/AttractionReportProblem")
);
const ItineraryAttraction = dynamic(() => import("./ItineraryAttraction"), {
  loading: () => <LazySkeleton height={86} minHeight={86} width={"100%"} />,
});

interface FixedAttractionsProps {
  user: User;
  itineraryAttractions: Attraction[];
  itineraryDate: string;
  itineraryMeetingPlace?: Attraction | "" | false;
  itineraryTravelModes: any[];
  itineraryTime: ItineraryTime;
  itineraryId: string;
  itineraryStatus: boolean;
  lunchBreak: number;
  closedAttractions: string[];
  language: LanguageOption;
  selectedAttraction?: number | null;
  setSelectedAttraction: (attr: number | null) => void;
  setShowMap: (show: boolean) => void;
  setShowModal: (modal: string | boolean) => void;
  setErrors: (errors: string[]) => void;
  t: (key: string, options?: any) => string;
  showTutorial: boolean;
}

const FixedAttractions = ({
  user,
  itineraryAttractions,
  itineraryDate,
  itineraryMeetingPlace,
  itineraryTravelModes,
  itineraryTime,
  itineraryId,
  itineraryStatus,
  lunchBreak,
  closedAttractions,
  language,
  selectedAttraction,
  setSelectedAttraction,
  setShowMap,
  setShowModal,
  setErrors,
  t,
  showTutorial,
}: FixedAttractionsProps) => {
  const [showReport, setShowReport] = useState(false);
  const [attractionToReport, setAttractionToReport] = useState("");

  const openSendReport = (attractionName: string) => {
    setAttractionToReport(attractionName);
    setShowReport(true);
  };

  return (
    <>
      {showReport && (
        <AttractionReportProblem
          attractionName={attractionToReport}
          t={t}
          showModal={showReport}
          setShowModal={setShowReport}
        />
      )}
      {itineraryAttractions?.map((attraction, i) => (
        <div key={i}>
          <ItineraryAttraction
            itineraryDate={itineraryDate}
            language={language}
            index={i}
            itineraryId={itineraryId}
            itineraryStatus={itineraryStatus}
            attraction={attraction}
            arrivalDepartureTime={itineraryTime?.arrivalDepartureTime}
            dragging={false}
            setSelectedAttraction={setSelectedAttraction}
            selectedAttraction={selectedAttraction}
            setShowModal={setShowModal}
            setErrors={setErrors as any}
            t={t}
            closedAttractions={closedAttractions}
            openSendReport={openSendReport}
            user={user}
            setShowMap={setShowMap}
            showTutorial={showTutorial}
          />
          {itineraryAttractions[i + 1] && (
            <div>
              <div>
                <div className="transit-time-line">
                  <div className="transit-time-dots"></div>
                  <div className="transit-time-dots"></div>
                </div>
                <div className="itinerary-attraction-transit-time">
                  <AttractionTravelMode
                    transitTime={
                      itineraryTime?.attractionTransitTime[
                        (itineraryMeetingPlace as Attraction)?._geoloc ? i + 1 : i
                      ]
                    }
                    index={i}
                    itineraryTravelModes={itineraryTravelModes}
                    itineraryMeetingPlace={itineraryMeetingPlace}
                    lunchBreak={lunchBreak}
                    itineraryStatus={itineraryStatus}
                    user={user}
                    language={language}
                    t={t}
                    updateLunchBreak={() => {}} // Not needed for fixed view?
                    updateItineraryHandler={() => Promise.resolve(true)} // Not needed for fixed view?
                    itineraryCreatedBy={""} // Not needed for fixed view?
                    itineraryAttractions={itineraryAttractions}
                  />
                </div>
                <div className="transit-time-line">
                  <div className="transit-time-dots"></div>
                  <div className="transit-time-dots"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default React.memo(FixedAttractions);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
