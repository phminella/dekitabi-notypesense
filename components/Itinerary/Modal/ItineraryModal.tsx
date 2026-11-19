import Modal from "../../UI/Modal";
import DeleteItineraryModal from "./DeleteItineraryModal";
import DeleteAttractionModal from "./DeleteAttractionModal";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Attraction } from "../../../types/attraction";

import { Itinerary } from "../../../types/itinerary";

interface ItineraryModalProps {
  itinerary: Itinerary;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  showModal: string;
  setShowModal: (show: string | boolean) => void;
  selectedAttraction: number | null;
  setSelectedAttraction: (index: number | null | string) => void;
  setAttractionToDelete: (attr: Attraction | null) => void;
  attractionToDelete: Attraction | null;
  t: (key: string) => string;
}

const ItineraryModal = ({
  itinerary,
  updateItineraryHandler,
  showModal,
  setShowModal,
  setSelectedAttraction,
  setAttractionToDelete,
  attractionToDelete,
  t,
}: ItineraryModalProps) => {
  const language = useSelector((state: RootState) => state.app.language);
  
  return (
    <Modal>
      {showModal === "deleteItinerary" && (
        <DeleteItineraryModal
          setShowModal={setShowModal}
          itinerary={itinerary}
          t={t}
        />
      )}
      {showModal === "deleteAttraction" && (
        <DeleteAttractionModal
          setShowModal={() => setShowModal(false)}
          attractionName={
            attractionToDelete?.translatedName
              ? (attractionToDelete.translatedName as Record<string, string>)[language?.code || "en"]
              : attractionToDelete?.name || ""
          }
          attractionUrl={attractionToDelete?.url || ""}
          itinerary={itinerary}
          updateItineraryHandler={updateItineraryHandler}
          setSelectedAttraction={setSelectedAttraction}
          t={t}
          setAttractionToDelete={setAttractionToDelete}
        />
      )}
    </Modal>
  );
};
export default React.memo(ItineraryModal);
