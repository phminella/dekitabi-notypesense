import { FilterQualificationStyles } from "./styles/FilterQualificationStyles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
const FilterQualifications = ({ t, appliedFilters, handleQualifications }) => {
  const qualifications = [
    {
      label: t("licensed"),
      value: "licensed:='true'",
      type: "licensed",
    },
    {
      label: t("canDrive"),
      value: "canDrive:='true'",
      type: "canDrive",
    },
  ];
  return (
    <FilterQualificationStyles>
      <div className="filter-title">
        <h3>{t("qualifications")}</h3>
      </div>
      <FormGroup className="filter-items filter-qualifications">
        {qualifications?.map((qualification, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={appliedFilters?.some(
                  (e) => e?.label === qualification?.label
                )}
                onChange={() => handleQualifications(qualification)}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={qualification?.label}
          />
        ))}
      </FormGroup>
    </FilterQualificationStyles>
  );
};
export default FilterQualifications;
