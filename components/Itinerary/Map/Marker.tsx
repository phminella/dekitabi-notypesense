import React, { useEffect, useRef, useState, useMemo, Suspense } from "react";
import InfoWindow from "./InfoWindow";
import { renderToString } from "react-dom/server";
import { Attraction } from "../../../types/attraction";
import { LanguageOption } from "../../../types/user";

interface MarkerProps {
  index?: number;
  endPlace?: number;
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
  selectedAttraction: number | null;
  setSelectedAttraction: (index: number | null) => void;
  otherWindow: React.MutableRefObject<google.maps.InfoWindow | null>;
  attraction: Attraction;
  language: LanguageOption;
  itineraryDate: string;
  attractions: Attraction[];
  meetingPlace?: boolean | Attraction;
  t: (key: string, options?: any) => string;
  markers?: google.maps.Marker[];
  setMarkers?: (markers: google.maps.Marker[]) => void;
}

const Marker = ({
  index,
  endPlace,
  map,
  position,
  selectedAttraction,
  setSelectedAttraction,
  otherWindow,
  attraction,
  language,
  itineraryDate,
  attractions,
  meetingPlace,
  t,
  markers,
  setMarkers,
}: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

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
    if (!marker) {
      setMarker(
        new google.maps.Marker({
          label: {
            text: String(index || endPlace || 0),
            color: "white",
            fontWeight: "bold",
          },
          icon,
        })
      );
    }
  }, [marker, index, endPlace, icon]);

  useEffect(() => {
    if (marker && map) {
      const isSelected = selectedAttraction === (index ? index - 1 : null);
      marker.setOptions({
        map,
        position,
        label: {
          text: String(index || endPlace || 0),
          color: "white",
          fontWeight: "bold",
        },
        optimized: true,
        icon: isSelected
          ? {
              path: "M53.1,48.1c3.9-5.1,6.3-11.3,6.3-18.2C59.4,13.7,46.2,0.5,30,0.5C13.8,0.5,0.6,13.7,0.6,29.9 c0,6.9,2.5,13.1,6.3,18.2C12.8,55.8,30,77.5,30,77.5S47.2,55.8,53.1,48.1z",
              fillColor: "#003580", // Assuming --darkBlue
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 3,
              scale: 0.6,
              anchor: new google.maps.Point(32, 80),
              labelOrigin: new google.maps.Point(30, 30),
            }
          : icon,
        zIndex: isSelected || endPlace ? 99999 : undefined,
      });
    }
  }, [marker, map, position, selectedAttraction, index, endPlace, icon]);

  useEffect(() => {
    if (marker) {
      google.maps.event.clearListeners(marker, "click");
      
      const infoWindowComponent = (
        <Suspense fallback={"loading..."}>
          <InfoWindow
            attraction={attraction}
            language={language}
            itineraryDate={itineraryDate}
            endPlace={endPlace}
            meetingPlace={meetingPlace}
            index={index}
            t={t}
          />
        </Suspense>
      );
      
      const contentString = renderToString(infoWindowComponent);
      
      const isSelected = selectedAttraction === (index ? index - 1 : null);

      if (isSelected) {
        if (otherWindow.current?.getContent() !== contentString) {
           if (otherWindow.current) otherWindow.current.close();
           const tempInfoWindow = new google.maps.InfoWindow({ content: contentString });
           otherWindow.current = tempInfoWindow;
           
           google.maps.event.addListener(tempInfoWindow, "domready", () => {
             const closeBtn = document.getElementById("close-icon");
             if (closeBtn) {
               closeBtn.onclick = () => {
                 tempInfoWindow.close();
                 otherWindow.current = null;
               };
             }
           });
           
           tempInfoWindow.open({
             map,
             anchor: marker,
             shouldFocus: true,
           });
        }
      } else {
        google.maps.event.addListener(marker, "click", () => {
          setSelectedAttraction(index ? index - 1 : null);
          if (otherWindow.current) otherWindow.current.close();
          
          const tempInfoWindow = new google.maps.InfoWindow({ content: contentString });
          otherWindow.current = tempInfoWindow;
          
          google.maps.event.addListener(tempInfoWindow, "domready", () => {
            const closeBtn = document.getElementById("close-icon");
            if (closeBtn) {
              closeBtn.onclick = () => {
                tempInfoWindow.close();
                otherWindow.current = null;
              };
            }
          });
          
          tempInfoWindow.open({
            map,
            anchor: marker,
            shouldFocus: true,
          });
        });
      }
    }
  }, [selectedAttraction, marker, t, attraction, language, itineraryDate, endPlace, meetingPlace, index, map, otherWindow, setSelectedAttraction]);

  useEffect(() => {
    if (otherWindow.current) {
      otherWindow.current.close();
      otherWindow.current = null;
    }
  }, [attractions, otherWindow]);

  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  return null;
};

export default React.memo(Marker);
