import React, { useEffect, useState } from "react";
const Marker = (options) => {
  const map = options?.map;
  const position = options?.position;
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions({
        map,
        position,
        optimized: true,
        icon: {
          path: "M53.1,48.1c3.9-5.1,6.3-11.3,6.3-18.2C59.4,13.7,46.2,0.5,30,0.5C13.8,0.5,0.6,13.7,0.6,29.9 c0,6.9,2.5,13.1,6.3,18.2C12.8,55.8,30,77.5,30,77.5S47.2,55.8,53.1,48.1z",
          fillColor: "#fc0165",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 3,
          scale: 0.6,
          anchor: new google.maps.Point(32, 80),
          labelOrigin: new google.maps.Point(30, 30),
          zIndex: 9999,
        },
      });
    }
  }, [
    marker,
    map,
    position,
  ]);

  return null;
};
export default React.memo(Marker);
