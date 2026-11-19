import { AppliedFiltersStyles } from "./styles/AppliedFiltersStyles";
const AppliedFilters = ({
  appliedFilters,
  setAppliedFilters,
  handleLanguages,
  handleFeeFullDay,
  handleQualifications,
  setFullDayRange,
  handleFeeHalfDay,
  setHalfDayRange,
  t,
  currency,
}) => {
  const removeFilter = (filter) => {
    if (
      filter?.type === "verified" ||
      filter?.type === "licensed" ||
      filter?.type === "canDrive"
    ) {
      handleQualifications(filter);
    }
    if (filter?.type === "languages") {
      handleLanguages(filter);
    }
    if (filter?.type === "fullDay") {
      handleFeeFullDay(undefined, [0, Math.ceil(99999 * currency?.rate)]);
      setFullDayRange([0, Math.ceil(99999 * currency?.rate)]);
    }
    if (filter?.type === "halfDay") {
      handleFeeHalfDay(undefined, [0, Math.ceil(99999 * currency?.rate)]);
      setHalfDayRange([0, Math.ceil(99999 * currency?.rate)]);
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
      <div className="applied-filters">
        {appliedFilters?.map((filter, i) => (
          <button onClick={() => removeFilter(filter)} key={i}>
            {filter?.label?.split("`")?.join("")}
            <div className="remove-filter-icon">x</div>
          </button>
        ))}
      </div>
    </AppliedFiltersStyles>
  );
};
export default AppliedFilters;
