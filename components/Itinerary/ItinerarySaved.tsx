import { ItineraryPublishedStyles } from "./styles/ItineraryPublishedStyles";
import Image from "next/image";
import React from "react";

interface ItinerarySavedProps {
  saved: boolean;
  t: (key: string) => string;
}

const ItinerarySaved = ({ saved, t }: ItinerarySavedProps) => {
  return (
    <ItineraryPublishedStyles
      className={saved ? "show" : ""}
      style={{ textTransform: "capitalize" }}
    >
      <p>
        <Image height={17} width={17} src="/img/icon-save.svg" alt="save" />
        {t("saved")}
      </p>
    </ItineraryPublishedStyles>
  );
};
export default React.memo(ItinerarySaved);
