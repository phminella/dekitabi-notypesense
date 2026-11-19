import { ItineraryCartWarningStyles } from "./styles/ItineraryCartWarningStyles";
import React from "react";
import dynamic from "next/dynamic";
import useItinerary from "../../../lib/useItinerary";
import { useState, useEffect } from "react";
import { User } from "../../../types/user";
import { Itinerary, ItineraryError } from "../../../types/itinerary";

const ItineraryWarning = dynamic(() => import("../ItineraryWarning"));

interface ItineraryCartWarningProps {
  user: User;
  itinerary: Itinerary;
  t: (key: string, options?: any) => string;
  errors: ItineraryError[];
  setShowErrorModal: (show: boolean) => void;
  hasItinerary: (id: string) => boolean;
  setSaved?: (saved: boolean) => void;
}

const ItineraryCartWarning = ({
  user,
  itinerary,
  t,
  errors,
  setShowErrorModal,
  hasItinerary,
}: ItineraryCartWarningProps) => {
  const [saving, setSaving] = useState(false);
  const { saveItinerary } = useItinerary();
  
  useEffect(() => {
    if (saving && user?.uid) {
      saveItinerary(itinerary)
        .then(() => {
          setSaving(false);
        })
        .catch((err: any) => {
          console.error(err);
          setSaving(false);
        });
    }
  }, [saving, user?.uid, saveItinerary, itinerary]);

  return (
    <ItineraryCartWarningStyles>
      <ItineraryWarning
        t={t}
        errors={errors}
        itinerary={itinerary}
        setShowErrorModal={setShowErrorModal}
        hasItinerary={hasItinerary}
        user={user}
      />
    </ItineraryCartWarningStyles>
  );
};

export default React.memo(ItineraryCartWarning);
