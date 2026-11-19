import { GuidesPerPageStyles } from "./styles/GuidesPerPageStyles";
import GuidesSortBy from "./GuidesSortBy";
import Image from "next/image";
import React from "react";
import ItineraryIncludeTransport from "../../Itinerary/Details/ItineraryIncludeTransport";
const GuidesPerPage = ({
  resultDetails,
  setResultDetails,
  t,
  sortBy,
  setSortBy,
  includeTransport,
  setIncludeTransport,
}) => {
  return (
    <GuidesPerPageStyles className="result-details">
      <p className="found">
        <Image
          height={15}
          width={15}
          alt="itinerary"
          src="/img/icon-signin.svg"
        />
        {t("guidesFound", { guidesFound: resultDetails?.counter })}
      </p>
      {/* {resultDetails.counter > 0 && ( */}
      <div className="details-wrapper">
        <GuidesSortBy t={t} sortBy={sortBy} setSortBy={setSortBy} />
        <ItineraryIncludeTransport
          t={t}
          includeTransport={includeTransport}
          setIncludeTransport={setIncludeTransport}
        />
        <div className="per-page per-page-right">
          {t("perPage")}
          <button
            className={resultDetails?.perPage === 12 ? "active" : ""}
            onClick={() => setResultDetails({ ...resultDetails, perPage: 12 })}
          >
            12
          </button>
          <button
            className={resultDetails?.perPage === 24 ? "active" : ""}
            onClick={() => setResultDetails({ ...resultDetails, perPage: 24 })}
          >
            24
          </button>
          <button
            className={resultDetails?.perPage === 48 ? "active" : ""}
            onClick={() => setResultDetails({ ...resultDetails, perPage: 48 })}
          >
            48
          </button>
        </div>
      </div>
      {/* )} */}
    </GuidesPerPageStyles>
  );
};
export default React.memo(GuidesPerPage);
