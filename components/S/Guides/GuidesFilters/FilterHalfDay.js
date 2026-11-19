import { FilterFullDayStyles } from "./styles/FilterFullDayStyles";
import Slider from "@mui/material/Slider";
import SelectCurrency from "../../../Header/SelectCurrency";
import React, { useState, useEffect } from "react";
const FilterHalfDay = ({
  t,
  handleFeeHalfDay,
  currency,
  halfDayRange,
  setHalfDayRange,
  appliedFilters,
  halfDayMax,
  halfDayMin,
  setHalfDayMax,
  user,
  setHalfDayMin,
}) => {
  const [sliderConfig, setSliderConfig] = useState({ max: 99999, step: 1000 });
  const handleChange = (e, newValue) => {
    setHalfDayMin(newValue[0]);
    setHalfDayMax(newValue[1]);
    setHalfDayRange(newValue);
  };
  useEffect(() => {
    if (currency?.rate) {
      if (
        currency?.code === "JPY" ||
        currency?.code === "KRW" ||
        currency?.code === "PHP" ||
        currency?.code === "INR"
      ) {
        setSliderConfig({ max: Math.ceil(99999 * currency?.rate), step: 1000 });
      }
      if (currency?.code === "IDR" || currency?.code === "VND") {
        setSliderConfig({
          max: Math.ceil(99999 * currency?.rate),
          step: 100000,
        });
      }
      if (currency?.code === "NOK") {
        setSliderConfig({ max: Math.ceil(99999 * currency?.rate), step: 100 });
      }
      if (
        currency?.code === "USD" ||
        currency?.code === "EUR" ||
        currency?.code === "CNY" ||
        currency?.code === "HKD" ||
        currency?.code === "MYR" ||
        currency?.code === "SGD" ||
        currency?.code === "NOK" ||
        currency?.code === "CAD" ||
        currency?.code === "GBP" ||
        currency?.code === "BRL" ||
        currency?.code === "AUD" ||
        currency?.code === "DKK" ||
        currency?.code === "AED" ||
        currency?.code === "MXN" ||
        currency?.code === "NZD" ||
        currency?.code === "SAR" ||
        currency?.code === "SEK" ||
        currency?.code === "CHF" ||
        currency?.code === "TRY"
      ) {
        setSliderConfig({ max: Math.ceil(99999 * currency?.rate), step: 10 });
      }
      setHalfDayRange([0, Math.ceil(99999 * currency?.rate)]);
      setHalfDayMin(0);
      setHalfDayMax(Math.ceil(99999 * currency?.rate));
      if (appliedFilters?.findIndex((e) => e?.type === "halfDay") !== -1) {
        handleFeeHalfDay(undefined, [0, Math.ceil(99999 * currency?.rate)]);
      }
    }
  }, [
    appliedFilters,
    currency,
    handleFeeHalfDay,
    setHalfDayMax,
    setHalfDayMin,
    setHalfDayRange,
  ]);
  if (!currency?.rate) return <p>...</p>;
  return (
    <FilterFullDayStyles>
      <div className="filter-title">
        <h3>{t("guideFeeTimeInfo2")}*</h3>
        <p className="sub-title">*{t("guideFeeTimeInfo1")}</p>
      </div>
      <div className="filter-items">
        <div className="filter-price-input">
          <label htmlFor="minPrice">
            {t("minPrice")}
            <div className="input-wrapper">
              <span>{currency?.code}</span>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                value={halfDayMin}
                onChange={(e) => {
                  if (
                    e.target.value?.length <=
                      Math.ceil(99999 * currency?.rate)?.toString()?.length ||
                    !e.target.value
                  ) {
                    const minPrice = parseInt(e.target.value);
                    setHalfDayMin(!minPrice ? "" : minPrice);
                    if (e.target.value) {
                      setHalfDayRange([minPrice, halfDayRange[1]]);
                      const timeOutId = setTimeout(
                        () =>
                          handleFeeHalfDay(undefined, [
                            minPrice,
                            halfDayRange[1],
                          ]),
                        700
                      );
                      return () => clearTimeout(timeOutId);
                    }
                  }
                }}
                minLength={4}
                maxLength={6}
                required
              />
            </div>
          </label>
          <label htmlFor="maxPrice">
            {t("maxPrice")}
            <div className="input-wrapper">
              <span>{currency?.code}</span>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={halfDayMax}
                onChange={(e) => {
                  if (
                    e.target.value?.length <=
                      Math.ceil(99999 * currency?.rate)?.toString()?.length ||
                    !e.target.value
                  ) {
                    const maxPrice = parseInt(e.target.value);
                    setHalfDayMax(!maxPrice ? "" : maxPrice);
                    if (e.target.value) {
                      setHalfDayRange([halfDayRange[0], maxPrice]);
                      const timeOutId = setTimeout(
                        () =>
                          handleFeeHalfDay(undefined, [
                            halfDayRange[0],
                            maxPrice,
                          ]),
                        700
                      );
                      return () => clearTimeout(timeOutId);
                    } else {
                      setHalfDayRange([
                        halfDayRange[0],
                        Math.ceil(99999 * currency?.rate),
                      ]);
                      const timeOutId = setTimeout(
                        () =>
                          handleFeeHalfDay(undefined, [
                            halfDayRange[0],
                            Math.ceil(99999 * currency?.rate),
                          ]),
                        700
                      );
                      return () => clearTimeout(timeOutId);
                    }
                  }
                }}
                minLength={4}
                maxLength={6}
                required
              />
            </div>
          </label>
        </div>
        <div className="slider">
          <Slider
            defaultValue={Math.ceil(99999 * currency?.rate)}
            value={halfDayRange}
            onChangeCommitted={handleFeeHalfDay}
            onChange={handleChange}
            step={sliderConfig?.step}
            marks
            max={sliderConfig?.max}
            min={0}
            getAriaLabel={() => "Half-day fee filter"}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      {user?.guide !== "true" && (
        <div className="price-currency">
          {t("displayedIn")} <SelectCurrency t={t} />
        </div>
      )}
    </FilterFullDayStyles>
  );
};
export default React.memo(FilterHalfDay);
