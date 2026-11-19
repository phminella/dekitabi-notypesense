import { ApplyFiltersStyles } from "./styles/ApplyFiltersStyles";
import React from "react";
const ApplyFilters = ({
  setAppliedFilters,
  setSearchFilters,
  setShowFilter,
  t,
  toursLength,
}) => {
  const clearFilters = () => {
    setAppliedFilters([]);
    setSearchFilters({
      time: "",
      duration: "",
    });
  };
  return (
    <ApplyFiltersStyles>
      <button onClick={clearFilters} className="clear-filters">
        {t("clearAll")}
      </button>
      <button onClick={() => setShowFilter(false)} className="normal-button">
        {t("applyFilters")} ({toursLength})
      </button>
    </ApplyFiltersStyles>
  );
};
export default React.memo(ApplyFilters);
