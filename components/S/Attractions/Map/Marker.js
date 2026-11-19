import { Suspense, useEffect, useMemo, useRef } from "react";
import InfoWindow from "../../../Itinerary/Map/InfoWindow";
import { renderToString } from "react-dom/server";
const Marker = (options) => {
  const {
    attractions,
    attraction,
    index,
    language,
    map,
    marker,
    otherWindow,
    position,
    selectedAttraction,
    setAttractionToAdd,
    setSelectedAttraction,
    setShowItinerary,
    t,
  } = options;
  const infoWindowRef = useRef();
  const icon = useMemo(
    () => ({
      path: "M53.1,48.1c3.9-5.1,6.3-11.3,6.3-18.2C59.4,13.7,46.2,0.5,30,0.5C13.8,0.5,0.6,13.7,0.6,29.9 c0,6.9,2.5,13.1,6.3,18.2C12.8,55.8,30,77.5,30,77.5S47.2,55.8,53.1,48.1z",
      fillColor: "#fc0165",
      fillOpacity: 1,
      strokeColor: "white",
      strokeWeight: 3,
      scale: 0.45,
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    }),
    []
  );
  useEffect(() => {
    if (marker) {
      marker?.setOptions({
        map,
        position,
        optimized: true,
        icon:
          selectedAttraction === index - 1
            ? {
                path: "M53.1,48.1c3.9-5.1,6.3-11.3,6.3-18.2C59.4,13.7,46.2,0.5,30,0.5C13.8,0.5,0.6,13.7,0.6,29.9 c0,6.9,2.5,13.1,6.3,18.2C12.8,55.8,30,77.5,30,77.5S47.2,55.8,53.1,48.1z",
                fillColor: "var(--darkBlue)",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 3,
                scale: 0.6,
                anchor: new google.maps.Point(32, 80),
                labelOrigin: new google.maps.Point(30, 30),
              }
            : icon,
        zIndex: selectedAttraction === index - 1 ? 99999 : null,
      });
      google.maps.event.clearListeners(marker, "click");
      //
      // Info Window
      //
      const infoWindowComponent = (
        <Suspense fallback={"loading"}>
          <InfoWindow
            attraction={attraction}
            language={language}
            t={t}
          />
        </Suspense>
      );
      const contentString = renderToString(infoWindowComponent);
      if (infoWindowRef?.current) {
        infoWindowRef?.current?.setContent(contentString);
      }
      if (selectedAttraction === index - 1) {
        if (
          !infoWindowRef.current ||
          infoWindowRef?.current !== otherWindow?.current
        ) {
          const tempInfoWindow = new google.maps.InfoWindow({
            content: contentString,
          });
          infoWindowRef.current = tempInfoWindow;
          const closeWindow = () => {
            infoWindowRef?.current?.close();
            infoWindowRef.current = null;
          };
          const showItinerary = () => {
            setShowItinerary(true);
            setAttractionToAdd(attraction);
          };
          google.maps.event.addListener(
            infoWindowRef.current,
            "domready",
            function () {
              const closeIcon = document.getElementById("close-icon");
              const addButton = document.getElementById(
                "add-to-itinerary-button"
              );
              if (closeIcon) closeIcon.onclick = closeWindow;
              if (addButton) addButton.onclick = showItinerary;
            }
          );
          if (otherWindow?.current) {
            otherWindow?.current?.close();
          }
          if (otherWindow?.content !== infoWindowRef?.current?.content) {
            otherWindow.current = tempInfoWindow;
          }
          otherWindow.current.opened = true;
          otherWindow?.current?.open({
            map,
            anchor: marker,
            shouldFocus: true,
          });
        }
      }
      const markerClickListener = google.maps.event.addListener(
        marker,
        "click",
        function () {
          setSelectedAttraction(index - 1);

          if (otherWindow?.current) {
            otherWindow?.current?.close();
          }
          const tempInfoWindow = new google.maps.InfoWindow({
            content: contentString,
          });
          otherWindow.current = tempInfoWindow;
          const closeWindow = () => {
            otherWindow?.current?.close();
            otherWindow.current = null;
          };
          const showItinerary = () => {
            setShowItinerary(true);
            setAttractionToAdd(attraction);
          };
          google.maps.event.addListener(otherWindow?.current, "domready", () => {
            const closeIcon = document.getElementById("close-icon");
            const addButton = document.getElementById(
              "add-to-itinerary-button"
            );
            if (closeIcon) closeIcon.onclick = closeWindow;
            if (addButton) addButton.onclick = showItinerary;
          });
          otherWindow.current.opened = true;
          otherWindow?.current?.open({
            map,
            anchor: marker,
            shouldFocus: true,
          });
        }
      );
      return () => {
        if (markerClickListener) {
          google.maps.event.removeListener(markerClickListener);
        }
      };
    }
  }, [
    attraction,
    icon,
    index,
    language,
    map,
    marker,
    otherWindow,
    position,
    position?.lat,
    position?.lng,
    selectedAttraction,
    setAttractionToAdd,
    setSelectedAttraction,
    setShowItinerary,
    t,
  ]);

  useEffect(() => {
    if (infoWindowRef.current && otherWindow?.current) {
      otherWindow?.current?.close();
      otherWindow.current = null;
    }
  }, [attractions, otherWindow]);
  return null;
};
export default Marker;
