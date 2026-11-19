import dottie from "dottie";
import React from "react";
import dynamic from "next/dynamic";
import LazySkeleton from "../../UI/LazySkeleton";
const Attraction = dynamic(() => import("./Attraction"), {
  loading: () => <LazySkeleton height={160} />,
});
const AttractionsList = ({
  attractions,
  selectedAttraction,
  setSelectedAttraction,
  setShowMap,
  t,
  language,
  setAttractionToAdd,
  showItinerary,
  setShowItinerary,
}) => {
  return (
    <>
      {attractions?.map((attraction, i) => {
        return (
          <Attraction
            key={String(i)}
            onClick={() => setSelectedAttraction(i)}
            language={language}
            attraction={dottie.transform(attraction?.document)}
            i={i}
            selectedAttraction={selectedAttraction}
            t={t}
            setSelectedAttraction={setSelectedAttraction}
            setAttractionToAdd={setAttractionToAdd}
            setShowItinerary={setShowItinerary}
            showItinerary={showItinerary}
            setShowMap={setShowMap}
          />
        );
      })}
    </>
  );
};
export default React.memo(AttractionsList);
