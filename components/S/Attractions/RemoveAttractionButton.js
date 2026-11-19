import Image from "next/legacy/image";
import React from "react";
const RemoveAttractionButton = ({
  attractionUrl,
  itineraryId,
  removeAttraction,
  setShowItinerary,
  setRemoved,
}) => {
  return (
    <button
      className="remove-attraction-button"
      onClick={() => {
        removeAttraction(itineraryId, attractionUrl)
          .then(() => {
            setRemoved(true);
            setTimeout(() => {
              setShowItinerary(false);
              setRemoved(false);
            }, 1200);
          })
          .catch(() => {});
      }}
    >
      <Image
        height={15}
        width={15}
        src="/img/icon-delete.svg"
        alt="close"
      ></Image>
      <span></span>
    </button>
  );
};
export default React.memo(RemoveAttractionButton);
