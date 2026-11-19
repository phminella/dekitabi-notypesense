import { AppliedFiltersStyles } from "./styles/AppliedFiltersStyles";
import React from "react";
const AppliedFilters = ({
  appliedFilters,
  setAppliedFilters,
  handleTime,
  handleDuration,
  t,
}) => {
  const removeFilter = (filter) => {
    if (filter?.type === "time") {
      handleTime(filter);
    }
    if (filter?.type === "duration") {
      handleDuration(filter);
    }
    let tempAppliedFilters = [...appliedFilters];
    const index = tempAppliedFilters?.indexOf(filter);
    if (index > -1) {
      tempAppliedFilters?.splice(index, 1);
    }
    setAppliedFilters(tempAppliedFilters);
  };
  return (
    <AppliedFiltersStyles>
      <h3>{t("appliedFilters")}</h3>
      <div className="applied-filters">
        {appliedFilters?.map((filter, i) => (
          <button onClick={() => removeFilter(filter)} key={i}>
            {filter?.label} <div className="remove-filter-icon">x</div>
          </button>
        ))}
      </div>
    </AppliedFiltersStyles>
  );
};
export default React.memo(AppliedFilters);
