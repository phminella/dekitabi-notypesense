import { ToursResultsDetailsStyles } from "./styles/ToursResultsDetailsStyles";
import ToursPerPage from "./ToursPerPage";
import React from "react";
const ToursResultsDetails = ({
  t,
  sortBy,
  setSortBy,
  resultDetails,
  setResultDetails,
  city,
}) => {
  return (
    <ToursResultsDetailsStyles id="results-details">
      <ToursPerPage
        resultDetails={resultDetails}
        setResultDetails={setResultDetails}
        t={t}
        sortBy={sortBy}
        setSortBy={setSortBy}
        city={city}
      />
    </ToursResultsDetailsStyles>
  );
};
export default React.memo(ToursResultsDetails);
