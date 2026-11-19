import React, { useState } from "react";
import { ItineraryNotesStyles } from "./styles/ItineraryNotesStyles";
import ShowOriginal from "../UI/ShowOriginal";
import { User, LanguageOption } from "../../types/user";
import { Itinerary } from "../../types/itinerary";

interface ItineraryDescriptionProps {
  user: User;
  itinerary: Itinerary;
  updateItineraryHandler: (data: any) => Promise<any>;
  itineraryNotes: string;
  itineraryTranslatedNotes: Record<string, string>;
  t: (key: string) => string;
  language: LanguageOption;
  hasItinerary: (id: string) => boolean;
}

const ItineraryDescription = ({
  user,
  itinerary,
  updateItineraryHandler,
  itineraryNotes,
  itineraryTranslatedNotes,
  t,
  language,
  hasItinerary,
}: ItineraryDescriptionProps) => {
  const [editNotes, setEditNotes] = useState<boolean | undefined>();
  const [error, setError] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [notes, setNotes] = useState(
    itineraryTranslatedNotes && user?.uid !== itinerary?.createdBy
      ? itineraryTranslatedNotes[language?.code]
      : itineraryNotes?.length > 0
      ? itineraryNotes
      : ""
  );
  const notesHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes?.length > 20) {
      updateItineraryHandler({ description: notes });
      setNotes("");
      setError(false);
      setEditNotes(false);
    } else {
      setError(true);
    }
  };
  return (
    <ItineraryNotesStyles id="notes">
      <div className="notes-title">
        <h2 className="itinerary-titles">{t("description")}</h2>
        {hasItinerary(itinerary?.id) && user?.guide === "true" && (
          <>
            {itineraryNotes && !editNotes && (
              <button
                onClick={() => {
                  setNotes(itineraryNotes);
                  setEditNotes(true);
                }}
              >
                {t("edit")}
              </button>
            )}
            {!itineraryNotes && !editNotes && (
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
              {itinerary?.createdBy !== user?.uid &&
                itinerary?.translatedDescription[language?.code] !==
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
            {itineraryTranslatedNotes && !showOriginal
              ? itineraryTranslatedNotes[language?.code]
              : itineraryNotes?.length > 0
              ? itineraryNotes
              : t("noDescriptionItinerary")}
          </p>
        </>
      )}
      {editNotes && (
        <form onSubmit={(e) => notesHandler(e)}>
          <textarea
            value={notes}
            placeholder={t("notesInput")}
            onChange={(e) => {
              if (1000 - e.target.value.length >= 0) {
                setNotes(e.target.value);
              }
            }}
          ></textarea>
          <p className="char-remaining">
            {1000 - notes?.length} {t("charRemaining")}
          </p>
          {error && (
            <p className="error-message">
              &#9940;
              <>{t("minDescCharGuide")}</>
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
export default React.memo(ItineraryDescription);
