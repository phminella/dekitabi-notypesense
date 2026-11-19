import AppliedFilters from "../../Tours/ToursFilters/AppliedFilters";
import { ApplyFiltersStyles } from "./styles/ApplyFiltersStyles";
const ApplyFilters = ({
  setAppliedFilters,
  setSearchFilters,
  setFullDayRange,
  setFullDayMax,
  setFullDayMin,
  setHalfDayRange,
  setHalfDayMax,
  setHalfDayMin,
  setShowFilter,
  selectLanguagesRef,
  t,
  guidesLength,
  currency,
}) => {
  const clearFilters = () => {
    selectLanguagesRef?.current?.clearValue();
    setAppliedFilters([]);
    setSearchFilters({
      verified: "verified:='true'",
      languages: "",
      feeFullDay: "",
      feeHalfDay: "",
      licensed: "",
      canDrive: "",
    });
    setFullDayRange([0, Math.ceil(99999 * currency?.rate)]);
    setHalfDayRange([0, Math.ceil(99999 * currency?.rate)]);
    setHalfDayMin(0);
    setHalfDayMax(Math.ceil(99999 * currency?.rate));
    setFullDayMin(0);
    setFullDayMax(Math.ceil(99999 * currency?.rate));
  };
  return (
    <ApplyFiltersStyles>
      <button onClick={clearFilters} className="clear-filters">
        {t("clearAll")}
      </button>
      <button onClick={() => setShowFilter(false)} className="normal-button">
        {t("applyFilters")} ({guidesLength})
      </button>
    </ApplyFiltersStyles>
  );
};
export default ApplyFilters;
