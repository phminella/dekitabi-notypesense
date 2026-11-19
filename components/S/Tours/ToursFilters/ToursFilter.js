import { ToursFilterStyles } from "./styles/ToursFilterStyles";
import Image from "next/image";
import React, { useState } from "react";
import BasicModal from "../../../UI/BasicModal";
import FilterTime from "./FilterTime";
import FilterDuration from "./FilterDuration";
import ApplyFilters from "./ApplyFilters";
import AppliedFilters from "./AppliedFilters";
const ToursFilter = ({
  t,
  setSearchFilters,
  searchFilters,
  toursLength,
  tab,
  appliedFilters,
  setAppliedFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const handleTime = (time) => {
    if (!appliedFilters?.some((e) => e?.label === time?.label)) {
      setAppliedFilters([...appliedFilters, time]);
      if (searchFilters?.time === "") {
        setSearchFilters({ ...searchFilters, time: time?.value });
      } else {
        setSearchFilters({ ...searchFilters, time: "startTime:>=360" });
      }
    } else {
      const index = appliedFilters?.findIndex((e) => e?.label === time?.label);
      if (index > -1) {
        let tempAppliedFilters = [...appliedFilters];
        tempAppliedFilters?.splice(index, 1);
        setAppliedFilters(tempAppliedFilters);
        if (searchFilters?.time === "startTime:>=360") {
          setSearchFilters({
            ...searchFilters,
            time:
              time?.value === "startTime:[360..720]"
                ? "startTime:>=720"
                : "startTime:[360..720]",
          });
        } else {
          setSearchFilters({
            ...searchFilters,
            time: "",
          });
        }
      }
    }
  };
  const handleDuration = (duration) => {
    if (!appliedFilters?.some((e) => e?.label === duration?.label)) {
      setAppliedFilters([...appliedFilters, duration]);
      if (searchFilters?.duration === "") {
        setSearchFilters({ ...searchFilters, duration: duration?.value });
      } else {
        setSearchFilters({ ...searchFilters, duration: "duration:>0" });
      }
    } else {
      const index = appliedFilters?.findIndex((e) => e?.label === duration?.label);
      if (index > -1) {
        let tempAppliedFilters = [...appliedFilters];
        tempAppliedFilters?.splice(index, 1);
        setAppliedFilters(tempAppliedFilters);
        if (searchFilters?.duration === "duration:>0") {
          setSearchFilters({
            ...searchFilters,
            duration:
              duration?.value === "duration:[0..240]"
                ? "duration:>=240"
                : "duration:[0..240]",
          });
        } else {
          setSearchFilters({
            ...searchFilters,
            duration: "",
          });
        }
      }
    }
  };
  const handleTravelMode = async (mode) => {
    if (!appliedFilters?.some((e) => e?.label === mode?.label)) {
      setAppliedFilters([...appliedFilters, mode]);
      setSearchFilters({
        ...searchFilters,
        [mode?.type]: mode?.value,
      });
    } else {
      const index = appliedFilters?.findIndex((e) => e?.label === mode?.label);
      if (index > -1) {
        let tempAppliedFilters = [...appliedFilters];
        tempAppliedFilters?.splice(index, 1);
        setAppliedFilters(tempAppliedFilters);
        setSearchFilters({
          ...searchFilters,
          [mode?.type]: "",
        });
      }
    }
  };
  return (
    <ToursFilterStyles>
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
                handleTime={handleTime}
                handleTravelMode={handleTravelMode}
                handleDuration={handleDuration}
              />
            )}
          </div>
          <div className="filter">
            <FilterTime
              t={t}
              appliedFilters={appliedFilters}
              handleTime={handleTime}
            />
          </div>
          <div className="filter">
            <FilterDuration
              t={t}
              appliedFilters={appliedFilters}
              handleDuration={handleDuration}
            />
          </div>
        </div>
        <ApplyFilters
          t={t}
          setSearchFilters={setSearchFilters}
          setAppliedFilters={setAppliedFilters}
          setShowFilter={setShowFilter}
          toursLength={toursLength}
        />
      </BasicModal>
    </ToursFilterStyles>
  );
};
export default React.memo(ToursFilter);
