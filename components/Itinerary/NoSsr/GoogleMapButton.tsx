import Image from "next/image";
import isPwa from "../../../lib/isPwa";
import React from "react";

interface GoogleMapButtonProps {
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
}

const GoogleMapButton = ({ showMap, setShowMap, setItem, getItem }: GoogleMapButtonProps) => {
  return (
    <button
      className={`show-map ${
        !getItem("firstTimeItinerary") ? "first-time" : ""
      } ${isPwa() ? "pwa" : ""} ${showMap ? "hide" : ""}`}
      onClick={() => {
        setShowMap(!showMap);
        setItem("firstTimeItinerary", true);
      }}
    >
      <Image height={35} width={35} src="/img/icon-marker.svg" alt="map" />
    </button>
  );
};
export default GoogleMapButton;
