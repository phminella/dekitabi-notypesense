import { FilterTimeStyles } from "./styles/FilterTimeStyles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
const FilterTime = ({ t, appliedFilters, handleTime }) => {
  const morning = {
    label: t("morningStart"),
    value: "startTime:[360..720]",
    type: "time",
  };
  const afternoon = {
    label: t("afternoonStart"),
    value: "startTime:>=720",
    type: "time",
  };
  return (
    <FilterTimeStyles>
      <div className="filter-title">
        <h3>{t("startTime")}</h3>
      </div>
      <FormGroup className="filter-items">
        <FormControlLabel
          control={
            <Checkbox
              checked={appliedFilters?.some((e) => e?.label === morning?.label)}
              onChange={() => handleTime(morning)}
              sx={{
                color: "var(--pink)",
                "&.Mui-checked": {
                  color: "var(--pink)",
                },
              }}
            />
          }
          label={morning?.label}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={appliedFilters?.some((e) => e?.label === afternoon?.label)}
              onChange={() => handleTime(afternoon)}
              sx={{
                color: "var(--pink)",
                "&.Mui-checked": {
                  color: "var(--pink)",
                },
              }}
            />
          }
          label={afternoon?.label}
        />
      </FormGroup>
    </FilterTimeStyles>
  );
};
export default React.memo(FilterTime);
