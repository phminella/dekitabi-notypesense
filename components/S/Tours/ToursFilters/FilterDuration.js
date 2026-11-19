import { FilterDurationStyles } from "./styles/FilterDurationStyles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
const FilterDuration = ({ t, appliedFilters, handleDuration }) => {
  const durations = [
    {
      label: t("0to4Hours"),
      value: "duration:[0..240]",
      type: "duration",
    },
    {
      label: t("4to8Hours"),
      value: "duration:>240",
      type: "duration",
    },
  ];
  return (
    <FilterDurationStyles>
      <div className="filter-title">
        <h3>{t("duration")}</h3>
      </div>
      <FormGroup className="filter-items">
        {durations?.map((duration, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={appliedFilters?.some((e) => e?.label === duration?.label)}
                onChange={() => handleDuration(duration)}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={duration?.label}
          />
        ))}
      </FormGroup>
    </FilterDurationStyles>
  );
};
export default React.memo(FilterDuration);
