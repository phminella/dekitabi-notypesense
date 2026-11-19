import {
  useRef,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from "react";
const Map = ({ map, setMap, center, attraction, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!attraction || map || !ref.current) {
      return;
    }
    const [lat, lng] = attraction?._geoloc || [];
    const fallbackCenter =
      typeof lat === "number" && typeof lng === "number"
        ? { lat, lng }
        : { lat: 35.681236, lng: 139.767125 };
    const initialCenter =
      center && typeof center.lat === "number" && typeof center.lng === "number"
        ? center
        : fallbackCenter;
    setMap(
      new window.google.maps.Map(ref.current, {
        center: initialCenter,
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        mapId: "cebb94696649a19f",
      })
    );
  }, [attraction, center, map, setMap]);

  useEffect(() => {
    const [lat, lng] = attraction?._geoloc || [];
    if (!map || typeof lat !== "number" || typeof lng !== "number") {
      return;
    }
    const point = { lat, lng };
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(point);
    map.panTo(point);
    google.maps.event.addListenerOnce(map, "bounds_changed", function () {
      this.setZoom(map.getZoom() - 1);
      if (this.getZoom() > 15) {
        this.setZoom(15);
      }
    });
    map.fitBounds(bounds);
  }, [map, attraction]);

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
export default Map;
