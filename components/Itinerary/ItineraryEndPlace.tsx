import Image from "next/image";
import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { getFunctions, httpsCallable } from "firebase/functions";
import Skeleton from "@mui/material/Skeleton";

import useDate from "../../lib/useDate";
import { ItineraryMeetingPlaceStyles } from "./styles/ItineraryMeetingPlaceStyles";
import PlaceAutoComplete from "../Misc/PlaceAutoComplete";
import {
  extractPlaceResult,
  getLatLngFromPlaceId,
  getPlaceLatLng,
} from "../../lib/googlePlaceUtils";

import { Itinerary } from "../../types/itinerary";
import { Attraction } from "../../types/attraction";
import { User, LanguageOption } from "../../types/user";
import { RootState } from "../../store/store";

interface ItineraryEndPlaceProps {
  itinerary: Itinerary;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  arrivalDepartureTime: { arrival: number; departure?: number }[];
  dragging?: React.MutableRefObject<boolean>;
  t: (key: string) => string;
  selectedAttraction?: number | string | null;
  setSelectedAttraction: (attr: number | string | null) => void;
  setShowMap: (show: boolean) => void;
  index: number;
  itineraryAttractions: Attraction[];
  user: User;
}

const ItineraryEndPlace = ({
  itinerary,
  updateItineraryHandler,
  arrivalDepartureTime,
  dragging,
  t,
  selectedAttraction,
  setSelectedAttraction,
  setShowMap,
  index,
  itineraryAttractions,
  user,
}: ItineraryEndPlaceProps) => {
  const language = useSelector((state: RootState) => state.app.language, shallowEqual);
  const [stopInput, setStopInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [translateName, setTranslateName] = useState(true);
  const { toTime } = useDate();

  const getAttraction = httpsCallable(
    getFunctions(undefined, "asia-northeast1"),
    "getAttraction"
  );

  const addAttraction = async (placeId: string, selectedPlace: any) => {
    if (!getAttraction || !placeId) return;

    setLoading(true);

    try {
      const response = await getAttraction({
        placeId,
        language: language?.code,
      });

      const place = extractPlaceResult(response);

      let coordinates = getPlaceLatLng(place) || getPlaceLatLng(selectedPlace);
      if (!coordinates) {
        coordinates = await getLatLngFromPlaceId(placeId);
      }
      if (!coordinates) {
        throw new Error("Invalid geolocation data.");
      }
      const [lat, lng] = coordinates;
      const fallbackName =
        selectedPlace?.structured_formatting?.main_text ||
        selectedPlace?.description?.split(",")?.[0] ||
        "";
      const placeName = place?.name || place?.formatted_address || fallbackName;
      if (!placeName) {
        throw new Error("Missing required place data.");
      }
      const mapUrl =
        place?.url ||
        place?.mapUrl ||
        selectedPlace?.url ||
        (placeId
          ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
          : "");

      const endPlace = {
        mapUrl,
        _geoloc: [lat, lng] as [number, number],
        name: placeName,
        photos:
          Array.isArray(place?.photos) && place?.photos?.[0]?.photo_reference
            ? [place.photos[0].photo_reference]
            : [],
      };

      const travelModes = [
        ...(Array.isArray(itinerary?.travelModes) ? itinerary.travelModes : []),
        { type: "TRANSIT", time: 20, mapTime: 0 },
      ];

      await updateItineraryHandler({ endPlace, travelModes });
      setStopInput("");
    } catch (error) {
      console.error("Failed to add end place:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeEndPlace = () => {
    const travelModes = [...(itinerary?.travelModes || [])];
    travelModes.pop();
    setSelectedAttraction("");
    updateItineraryHandler({ endPlace: "", travelModes });
    setStopInput("");
  };

  const endPlace = itinerary?.endPlace as Attraction;
  const arrival =
    arrivalDepartureTime[arrivalDepartureTime?.length - 1]?.arrival;

  return (
    <ItineraryMeetingPlaceStyles>
      {loading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={92}
          style={{ marginTop: "20px", borderRadius: "10px" }}
        />
      ) : (
        <>
          {endPlace ? (
            <div className="meeting-place-wrapper">
              <div className="attraction-time">
                <div
                  className={`attraction-id-pin ${
                    selectedAttraction === index ? "selected" : ""
                  }`}
                />
                <div
                  className="attraction-id"
                  onClick={() => {
                    setSelectedAttraction(index);
                    setShowMap(true);
                  }}
                >
                  <div>{itineraryAttractions?.length + 1}</div>
                </div>
              </div>
              <div
                className="meeting-place-photo"
                onClick={() => {
                  setSelectedAttraction(index);
                  setShowMap(true);
                }}
              >
                <Image
                  alt="end-place"
                  width={40}
                  height={40}
                  src="/img/icon-marker2.svg"
                />
              </div>
              <div
                className="meeting-place"
                onClick={() => {
                  setSelectedAttraction(index);
                  setShowMap(true);
                }}
              >
                <div className="attraction-itinerary">
                  <Image
                    src="/img/icon-marker2.svg"
                    height={13}
                    width={13}
                    alt="marker"
                  />
                  {!dragging?.current ? (
                    !isNaN(arrival) && <span>{toTime(arrival)}</span>
                  ) : (
                    <Image
                      src="/img/icon-spinner.svg"
                      height={20}
                      width={20}
                      alt="loading"
                    />
                  )}
                </div>
                <h4>
                  {endPlace?.translatedName && translateName
                    ? (endPlace.translatedName as Record<string, string>)[itinerary?.locale || "en"]
                    : endPlace.name}{" "}
                  {endPlace?.translatedName && (
                    <button
                      onClick={() => setTranslateName((prev) => !prev)}
                      className="translate-button"
                    >
                      {translateName ? t("showOriginal") : t("translate")}
                    </button>
                  )}
                </h4>
                <a
                  className="open-with-google"
                  href={`${endPlace?.mapUrl}&hl=${language?.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("openWith")}
                </a>
              </div>
              {!itinerary?.status && (
                <button
                  className="meeting-place-delete"
                  onClick={removeEndPlace}
                >
                  <Image
                    height={20}
                    width={20}
                    src="/img/icon-delete.svg"
                    alt="delete"
                  />
                </button>
              )}
            </div>
          ) : (
            !itinerary?.status && (
              <div className="stop-wrapper">
                <div className="input-wrapper end-wrapper">
                  <PlaceAutoComplete
                    t={t}
                    input={stopInput}
                    setInput={setStopInput}
                    inputPlaceholder="endPlaceInput"
                    disabled={false}
                    location={itineraryAttractions?.at(-1) || "tokyo station"}
                    language={language}
                    setPlace={addAttraction}
                  />
                </div>
              </div>
            )
          )}
        </>
      )}
    </ItineraryMeetingPlaceStyles>
  );
};

export default React.memo(ItineraryEndPlace);
