import { SuggestedAttractionStyles } from "./styles/SuggestedAttractionStyles";
import Link from "next/link";
import AttractionImage from "../../S/Attractions/AttractionImage";
import isMobile from "../../../lib/isMobile";
import React from "react";
const SuggestedAttraction = ({ attraction, language }) => {
  return (
    <SuggestedAttractionStyles>
      <Link
        prefetch={false}
        href={`/attraction/${attraction?.url}`}
        target={isMobile() ? "_self" : "_blank"}
      >
        <div className="attraction-image">
          <AttractionImage
            attraction={attraction?.url}
            size={300}
            sizes={"200px"}
          />
        </div>
        {attraction?.translatedName
          ? attraction?.translatedName[language?.code]
          : attraction?.name}
        <span>
          @
          {attraction?.translatedState
            ? attraction?.translatedState[language?.code]?.split(" ")[0]
            : attraction?.state}
        </span>
      </Link>
    </SuggestedAttractionStyles>
  );
};
export default React.memo(SuggestedAttraction);
