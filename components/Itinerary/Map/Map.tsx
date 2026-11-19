import React, {
  useRef,
  useEffect,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import useMap from "../../../lib/useMap";
import { Attraction } from "../../../types/attraction";
import { LanguageOption } from "../../../types/user";
import { Itinerary, ItineraryTime, TravelMode } from "../../../types/itinerary";

interface MapProps {
  itineraryAttractions: Attraction[];
  itineraryMeetingPlace?: Attraction | "" | false;
  itineraryEndPlace?: Attraction | "" | false;
  itineraryTravelModes: (string | TravelMode)[];
  itineraryStartTime: string;
  updateItineraryHandler?: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryDurations: number[];
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map) => void;
  otherWindow?: React.MutableRefObject<google.maps.InfoWindow | null>;
  selectedAttraction: number | null;
  setItineraryTime: (time: ItineraryTime) => void;
  itineraryTime: ItineraryTime;
  setLoading: (loading: boolean) => void;
  setMapUrl: (url: string) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  language?: LanguageOption;
  itineraryLunchBreak?: number;
  setError?: (error: string | Error | null) => void;
  itineraryAttractionsList: string[];
}

const Map = ({
  itineraryAttractions,
  itineraryMeetingPlace,
  itineraryEndPlace,
  itineraryTravelModes,
  itineraryStartTime,
  itineraryDurations,
  map,
  setMap,
  otherWindow,
  selectedAttraction,
  setItineraryTime,
  itineraryTime,
  setLoading,
  setMapUrl,
  onIdle,
  children,
  style,
  language,
  itineraryLunchBreak,
  itineraryAttractionsList,
}: MapProps) => {
  const {
    getTransitTimes,
    getItineraryDuration,
    getTotalTransitTime,
    getArrivalDepartureTime,
  } = useMap();

  const ref = useRef<HTMLDivElement>(null);

  const createLatLng = ([lat, lng]: [number, number]) => new google.maps.LatLng(lat, lng);

  const buildMapUrl = useCallback(async () => {
    if (!itineraryAttractions?.length) return setMapUrl("");

    const origin = (itineraryMeetingPlace as Attraction)?._geoloc
      ? createLatLng((itineraryMeetingPlace as Attraction)._geoloc as [number, number])
      : createLatLng(itineraryAttractions[0]._geoloc as [number, number]);

    const destination = (itineraryEndPlace as Attraction)?._geoloc
      ? createLatLng((itineraryEndPlace as Attraction)._geoloc as [number, number])
      : createLatLng(
          itineraryAttractions[itineraryAttractions.length - 1]._geoloc as [number, number]
        );

    let waypointsUrl = "";

    const startIdx = (itineraryMeetingPlace as Attraction)?._geoloc ? 0 : 1;
    const endIdx = (itineraryEndPlace as Attraction)?._geoloc
      ? itineraryAttractions.length
      : itineraryAttractions.length - 1;

    for (let i = startIdx; i < endIdx; i++) {
      const loc = itineraryAttractions[i]?._geoloc as [number, number];
      if (loc) {
        waypointsUrl += `${waypointsUrl ? "|" : ""}${loc[0]},${loc[1]}`;
      }
    }

    setTimeout(() => {
      setMapUrl(
        `https://www.google.com/maps/dir/?api=1&origin=${origin.lat()},${origin.lng()}&destination=${destination.lat()},${destination.lng()}&waypoints=${waypointsUrl}&travelmode=driving&language=${
          language?.code || "en"
        }`
      );
    }, 0);
  }, [
    itineraryAttractions,
    itineraryMeetingPlace,
    itineraryEndPlace,
    language?.code,
    setMapUrl,
  ]);

  // Initialize map
  useEffect(() => {
    if (map || !ref.current) return;
    const center = (itineraryAttractions?.[0]?._geoloc as [number, number]) || [35.7121, 139.7026];
    setMap(
      new google.maps.Map(ref.current, {
        center: { lat: center[0], lng: center[1] },
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        mapId: "cebb94696649a19f",
      })
    );
  }, [map, itineraryAttractions, setMap]);

  // Update map URL when attractions change
  useEffect(() => {
    buildMapUrl();
  }, [buildMapUrl]);

  // Update itinerary timing
  useEffect(() => {
    const handler = setTimeout(() => {
      const dummyRoutes = Array.from(
        { length: itineraryTravelModes?.length || 0 },
        () => ({ routes: [{ legs: [{ duration: { value: 1200 } }] }] })
      );

      const newItineraryTime: ItineraryTime = {
        ...itineraryTime,
        duration: getItineraryDuration(
          itineraryAttractions,
          itineraryDurations
        ),
        transitTime: getTotalTransitTime(itineraryTravelModes, dummyRoutes, -1),
        attractionTransitTime: getTransitTimes(
          itineraryTravelModes,
          dummyRoutes,
          itineraryLunchBreak
        ),
        arrivalDepartureTime: getArrivalDepartureTime(
          itineraryTravelModes,
          itineraryStartTime,
          itineraryAttractions,
          dummyRoutes,
          itineraryMeetingPlace,
          itineraryEndPlace,
          itineraryLunchBreak,
          itineraryDurations
        ),
      };
      setItineraryTime(newItineraryTime);
      if (itineraryAttractionsList?.length === 0) {
        setTimeout(() => setLoading(false), 0);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [
    itineraryMeetingPlace,
    itineraryEndPlace,
    itineraryAttractions,
    itineraryDurations,
    itineraryTravelModes,
    itineraryStartTime,
    itineraryLunchBreak,
  ]);

  // Pan to selected attraction
  useEffect(() => {
    if (!map || selectedAttraction === null) return;

    if (selectedAttraction === -1 && (itineraryMeetingPlace as Attraction)?._geoloc) {
      map.panTo(createLatLng((itineraryMeetingPlace as Attraction)._geoloc as [number, number]));
    } else if (
      selectedAttraction === itineraryAttractions?.length &&
      (itineraryEndPlace as Attraction)?._geoloc
    ) {
      map.panTo(createLatLng((itineraryEndPlace as Attraction)._geoloc as [number, number]));
    } else {
      const geo = itineraryAttractions[selectedAttraction]?._geoloc as [number, number];
      if (geo) map.panTo(createLatLng(geo));
    }
  }, [
    selectedAttraction,
    map,
    itineraryMeetingPlace,
    itineraryAttractions,
    itineraryEndPlace,
  ]);

  // Set map click/idle events
  useEffect(() => {
    if (!map) return;

    ["click", "idle"].forEach((eventName) =>
      google.maps.event.clearListeners(map, eventName)
    );

    map.addListener("click", () => {
      if (otherWindow?.current) {
        otherWindow.current.close();
        otherWindow.current = null;
      }
    });

    if (onIdle) {
      map.addListener("idle", () => onIdle(map));
    }
  }, [map, onIdle, otherWindow]);

  return (
    <>
      <div
        ref={ref}
        style={{
          position: "fixed",
          height: "100dvh",
          width: "100%",
          top: 0,
          left: 0,
          ...style,
        }}
      />
      {Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child as React.ReactElement<{ map: google.maps.Map | null }>, { map }) : null
      )}
    </>
  );
};

export default React.memo(Map);
