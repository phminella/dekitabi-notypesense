import Image from "next/image";
import React from "react";
import { RemoveItineraryButtonStyles } from "./styles/RemoveItineraryButtonStyles";

interface RemoveItineraryButtonProps {
  setShowModal: (modal: string) => void;
  t: (key: string) => string;
}

const RemoveItineraryButton = ({ setShowModal, t }: RemoveItineraryButtonProps) => {
  return (
    <RemoveItineraryButtonStyles>
      <button
        className="remove-itinerary-button"
        onClick={() => setShowModal("deleteItinerary")}
      >
        {t("deleteItinerary")}
        <Image src="/img/icon-delete.svg" height={15} width={15} alt="delete" />
      </button>
    </RemoveItineraryButtonStyles>
  );
};
export default React.memo(RemoveItineraryButton);
