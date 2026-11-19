import { ItineraryNoGuidesStyles } from "./styles/ItineraryNoGuidesStyles";
import React from "react";
import { LanguageOption } from "../../../types/user";

interface ItineraryNoGuidesProps {
  t: (key: string, options?: any) => string;
  prefecture?: string;
  translatedPrefecture?: any;
  language?: LanguageOption;
}

const ItineraryNoGuides = ({
  t,
}: ItineraryNoGuidesProps) => {
  return (
    <ItineraryNoGuidesStyles>
      <div className="no-guides">
        <div className="first-message">
          <p>{t("noGuidesError")}</p>
          <p className="subtitle">{t("noGuidesSuggestion")}</p>
        </div>
        <div className="no-guides-wrapper">
          <div className="contact-us">
            <p>{t("noGuidesSuggestion4")}</p>
            <a href="mailto:contact@dekitabi.com">contact@dekitabi.com</a>
          </div>
        </div>
      </div>
    </ItineraryNoGuidesStyles>
  );
};
export default ItineraryNoGuides;
