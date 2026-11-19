import { ItineraryGuidesSortStyles } from "./styles/ItineraryGuidesSortStyles";
import Select from "react-select";
import React from "react";

interface ItineraryGuidesSortProps {
  t: (key: string) => string;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const ItineraryGuidesSort = ({ t, setSortBy }: ItineraryGuidesSortProps) => {
  const sortOptions = [    
    { value: "ratingCounter:desc", label: t("popularity") },
    { value: "ratingScore:desc", label: t("rating") },
    { value: "maxPeople:desc", label: t("maxPeopleSort") },
    { value: "fee.halfDay:asc", label: t("feeHalfDayCheap") },
    { value: "fee.halfDay:desc", label: t("feeHalfDayExpensive") },
    { value: "fee.fullDay:asc", label: t("feeFullDayCheap") },
    { value: "fee.fullDay:desc", label: t("feeFullDayExpensive") },
    { value: "licensed:desc", label: t("licensed") },
    { value: "canDrive:desc", label: t("canDrive2") },
  ];
  
  const handleSortBy = (data: any) => {
    if (data?.value) {
      setSortBy(data.value);
    }
  };

  return (
    <ItineraryGuidesSortStyles>
      <Select
        id="sortBy"
        instanceId="sortBy"
        name="sortBy"
        onChange={handleSortBy}
        options={sortOptions}
        isSearchable={false}
        placeholder={t("sortBy")}
      />
    </ItineraryGuidesSortStyles>
  );
};
export default React.memo(ItineraryGuidesSort);
