import React, { useState } from "react";
import { ItineraryNotesStyles } from "./styles/ItineraryNotesStyles";
import ShowOriginal from "../UI/ShowOriginal";
import { User } from "../../types/user";
import { Itinerary } from "../../types/itinerary";

interface ItineraryNotesProps {
  user: User;
  itinerary: Itinerary;
  updateItineraryHandler: (data: any) => Promise<any>;
  itineraryNotes: string;
  t: (key: string) => string;
  language?: any;
  hasItinerary?: (id: string) => boolean;
}

const ItineraryNotes = ({
  user,
  itinerary,
  updateItineraryHandler,
  itineraryNotes,
  t,
  language,
  hasItinerary,
}: ItineraryNotesProps) => {
  const [notes, setNotes] = useState(
    itineraryNotes?.length > 0 ? itineraryNotes : ""
  );
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const notesHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes?.length > 20) {
      updateItineraryHandler({ notes });
      setError(false);
      setEditNotes(false);
    } else {
      setError(true);
    }
  };
  return (
    <ItineraryNotesStyles id="notes">
      <div className="notes-title">
        <h2>{t("notes")}</h2>
        {!itinerary?.status && (
          <>
            {(itineraryNotes || itinerary?.translatedDescription) &&
              !editNotes && (
                <button onClick={() => setEditNotes(true)}>{t("edit")}</button>
              )}
            {!itineraryNotes &&
              !itinerary?.translatedDescription &&
              !editNotes && (
                <button onClick={() => setEditNotes(true)}>{t("add")}</button>
              )}
            {editNotes && (
              <button
                onClick={() => {
                  setEditNotes(false);
                  setNotes("");
                }}
              >
                {t("cancel")}
              </button>
            )}
          </>
        )}
      </div>
      {!editNotes && (
        <>
          {itinerary?.translatedDescription && (
            <>
              {itinerary?.published &&
                itinerary?.createdBy !== user?.uid &&
                itinerary?.locale &&
                itinerary?.translatedDescription[itinerary.locale] !==
                  itinerary?.description && (
                  <ShowOriginal
                    t={t}
                    showOriginal={showOriginal}
                    setShowOriginal={setShowOriginal}
                  />
                )}
            </>
          )}
          <p>
            {itineraryNotes?.length > 0 && itineraryNotes}
            {!itineraryNotes && !itinerary?.translatedDescription && (
              <>{t("noNotesItinerary")}</>
            )}
            {!itineraryNotes &&
              itinerary?.translatedDescription &&
              !showOriginal &&
              itinerary?.locale &&
              itinerary?.translatedDescription[itinerary.locale]}
            {!itineraryNotes &&
              itinerary?.translatedDescription &&
              showOriginal &&
              itinerary?.description}
          </p>
        </>
      )}
      {editNotes && (
        <form onSubmit={(e) => notesHandler(e)}>
          <textarea
            value={notes}
            placeholder={t("notesInput")}
            onChange={(e) => {
              if (1000 - e.target?.value?.length >= 0) {
                setNotes(e.target?.value);
              }
            }}
          ></textarea>
          <p className="char-remaining">
            {1000 - notes?.length} {t("charRemaining")}
          </p>
          {error && (
            <p className="error-message">
              &#9940;
              {t("minDescCharTraveler")}
            </p>
          )}
          <div className="edit-buttons">
            <button
              className="normal-button"
              type="button"
              onClick={() => setEditNotes(false)}
            >
              {t("cancel")}
            </button>
            <button className="normal-button" type="submit">
              {t("save")}
            </button>
          </div>
        </form>
      )}
    </ItineraryNotesStyles>
  );
};
export default React.memo(ItineraryNotes);
