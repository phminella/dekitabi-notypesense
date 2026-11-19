import { ToursPerPageStyles } from "./styles/ToursPerPageStyles";
import TourSortBy from "./ToursSortBy";
import Image from "next/image";
import React from "react";
const ToursPerPage = ({
  resultDetails,
  setResultDetails,
  t,
  sortBy,
  setSortBy,
  city,
}) => {
  return (
    <ToursPerPageStyles className="result-details">
      <p className="found">
        <Image
          height={20}
          width={20}
          alt="itineraries"
          src="/img/icon-itinerary2.svg"
        />
        {t("toursFound", { itinerariesFound: resultDetails?.counter })}
      </p>
      {resultDetails?.counter > -1 && (
        <div className="details-wrapper">
          <TourSortBy t={t} sortBy={sortBy} setSortBy={setSortBy} city={city} />
          <div className="per-page">
            {t("perPage")}
            <button
              className={resultDetails?.perPage === 12 ? "active" : ""}
              onClick={() =>
                setResultDetails({ ...resultDetails, perPage: 12 })
              }
            >
              12
            </button>
            <button
              className={resultDetails?.perPage === 24 ? "active" : ""}
              onClick={() =>
                setResultDetails({ ...resultDetails, perPage: 24 })
              }
            >
              24
            </button>
            <button
              className={resultDetails?.perPage === 48 ? "active" : ""}
              onClick={() =>
                setResultDetails({ ...resultDetails, perPage: 48 })
              }
            >
              48
            </button>
          </div>
        </div>
      )}
    </ToursPerPageStyles>
  );
};
export default React.memo(ToursPerPage);
