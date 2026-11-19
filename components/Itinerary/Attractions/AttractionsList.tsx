// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";
import LazySkeleton from "../../UI/LazySkeleton";
import useLocalStorage from "../../../lib/useLocalStorage";
import AttractionTravelMode from "./AttractionTravelMode";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime, TravelMode, ItineraryError } from "../../../types/itinerary";

const AttractionReportProblem = dynamic(() =>
  import("../../Misc/AttractionReport/AttractionReportProblem")
);
const ItineraryAttraction = dynamic(() => import("./ItineraryAttraction"), {
  loading: () => <LazySkeleton height={86} minHeight={86} width={"100%"} />,
});

interface AttractionsListProps {
  user: User;
  itineraryAttractions: Attraction[];
  itineraryDate: string;
  itineraryMeetingPlace?: Attraction | "" | false;
  itineraryTime: ItineraryTime;
  itineraryTravelModes: (string | TravelMode)[];
  itineraryId: string;
  itineraryStatus: boolean;
  itineraryDurations: number[];
  closedAttractions: string[];
  language: LanguageOption;
  dragging: React.MutableRefObject<string | boolean | null>;
  selectedAttraction: number | null;
  setSelectedAttraction: (attr: number | null) => void;
  itineraryEndPlace?: Attraction | "" | false;
  itineraryCreatedBy: string;
  setShowMap: (show: boolean) => void;
  setShowModal: (modal: string | boolean) => void;
  setErrors: (errors: ItineraryError[]) => void;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  setAttractionToDelete: (attr: Attraction | null) => void;
  lunchBreak: number;
  updateLunchBreak: (index: number) => void;
  showTutorial: boolean;
  t: (key: string, options?: any) => string;
  loadingPhotos: string[];
}

