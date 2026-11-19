import RemoveAttractionButton from "./RemoveAttractionButton";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
const AttractionItineraryItem = ({
  attraction,
  itinerary,
  setShowItinerary,
  setAdded,
  setRemoved,
  setAttractionToItinerary,
  removeAttraction,
}) => {
  const [attractionExists, setAttractionExists] = useState(false);
  useEffect(() => {
    const attractionName = attraction?.url?.split("-")?.join(" ");
    const exists = itinerary?.attractions?.some(
      (itineraryAttraction) => itineraryAttraction === attractionName
    );
    setAttractionExists(Boolean(exists));
  }, [attraction?.url, itinerary?.attractions]);
  const addToItinerary = (itineraryId, attraction) => {
    setAttractionToItinerary(itineraryId, attraction).then(() => {
      setAdded(true);
      setTimeout(() => {
        setShowItinerary(false);
        setAdded(false);
      }, 1200);
    });
  };
  return (
    <li>
      <Image
        height={20}
        width={20}
        src="/img/icon-marker.svg"
        alt="plus"
      ></Image>
      <button
        href={`/itinerary/${itinerary?.id}`}
        className="itinerary-list-text add-to-itinerary-button"
        onClick={() => {
          if (attractionExists) {
            removeAttraction(itinerary?.id, attraction?.url)
              .then(() => {
                setRemoved(true);
                setTimeout(() => {
                  setShowItinerary(false);
                  setRemoved(false);
                }, 1200);
              })
              .catch(() => {});
          } else {
            addToItinerary(itinerary?.id, attraction);
          }
        }}
      >
        {itinerary?.name}{" "}
      </button>
      {!attractionExists && (
        <button
          className="itinerary-list-button"
          onClick={() => {
            addToItinerary(itinerary?.id, attraction);
          }}
        >
          <Image
            height={15}
            width={15}
            src="/img/icon-plus.svg"
            alt="plus"
          ></Image>
        </button>
      )}
      {attractionExists && (
        <RemoveAttractionButton
          removeAttraction={removeAttraction}
          attractionUrl={attraction?.url}
          itineraryId={itinerary?.id}
          setShowItinerary={setShowItinerary}
          setRemoved={setRemoved}
        />
      )}
    </li>
  );
};
export default React.memo(AttractionItineraryItem);
