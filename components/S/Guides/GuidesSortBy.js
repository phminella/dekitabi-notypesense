import { GuidesSortByStyles } from "./styles/GuidesSortByStyles";
import React from "react";
const GuidesSortBy = ({ t, sortBy, setSortBy }) => {
  const sortOptions = [
    { value: "ratingCounter:desc", label: t("popularity") },
    { value: "ratingScore:desc", label: t("rating") },
    { value: "fee.halfDay:asc", label: t("feeHalfDayCheap") },
    { value: "fee.halfDay:desc", label: t("feeHalfDayExpensive") },
    { value: "fee.fullDay:asc", label: t("feeFullDayCheap") },
    { value: "fee.fullDay:desc", label: t("feeFullDayExpensive") },
    { value: "maxPeople:desc", label: t("maxPeopleSort") },
    { value: "licensed:desc", label: t("licensed") },
    { value: "canDrive:desc", label: t("canDrive2") },
  ];
  return (
    <GuidesSortByStyles>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        {sortOptions?.map((option, i) => (
          <option value={option?.value} key={i}>
            {option?.label}
          </option>
        ))}
      </select>
    </GuidesSortByStyles>
  );
};
export default React.memo(GuidesSortBy);
