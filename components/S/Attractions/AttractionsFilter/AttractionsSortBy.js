import { AttractionsSortByStyles } from "./styles/AttractionsSortByStyles";
import React from "react";
const AttractionsSortBy = ({ t, sortBy, setSortBy, city }) => {
  const sortOptions = [
    { value: "ratingCounter:desc", label: t("popularity") },
    { value: "rating:desc", label: t("rating") },
    {
      value: `_geoloc(${city?._geoloc?.[0] ?? 35.6813}, ${
        city?._geoloc?.[1] ?? 139.7671
      }):asc`,
      label: t("location"),
    },
    { value: "duration:asc", label: t("durationAsc") },
    { value: "duration:desc", label: t("durationDesc") },
  ];
  return (
    <AttractionsSortByStyles>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        {sortOptions?.map((option, i) => (
          <option value={option?.value} key={i}>
            {option?.label}
          </option>
        ))}
      </select>
    </AttractionsSortByStyles>
  );
};
export default React.memo(AttractionsSortBy);
