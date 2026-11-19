import { ItineraryLoaderStyles } from "./styles/ItineraryLoaderStyles";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect } from "react";
import React from "react";

interface ItineraryLoaderProps {
  loading: boolean;
}

const ItineraryLoader = ({ loading }: ItineraryLoaderProps) => {
  const { t } = useTranslation();
  return (
    <ItineraryLoaderStyles className={loading ? "show" : ""}>
      <div className="loader-text">
        <Image
          src="/img/logo.png"
          height={45}
          width={141}
          alt="logo"
          priority={true}
        />
        <p>{t("buildingItinerary")}...</p>
      </div>
    </ItineraryLoaderStyles>
  );
};
export default React.memo(ItineraryLoader);
