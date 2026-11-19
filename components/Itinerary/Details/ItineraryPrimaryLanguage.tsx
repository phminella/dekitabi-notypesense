import { ItineraryPrimaryLanguageStyles } from "./styles/ItineraryPrimaryLanguageStyles";
import React from "react";
import Image from "next/image";

import { Itinerary } from "../../../types/itinerary";

interface ItineraryPrimaryLanguageProps {
  t: (key: string) => string;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryGuideLanguages: string[];
  itineraryPrimaryLanguage?: string;
  itineraryStatus: boolean;
}

const ItineraryPrimaryLanguage = ({
  t,
  updateItineraryHandler,
  itineraryGuideLanguages,
  itineraryPrimaryLanguage,
  itineraryStatus,
}: ItineraryPrimaryLanguageProps) => {
  return (
    <ItineraryPrimaryLanguageStyles className="primary-language">
      <Image
        height={itineraryStatus ? 15 : 20}
        width={itineraryStatus ? 15 : 20}
        src="/img/icon-language.svg"
        alt="login"
      />
      {!itineraryStatus ? (
        <select
          id="itinerary-language"
          value={itineraryPrimaryLanguage || ""}
          onChange={(e) => {
            updateItineraryHandler({
              primaryLanguage: e.target.value,
            });
          }}
          className={!itineraryPrimaryLanguage ? "error" : ""}
        >
          {!itineraryPrimaryLanguage && (
            <option value="">{t("selectTourLanguage")}</option>
          )}
          {itineraryGuideLanguages?.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <p className="primary-language-text">{itineraryPrimaryLanguage}</p>
      )}
    </ItineraryPrimaryLanguageStyles>
  );
};
export default React.memo(ItineraryPrimaryLanguage);
