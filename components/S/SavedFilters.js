import { SavedFiltersStyles } from "./styles/SavedFiltersStyles";
import useLocalStorage from "../../lib/useLocalStorage";
import { useState } from "react";
import moment from "moment";
const SavedFilters = ({
  pastFilters,
  searchingFor,
  searchFilters,
  setSearchFilters,
  setDate,
  setAppliedFilters,
  t,
}) => {
  const [show, setShow] = useState(true);
  const { removeItem } = useLocalStorage();
  const applyFilters = () => {
    if (pastFilters?.appliedFilters) {
      setAppliedFilters(pastFilters?.appliedFilters);
    }
    if (pastFilters?.searchFilters) {
      setSearchFilters({ ...searchFilters, ...pastFilters?.searchFilters });
    }
    if (pastFilters?.date) {
      setDate(moment(pastFilters?.date, "MM-DD-YYYY"));
    }
    setShow(false);
  };
  const removeFilters = () => {
    removeItem(searchingFor + "SearchFilters");
    setShow(false);
  };
  if (!show) return <></>;
  return (
    <SavedFiltersStyles>
      <div className="filters">
        {pastFilters?.date && (
          <p>{moment(pastFilters?.date)?.format("MM/DD/YYYY")}</p>
        )}
        {pastFilters?.appliedFilters && (
          <>
            {pastFilters?.appliedFilters?.map((filter, i) => (
              <p key={i}>{filter?.label}</p>
            ))}
          </>
        )}
      </div>
      <div className="buttons">
        <button className="normal-button" onClick={applyFilters}>
          {t("applyFilters")}
        </button>
        <button className="cancel" onClick={removeFilters}>
          {t("cancel")}
        </button>
      </div>
    </SavedFiltersStyles>
  );
};
export default SavedFilters;
