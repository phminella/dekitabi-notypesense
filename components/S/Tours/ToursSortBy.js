import { ToursSortByStyles } from "./styles/ToursSortByStyles";
import React from "react";
const ToursSortBy = ({ t, sortBy, setSortBy, city }) => {
  const sortOptions = [
    { value: "ratingCounter:desc", label: t("popularity") },
    { value: "ratingScore:desc", label: t("rating") },
    { value: "duration:asc", label: t("durationAsc") },
    { value: "duration:desc", label: t("durationDesc") },
    {
      value: `_geoloc(${city?._geoloc[0]}, ${city?._geoloc[1]}):asc`,
      label: t("location"),
    },
  ];
  return (
    <ToursSortByStyles>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">{t("sortBy")}</option>
        {sortOptions?.map((option, i) => (
          <option value={option?.value} key={i}>
            {option?.label}
          </option>
        ))}
      </select>
    </ToursSortByStyles>
  );
};
export default React.memo(ToursSortBy);
