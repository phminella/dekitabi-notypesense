import { MapStyles } from "./styles/MapStyles";
import React, {
  useRef,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from "react";
const Map = ({
  map,
  setMap,
  setPolygon,
  center,
  selectedAttraction,
  attractions,
  children,
  otherWindow,
  onClick,
  onIdle,
  searchInput,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (
      center &&
      !map &&
      typeof window !== "undefined" &&
      window.google?.maps
    ) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: center[0], lng: center[1] },
          zoom: 12,
          minZoom: 9,
          maxZoom: 16,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP,
          },
          mapId: "cebb94696649a19f",
        })
      );
    }
  }, [center, map, setMap]);
  useEffect(() => {
    if (
      map &&
      (selectedAttraction || selectedAttraction === 0) &&
      attractions?.length > 0 &&
      attractions[selectedAttraction]?.document?._geoloc[0]
    ) {
      map?.panTo({
        lat: attractions[selectedAttraction]?.document?._geoloc[0],
        lng: attractions[selectedAttraction]?.document?._geoloc[1],
      });
    }
  }, [attractions, map, selectedAttraction]);
  useEffect(() => {
    if (map) {
      const getPolygon = () => {
        const bounds = map.getBounds();
        if (!bounds) return;
        const aNorth = bounds.getNorthEast().lat();
        const aEast = bounds.getNorthEast().lng();
        const aSouth = bounds.getSouthWest().lat();
        const aWest = bounds.getSouthWest().lng();
        let sw = [aSouth, aWest];
        let ne = [aNorth, aEast];
        let nw = [aNorth, aWest];
        let se = [aSouth, aEast];
        setPolygon(
          `${ne[0]}, ${ne[1]}, ${se[0]}, ${se[1]}, ${sw[0]}, ${sw[1]}, ${nw[0]}, ${nw[1]}`
        );
      };
      getPolygon();
      const idleListener = map.addListener("idle", getPolygon);
      return () => {
        if (idleListener) google.maps.event.removeListener(idleListener);
      };
    }
  }, [map, setPolygon]);
  useEffect(() => {
    if (map && searchInput?.length > 0) {
      const nextBounds = new google.maps.LatLngBounds();
      for (let i = 0; i < attractions?.length; i++) {
        nextBounds?.extend({
          lat: attractions[i]?.document?._geoloc[0],
          lng: attractions[i]?.document?._geoloc[1],
        });
      }
      if (attractions?.length === 0) {
        nextBounds?.extend({ lat: center[0], lng: center[1] });
      }
      map?.fitBounds(nextBounds);
    }
  }, [attractions, center, map, searchInput]);
  useEffect(() => {
    if (map) {
      const clickListener = map?.addListener("click", function () {
        if (otherWindow?.current) {
          otherWindow?.current?.close();
          otherWindow.current = null;
        }
      });
      let idleListener;
      if (onIdle) {
        idleListener = map?.addListener("idle", () => onIdle(map));
      }
      return () => {
        if (clickListener) google.maps.event.removeListener(clickListener);
        if (idleListener) google.maps.event.removeListener(idleListener);
      };
    }
  }, [map, onClick, onIdle, otherWindow]);
  useEffect(() => {
    if (map) {
      map?.setCenter({ lat: center[0], lng: center[1] });
    }
  }, [center, map]);
  return (
    <MapStyles className="map">
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </MapStyles>
  );
};
export default React.memo(Map);
