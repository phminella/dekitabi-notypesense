import Image from "next/image";
import useItinerary from "../../../lib/useItinerary";
import React, { useState } from "react";

import { Itinerary } from "../../../types/itinerary";

interface DeleteItineraryModalProps {
  itinerary: Itinerary;
  setShowModal: (show: boolean) => void;
  t: (key: string) => string;
}

const DeleteItineraryModal = ({ itinerary, setShowModal, t }: DeleteItineraryModalProps) => {
  const { deleteItinerary } = useItinerary();
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ paddingBottom: "15px" }}>
      <h3 className="modal-title">
        <Image height={25} width={25} src="/img/icon-alert.svg" alt="alert" />
        {t("deleteItinerary")}
      </h3>
      <p className="modal-message">
        {t("deleteItinerary2")} <span>({itinerary?.name})</span>
      </p>
      <div className="modal-buttons">
        {!loading ? (
          <button
            className="normal-button"
            onClick={() => {
              setLoading(true);
              deleteItinerary(itinerary).then(() => {
                setLoading(false);
                setShowModal(false);
              });
            }}
          >
            {t("yes")}
          </button>
        ) : (
          <div className="fake-button">
            <Image
              height={30}
              width={30}
              src="/img/icon-spinner.svg"
              alt="spinner"
            />
          </div>
        )}
        <button
          className="normal-button"
          onClick={() => setShowModal(false)}
          disabled={loading}
        >
          {t("no")}
        </button>
      </div>
    </div>
  );
};
export default React.memo(DeleteItineraryModal);