const AttractionsList = ({
  user,
  itineraryAttractions,
  itineraryDate,
  itineraryMeetingPlace,
  itineraryTime,
  itineraryTravelModes,
  itineraryId,
  itineraryStatus,
  itineraryDurations,
  closedAttractions,
  language,
  dragging,
  selectedAttraction,
  setSelectedAttraction,
  itineraryEndPlace,
  itineraryCreatedBy,
  setShowMap,
  setShowModal,
  setErrors,
  updateItineraryHandler,
  setAttractionToDelete,
  lunchBreak,
  updateLunchBreak,
  showTutorial,
  t,
  loadingPhotos,
}: AttractionsListProps) => {
  const [attractionsFromList, setAttractionsFromList] =
    useState(itineraryAttractions);
  const [ready, setReady] = useState(false);
  const dnd = useRef<{
    DragDropContext: any;
    Droppable: any;
    Draggable: any;
  } | null>(null);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    setAttractionsFromList(itineraryAttractions);
  }, [itineraryAttractions]);

  useEffect(() => {
    let isMounted = true;
    import("@hello-pangea/dnd").then((mod) => {
      if (isMounted) {
        const res = {
          DragDropContext: mod.DragDropContext,
          Droppable: mod.Droppable,
          Draggable: mod.Draggable,
        };
        setReady(true);
        dnd.current = res;
        if (typeof window === "undefined") {
          (dnd.current as any).resetServerContext();
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const [showReport, setShowReport] = useState(false);
  const [attractionToReport, setAttractionToReport] = useState("");

  const openSendReport = (attractionName: string) => {
    setAttractionToReport(attractionName);
    setShowReport(true);
  };

  const onDragStart = (val: any) => {
    dragging.current = val?.draggableId || null;
  };

  const onDragEnd = (val: any) => {
    setSelectedAttraction(null);
    const { source, destination } = val;

    if (!destination || source.index === destination.index) {
      dragging.current = false;
      return;
    }

    const attractions = [...itineraryAttractions];
    const durations = [...itineraryDurations];

    const removedAttraction = attractions[source.index];
    const removedDuration = durations[source.index];

    attractions.splice(source.index, 1);
    attractions.splice(destination.index, 0, removedAttraction);
    durations.splice(source.index, 1);
    durations.splice(destination.index, 0, removedDuration);

    setAttractionsFromList(attractions);

    setTimeout(() => {
      updateItineraryHandler({ attractions, durations });
      dragging.current = false;
    });

    if (!getItem("dragItinerary")) {
      setItem("dragItinerary", true);
    }
  };

  const getItemStyle = (style: any, isDragging: boolean) => ({
    userSelect: "none" as const,
    borderRadius: 8,
    background: isDragging ? "#b3d4fc" : "#ffffff",
    border: "1px dashed #ddd",
    borderBottom: "none",
    ...style,
  });

  if (!ready || !dnd.current) return <p>Loading drag and drop...</p>;

  const { DragDropContext, Droppable, Draggable } = dnd.current;

  return (
    <div className="drag-drop-wrapper">
      {showReport && (
        <AttractionReportProblem
          attractionName={attractionToReport}
          t={t}
          showModal={showReport}
          setShowModal={setShowReport}
        />
      )}
      <div className="drag-drop">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId={"droppable"}>
            {(droppableProvided: any) => (
              <div
                ref={droppableProvided?.innerRef}
                {...droppableProvided?.droppableProps}
              >
                {attractionsFromList?.map((attraction, i) => (
                  <Draggable
                    key={String(attraction?.url)}
                    draggableId={String(attraction?.url)}
                    index={i}
                  >
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided?.innerRef}
                        {...provided?.draggableProps}
                        {...provided?.dragHandleProps}
                        className="draggable-item"
                        style={getItemStyle(
                          provided.draggableProps.style,
                          snapshot.isDragging
                        )}
                      >
                        <ItineraryAttraction
                          updateItineraryHandler={updateItineraryHandler}
                          itineraryMeetingPlace={itineraryMeetingPlace}
                          itineraryDate={itineraryDate}
                          language={language}
                          index={i}
                          itineraryId={itineraryId}
                          itineraryStatus={itineraryStatus}
                          attraction={attraction}
                          arrivalDepartureTime={itineraryTime?.arrivalDepartureTime}
                          dragging={dragging?.current}
                          selectedAttraction={selectedAttraction}
                          setSelectedAttraction={setSelectedAttraction}
                          setShowMap={setShowMap}
                          setShowModal={setShowModal}
                          setErrors={setErrors}
                          t={t}
                          closedAttractions={closedAttractions}
                          openSendReport={openSendReport}
                          user={user}
                          i={i}
                          setAttractionToDelete={setAttractionToDelete}
                          showTutorial={showTutorial}
                          itineraryCreatedBy={itineraryCreatedBy}
                          itineraryDurations={itineraryDurations}
                          loadingPhotos={loadingPhotos}
                        />
                        {itineraryAttractions[i + 1] && (
                          <div
                            style={{
                              opacity:
                                dragging.current === attraction?.url
                                  ? "0.3"
                                  : "1",
                            }}
                          >
                            <div className="transit-time-line">
                              <div className="transit-time-dots"></div>
                              <div className="transit-time-dots"></div>
                            </div>
                            <div className="itinerary-attraction-transit-time">
                              <AttractionTravelMode
                                itineraryCreatedBy={itineraryCreatedBy}
                                user={user}
                                language={language}
                                t={t}
                                transitTime={
                                  itineraryTime?.attractionTransitTime[
                                    (itineraryMeetingPlace as Attraction)?._geoloc ? i + 1 : i
                                  ]
                                }
                                index={i}
                                itineraryTravelModes={itineraryTravelModes}
                                updateItineraryHandler={updateItineraryHandler}
                                itineraryMeetingPlace={itineraryMeetingPlace}
                                itineraryEndPlace={itineraryEndPlace}
                                lunchBreak={lunchBreak}
                                updateLunchBreak={updateLunchBreak}
                                itineraryAttractions={itineraryAttractions}
                              />
                            </div>
                            <div className="transit-time-line">
                              <div className="transit-time-dots"></div>
                              <div className="transit-time-dots"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided?.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default React.memo(AttractionsList);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
