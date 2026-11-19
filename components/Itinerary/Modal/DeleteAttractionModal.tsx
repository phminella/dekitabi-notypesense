import Image from "next/image";
import useItinerary from "../../../lib/useItinerary";
import React from "react";

import { Itinerary, TravelMode } from "../../../types/itinerary";

interface DeleteAttractionModalProps {
  setShowModal: () => void;
  setAttractionToDelete: (attr: any) => void;
  attractionName: string;
  attractionUrl: string;
  itinerary: Itinerary;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  setSelectedAttraction: (index: number | null | string) => void;
  t: (key: string) => string;
}

const DeleteAttractionModal = ({
  setShowModal,
  setAttractionToDelete,
  attractionName,
  attractionUrl,
  itinerary,
  updateItineraryHandler,
  setSelectedAttraction,
  t,
}: DeleteAttractionModalProps) => {
  const { removeAttraction } = useItinerary();

  return (
    <div style={{ paddingBottom: "15px" }}>
      <h3 className="modal-title">
        <Image height={25} width={25} src="/img/icon-alert.svg" alt="alert" />{" "}
        {t("deleteAttraction")}
      </h3>
      <p className="modal-message">
        {t("deleteAttraction2")} <span>({attractionName})</span>
      </p>
      <div className="modal-buttons">
        <button
          className="normal-button"
          onClick={() => {
            removeAttraction(itinerary?.id, attractionUrl, itinerary).then(
              (result: { attractions: string[]; travelModes: (string | TravelMode)[]; durations: number[] } | null | undefined) => {
                if (result) {
                  updateItineraryHandler({
                    attractions: result.attractions,
                    travelModes: result.travelModes,
                    durations: result.durations,
                  });
                }
              }
            );
            setAttractionToDelete(null);
            setShowModal();
            setSelectedAttraction("");
          }}
        >
          {t("yes")}
        </button>
        <button className="normal-button" onClick={() => setShowModal()}>
          {t("no")}
        </button>
      </div>
    </div>
  );
};
export default React.memo(DeleteAttractionModal);
