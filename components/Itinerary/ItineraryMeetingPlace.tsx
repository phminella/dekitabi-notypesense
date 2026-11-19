import { ItineraryMeetingPlaceStyles } from "./styles/ItineraryMeetingPlaceStyles";
import Image from "next/image";
import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useSelector, shallowEqual } from "react-redux";
import PlaceAutoComplete from "../Misc/PlaceAutoComplete";
import Skeleton from "@mui/material/Skeleton";
import {
  extractPlaceResult,
  getLatLngFromPlaceId,
  getPlaceLatLng,
} from "../../lib/googlePlaceUtils";

import { Itinerary } from "../../types/itinerary";
import { Attraction } from "../../types/attraction";
import { User, LanguageOption } from "../../types/user";
import { RootState } from "../../store/store";

interface ItineraryMeetingPlaceProps {
  itinerary: Itinerary;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  t: (key: string) => string;
  selectedAttraction?: number | string | null;
  setSelectedAttraction: (attr: number | string | null) => void;
  setShowMap: (show: boolean) => void;
  itineraryAttractions: Attraction[];
  user: User;
}

const ItineraryMeetingPlace = ({
  itinerary,
  updateItineraryHandler,
  t,
  selectedAttraction,
  setSelectedAttraction,
  setShowMap,
  itineraryAttractions,
  user,
}: ItineraryMeetingPlaceProps) => {
  const language = useSelector((state: RootState) => state.app.language, shallowEqual);
  const [meetingInput, setMeetingInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [translateName, setTranslateName] = useState(true);

  let getAttraction: any;
  try {
    const functions = getFunctions(undefined, "asia-northeast1");
    getAttraction = httpsCallable(functions, "getAttraction");
  } catch (err) {
    console.log(err);
  }

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

      const meetingPlace = {
        mapUrl,
        _geoloc: [lat, lng] as [number, number],
        name: placeName,
        photos:
          Array.isArray(place?.photos) && place?.photos?.[0]?.photo_reference
            ? [place.photos[0].photo_reference]
            : [],
      };

      const tempMapTime = user?.guide === "true" ? 20 : 20;

      await updateItineraryHandler({
        meetingPlace,
        travelModes: [
          { type: "TRANSIT", time: tempMapTime, mapTime: 0 },
          ...(Array.isArray(itinerary?.travelModes)
            ? itinerary.travelModes
            : []),
        ],
      });

      setMeetingInput("");
    } catch (err) {
      console.error("Failed to add meeting place:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeMeetingPoint = () => {
    const tempTravelModes = [...(itinerary?.travelModes || [])];
    tempTravelModes.shift();
    setSelectedAttraction("");
    updateItineraryHandler({ meetingPlace: "", travelModes: tempTravelModes });
    setMeetingInput("");
  };

  const meetingPlace = itinerary?.meetingPlace as Attraction;

  return (
    <ItineraryMeetingPlaceStyles className="meeting-place-component">
      {loading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={92}
          style={{ marginBottom: 20, borderRadius: 10 }}
        />
      ) : (
        <>
          {meetingPlace?._geoloc && (
            <div className="meeting-place-wrapper">
              <div className="attraction-time">
                <div
                  className={`attraction-id-pin ${
                    selectedAttraction === -1 ? "selected" : ""
                  }`}
                />
                <div
                  className="attraction-id"
                  onClick={() => {
                    setSelectedAttraction(-1);
                    setShowMap(true);
                  }}
                >
                  <div>0</div>
                </div>
              </div>

              <div
                className="meeting-place-photo"
                onClick={() => {
                  setSelectedAttraction(-1);
                  setShowMap(true);
                }}
              >
                <Image
                  alt="meeting-place"
                  width={40}
                  height={40}
                  src="/img/icon-marker2.svg"
                />
              </div>

              <div
                className="meeting-place"
                onClick={() => {
                  setSelectedAttraction(-1);
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
                  {itinerary?.startTime}
                </div>
                <h4 className="meeting-place-title">{t("meetingPlace")}</h4>
                <h4>
                  {meetingPlace?.translatedName && translateName
                    ? (meetingPlace.translatedName as Record<string, string>)[itinerary?.locale || "en"]
                    : meetingPlace.name}{" "}
                  {meetingPlace?.translatedName &&
                    (!translateName ? (
                      <button
                        onClick={() => setTranslateName(true)}
                        className="translate-button"
                      >
                        {t("translate")}
                      </button>
                    ) : (
                      <button
                        onClick={() => setTranslateName(false)}
                        className="translate-button"
                      >
                        {t("showOriginal")}
                      </button>
                    ))}
                </h4>

                <a
                  className="open-with-google"
                  href={`${meetingPlace?.mapUrl}&hl=${language?.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("openWith")}
                </a>
              </div>

              {!itinerary?.status && (
                <button
                  className="meeting-place-delete"
                  onClick={removeMeetingPoint}
                >
                  <Image
                    height={20}
                    width={20}
                    src="/img/icon-delete.svg"
                    alt="close"
                  />
                </button>
              )}
            </div>
          )}

          {!meetingPlace && !itinerary?.status && (
            <div className="stop-wrapper">
              <div className="input-wrapper meeting-wrapper">
                <PlaceAutoComplete
                  t={t}
                  input={meetingInput}
                  setInput={setMeetingInput}
                  inputPlaceholder="meetingPlaceInput"
                  disabled={false}
                  location={itineraryAttractions?.[0] || "tokyo station"}
                  language={language}
                  setPlace={addAttraction}
                />
              </div>
            </div>
          )}
        </>
      )}
    </ItineraryMeetingPlaceStyles>
  );
};

export default React.memo(ItineraryMeetingPlace);
