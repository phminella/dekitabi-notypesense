import { GuidesFilterStyles } from "./styles/GuidesFilterStyles";
import Image from "next/image";
import { useState, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import BasicModal from "../../../UI/BasicModal";
import FilterQualifications from "./FilterQualifications";
import FilterLanguages from "./FilterLanguages";
import FilterFullDay from "./FilterFullDay";
import FilterHalfDay from "./FilterHalfDay";
import ApplyFilters from "./ApplyFilters";
import AppliedFilters from "./AppliedFilters";
const GuidesFilter = ({
  t,
  setSearchFilters,
  searchFilters,
  guidesLength,
  appliedFilters,
  setAppliedFilters,
}) => {
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const user = useSelector((state) => state.app.user, shallowEqual);
  const [showFilter, setShowFilter] = useState(false);
  const [fullDayRange, setFullDayRange] = useState([
    0,
    currency?.rate ? Math.ceil(99999 * currency?.rate) : 99999,
  ]);
  const [fullDayMin, setFullDayMin] = useState(0);
  const [fullDayMax, setFullDayMax] = useState(99999);
  const [halfDayRange, setHalfDayRange] = useState([
    0,
    currency?.rate ? Math.ceil(99999 * currency?.rate) : 99999,
  ]);
  const [halfDayMin, setHalfDayMin] = useState(0);
  const [halfDayMax, setHalfDayMax] = useState(99999);
  const selectLanguagesRef = useRef();
  const handleQualifications = async (qualification) => {
    if (!appliedFilters?.some((e) => e?.label === qualification?.label)) {
      setAppliedFilters([...appliedFilters, qualification]);
      setSearchFilters({
        ...searchFilters,
        [qualification?.type]: qualification?.value,
      });
    } else {
      const index = appliedFilters?.findIndex(
        (e) => e?.label === qualification?.label
      );
      if (index > -1) {
        let tempAppliedFilters = [...appliedFilters];
        tempAppliedFilters?.splice(index, 1);
        setAppliedFilters(tempAppliedFilters);
        setSearchFilters({
          ...searchFilters,
          [qualification?.type]: "",
        });
      }
    }
  };
  const handleLanguages = async (languages) => {
    if (languages?.length === 0) {
      const index = appliedFilters?.findIndex((e) => e?.type === "languages");
      let tempAppliedFilters = [...appliedFilters];
      tempAppliedFilters?.splice(index, 1);
      setAppliedFilters(tempAppliedFilters);
      setSearchFilters({ ...searchFilters, languages: "" });
    } else if (languages?.type === "languages") {
      setSearchFilters({ ...searchFilters, languages: "" });
      selectLanguagesRef?.current?.clearValue();
    } else {
      let tempLanguages = "";
      await Promise.all(
        languages?.map(async (language, i) => {
          tempLanguages =
            `${tempLanguages}` +
            "`" +
            `${language?.label}` +
            "`" +
            `${languages?.length - 1 > i ? ", " : ""}`;
        })
      );
      const languageFilter = {
        label: `${tempLanguages}`,
        value: `${tempLanguages ? "languages:=[" + tempLanguages + "]" : ""}`,
        type: "languages",
      };
      const index = appliedFilters?.findIndex((e) => e?.type === "languages");
      if (index > -1) {
        let tempAppliedFilters = [...appliedFilters];
        tempAppliedFilters?.splice(index, 1);
        setAppliedFilters([...tempAppliedFilters, languageFilter]);
        setSearchFilters({ ...searchFilters, languages: languageFilter?.value });
      } else {
        setAppliedFilters([...appliedFilters, languageFilter]);
        setSearchFilters({ ...searchFilters, languages: languageFilter?.value });
      }
    }
  };
  const handleFeeFullDay = (e, fullDayRange) => {
    const feeFullDay = {
      label: `${t("fullDay")}: ${currency?.symbol}${fullDayRange[0]} - ${
        currency?.symbol
      }${fullDayRange[1]}`,
      value: `fee.fullDay:[${Math.floor(
        fullDayRange[0] / currency?.rate
      )}..${Math.floor(fullDayRange[1] / currency?.rate)}]`,
      type: "fullDay",
      range: fullDayRange,
    };
    const index = appliedFilters?.findIndex((e) => e?.type === "fullDay");
    if (index > -1) {
      let tempAppliedFilters = [...appliedFilters];
      tempAppliedFilters?.splice(index, 1);
      setAppliedFilters([...tempAppliedFilters, feeFullDay]);
      setSearchFilters({ ...searchFilters, feeFullDay: feeFullDay?.value });
    } else {
      setAppliedFilters([...appliedFilters, feeFullDay]);
      setSearchFilters({ ...searchFilters, feeFullDay: feeFullDay?.value });
    }
  };
  const handleFeeHalfDay = (e, halfDayRange) => {
    const feeHalfDay = {
      label: `${t("halfDay")}: ${currency?.symbol}${halfDayRange[0]} - ${
        currency?.symbol
      }${halfDayRange[1]}`,
      value: `fee.halfDay:[${Math.floor(
        halfDayRange[0] / currency?.rate
      )}..${Math.floor(halfDayRange[1] / currency?.rate)}]`,
      type: "halfDay",
      range: halfDayRange,
    };
    const index = appliedFilters?.findIndex((e) => e?.type === "halfDay");
    if (index > -1) {
      let tempAppliedFilters = [...appliedFilters];
      tempAppliedFilters?.splice(index, 1);
      setAppliedFilters([...tempAppliedFilters, feeHalfDay]);
      setSearchFilters({ ...searchFilters, feeHalfDay: feeHalfDay?.value });
    } else {
      setAppliedFilters([...appliedFilters, feeHalfDay]);
      setSearchFilters({ ...searchFilters, feeHalfDay: feeHalfDay?.value });
    }
  };
  if (!currency?.rate) return <p>...</p>;
  return (
    <GuidesFilterStyles className="guides-filter-styles">
      <button onClick={() => setShowFilter(true)} className="filter-button">
        {appliedFilters?.length > 0 && <div className="badge"></div>}
        <Image
          height={30}
          width={30}
          src="/img/icon-filter.svg"
          alt="filter"
        ></Image>
        {appliedFilters?.length === 0 ? (
          <span className="filter-button-text">{t("filters")}</span>
        ) : (
          <span className="filter-button-text">
            {t("filtersApplied")} <b>{appliedFilters?.length}</b>
          </span>
        )}
      </button>
      <BasicModal showModal={showFilter} setShowModal={setShowFilter}>
        <div className="filters-title">
          <h2>{t("filters")}</h2>
        </div>
        <div className="filters">
          <div className="filter">
            {appliedFilters?.length > 0 && (
              <AppliedFilters
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
                t={t}
                handleQualifications={handleQualifications}
                handleLanguages={handleLanguages}
                handleFeeFullDay={handleFeeFullDay}
                handleFeeHalfDay={handleFeeHalfDay}
                setFullDayRange={setFullDayRange}
                setHalfDayRange={setHalfDayRange}
                currency={currency}
              />
            )}
          </div>
          <div className="filter">
            <FilterQualifications
              t={t}
              appliedFilters={appliedFilters}
              handleQualifications={handleQualifications}
            />
            <FilterLanguages
              t={t}
              appliedFilters={appliedFilters}
              handleLanguages={handleLanguages}
              selectLanguagesRef={selectLanguagesRef}
            />
          </div>
          <div className="filter">
            <FilterFullDay
              t={t}
              handleFeeFullDay={handleFeeFullDay}
              currency={currency}
              fullDayRange={fullDayRange}
              setFullDayRange={setFullDayRange}
              appliedFilters={appliedFilters}
              setFullDayMax={setFullDayMax}
              fullDayMax={fullDayMax}
              setFullDayMin={setFullDayMin}
              fullDayMin={fullDayMin}
              user={user}
            />
          </div>
          <div className="filter">
            <FilterHalfDay
              t={t}
              handleFeeHalfDay={handleFeeHalfDay}
              currency={currency}
              halfDayRange={halfDayRange}
              setHalfDayRange={setHalfDayRange}
              appliedFilters={appliedFilters}
              halfDayMax={halfDayMax}
              halfDayMin={halfDayMin}
              setHalfDayMax={setHalfDayMax}
              setHalfDayMin={setHalfDayMin}
              user={user}
            />
          </div>
        </div>
        <ApplyFilters
          t={t}
          setSearchFilters={setSearchFilters}
          setAppliedFilters={setAppliedFilters}
          handleQualifications={handleQualifications}
          setHalfDayMax={setHalfDayMax}
          setHalfDayMin={setHalfDayMin}
          setFullDayMax={setFullDayMax}
          setFullDayMin={setFullDayMin}
          setFullDayRange={setFullDayRange}
          setHalfDayRange={setHalfDayRange}
          setShowFilter={setShowFilter}
          selectLanguagesRef={selectLanguagesRef}
          guidesLength={guidesLength}
          currency={currency}
        />
      </BasicModal>
    </GuidesFilterStyles>
  );
};
export default GuidesFilter;
