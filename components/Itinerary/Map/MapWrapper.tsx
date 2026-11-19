import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from "./Marker";
import Map from "./Map";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MapStyles } from "./styles/MapStyles";
import LazySkeleton from "../../UI/LazySkeleton";
import ComponentOffline from "../../UI/ComponentOffline";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setMapLanguage } from "../../../store/appSlice";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { RootState } from "../../../store/store";
import { Itinerary, ItineraryTime, TravelMode } from "../../../types/itinerary";

interface MapWrapperProps {
  itineraryDurations: number[];
  itineraryAttractions: Attraction[];
  itineraryMeetingPlace?: Attraction | "" | false;
  itineraryEndPlace?: Attraction | "" | false;
  itineraryTravelModes: (string | TravelMode)[];
  itineraryStartTime: string;
  setSelectedAttraction: (index: number | null) => void;
  itineraryDate: string;
  selectedAttraction: number | null;
  setLoading: (loading: boolean) => void;
  setItineraryTime: (time: ItineraryTime) => void;
  itineraryTime: ItineraryTime;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryLunchBreak?: number;
  t: (key: string, options?: any) => string;
  language: LanguageOption;
  setError: (error: string | Error | null) => void;
  itineraryAttractionsList: string[];
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map) => void;
}

const MapWrapper = ({
  itineraryDurations,
  itineraryAttractions,
  itineraryMeetingPlace,
  itineraryEndPlace,
  itineraryTravelModes,
  itineraryStartTime,
  setSelectedAttraction,
  itineraryDate,
  selectedAttraction,
  setLoading,
  setItineraryTime,
  itineraryTime,
  showMap,
  setShowMap,
  updateItineraryHandler,
  itineraryLunchBreak,
  t,
  language,
  setError,
  itineraryAttractionsList,
  map,
  setMap,
}: MapWrapperProps) => {
  const router = useRouter();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const otherWindow = useRef<google.maps.InfoWindow | null>(null);
  const [mapUrl, setMapUrl] = useState<string>("");
  const dispatch = useDispatch();
  const mapLanguage = useSelector((state: RootState) => state.app.mapLanguage);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const setBounds = useCallback(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    if ((itineraryMeetingPlace as Attraction)?._geoloc) {
      bounds.extend(new google.maps.LatLng((itineraryMeetingPlace as Attraction)._geoloc[0], (itineraryMeetingPlace as Attraction)._geoloc[1]));
    }
    if ((itineraryEndPlace as Attraction)?._geoloc) {
      bounds.extend(new google.maps.LatLng((itineraryEndPlace as Attraction)._geoloc[0], (itineraryEndPlace as Attraction)._geoloc[1]));
    }
    itineraryAttractions.forEach((attraction) => {
      if (attraction._geoloc) {
        bounds.extend(new google.maps.LatLng(attraction._geoloc[0], attraction._geoloc[1]));
      }
    });
    map.fitBounds(bounds);
  }, [itineraryAttractions, itineraryMeetingPlace, itineraryEndPlace, map]);

  useEffect(() => {
    if (itineraryAttractions?.length > 0 && map) {
      setBounds();
    }
  }, [itineraryAttractions, itineraryMeetingPlace, itineraryEndPlace, map, setBounds]);

  useEffect(() => {
    if (!mapLanguage && router?.locale) {
      dispatch(setMapLanguage(router.locale));
    }
  }, [dispatch, mapLanguage, router?.locale]);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <LazySkeleton minHeight={"100vh"} width={"100%"} height={"100%"} />;
      case Status.FAILURE: {
        setLoading(false);
        return <ComponentOffline />;
      }
      case Status.SUCCESS:
        return (
          <Map
            selectedAttraction={selectedAttraction}
            map={map}
            setMap={setMap}
            setItineraryTime={setItineraryTime}
            itineraryTime={itineraryTime}
            setMapUrl={setMapUrl}
            setLoading={setLoading}
            updateItineraryHandler={updateItineraryHandler}
            itineraryAttractions={itineraryAttractions}
            itineraryMeetingPlace={itineraryMeetingPlace}
            itineraryEndPlace={itineraryEndPlace}
            itineraryTravelModes={itineraryTravelModes}
            itineraryStartTime={itineraryStartTime}
            language={language}
            otherWindow={otherWindow}
            itineraryLunchBreak={itineraryLunchBreak}
            itineraryAttractionsList={itineraryAttractionsList}
            itineraryDurations={itineraryDurations}
            style={{ width: "100%", height: "100dvh", minHeight: "100dvh" }}
          >
            <button className="show-map" onClick={() => setShowMap(!showMap)}>
              <Image
                height={35}
                width={35}
                src="/img/icon-close.svg"
                alt="close"
              />
            </button>
            {mapUrl && itineraryAttractionsList?.length > 1 && (
              <a
                className="open-map"
                href={`${mapUrl}&hl=${language?.code || "en"}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  height={35}
                  width={35}
                  src="/img/icon-map2.svg"
                  alt="map"
                />{" "}
                <div>
                  <span>{t("openWith")}</span>
                </div>
              </a>
            )}
            {(itineraryMeetingPlace as Attraction)?._geoloc && (
              <Marker
                position={{
                  lat: (itineraryMeetingPlace as Attraction)._geoloc![0],
                  lng: (itineraryMeetingPlace as Attraction)._geoloc![1],
                }}
                map={map}
                setSelectedAttraction={setSelectedAttraction}
                selectedAttraction={selectedAttraction}
                otherWindow={otherWindow}
                attraction={itineraryMeetingPlace as Attraction}
                language={language}
                itineraryDate={itineraryDate}
                index={0}
                attractions={itineraryAttractions}
                meetingPlace={true}
                markers={markers}
                setMarkers={setMarkers}
                t={t}
              />
            )}
            {(itineraryEndPlace as Attraction)?._geoloc && (
              <Marker
                position={{
                  lat: (itineraryEndPlace as Attraction)._geoloc![0],
                  lng: (itineraryEndPlace as Attraction)._geoloc![1],
                }}
                map={map}
                setSelectedAttraction={setSelectedAttraction}
                selectedAttraction={selectedAttraction}
                otherWindow={otherWindow}
                attraction={itineraryEndPlace as Attraction}
                language={language}
                itineraryDate={itineraryDate}
                endPlace={itineraryAttractionsList.length + 1}
                index={itineraryAttractionsList.length + 1}
                attractions={itineraryAttractions}
                markers={markers}
                setMarkers={setMarkers}
                t={t}
              />
            )}
            {itineraryAttractions.map((attraction, i) => {
              if (attraction.name !== "lunchbreak" && attraction._geoloc) {
                return (
                  <Marker
                    key={attraction.id || i}
                    position={{
                      lat: attraction._geoloc[0],
                      lng: attraction._geoloc[1],
                    }}
                    index={i + 1}
                    setSelectedAttraction={setSelectedAttraction}
                    selectedAttraction={selectedAttraction}
                    map={map}
                    otherWindow={otherWindow}
                    attraction={attraction}
                    language={language}
                    itineraryDate={itineraryDate}
                    attractions={itineraryAttractions}
                    meetingPlace={itineraryMeetingPlace as Attraction}
                    markers={markers}
                    setMarkers={setMarkers}
                    t={t}
                  />
                );
              }
              return null;
            })}
          </Map>
        );
      default:
        return <></>;
    }
  };

  if (!googleMapsApiKey) {
    return (
      <MapStyles className={`map-wrapper ${!showMap ? "hide" : ""}`}>
        <div className={`map`}>
          <ComponentOffline />
        </div>
      </MapStyles>
    );
  }

  return (
    <MapStyles className={`map-wrapper ${!showMap ? "hide" : ""}`}>
      <div className={`map`}>
        <Wrapper
          apiKey={googleMapsApiKey}
          language={mapLanguage || router?.locale || "en"}
          render={render}
        />
      </div>
    </MapStyles>
  );
};
export default React.memo(MapWrapper);
