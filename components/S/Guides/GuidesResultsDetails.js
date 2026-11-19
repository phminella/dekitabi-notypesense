import { GuidesResultsDetailsStyles } from "./styles/GuidesResultsDetailsStyles";
import GuidesPerPage from "./GuidesPerPage";
import React from "react";
const GuidesResultsDetails = ({
  t,
  sortBy,
  setSortBy,
  resultDetails,
  setResultDetails,
  includeTransport,
  setIncludeTransport,
}) => {
  return (
    <GuidesResultsDetailsStyles name="results-details" id="results-details">
      <GuidesPerPage
        resultDetails={resultDetails}
        setResultDetails={setResultDetails}
        t={t}
        sortBy={sortBy}
        setSortBy={setSortBy}
        includeTransport={includeTransport}
        setIncludeTransport={setIncludeTransport}
      />
    </GuidesResultsDetailsStyles>
  );
};
export default React.memo(GuidesResultsDetails);
