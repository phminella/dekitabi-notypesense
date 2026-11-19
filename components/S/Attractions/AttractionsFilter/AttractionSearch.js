import { AttractionSearchStyles } from "./styles/AttractionSearchStyles";
import React from "react";
const AttractionSearch = ({
  searchInput,
  setSearchInput,
  t,
  city,
  firstAttractionCity,
}) => {
  return (
    <AttractionSearchStyles className="attraction-search-wrapper">
      <input
        name="attraction-search"
        className="attraction-search"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={t("searchAttractionPlaceholder", {
          city: firstAttractionCity ? firstAttractionCity : city,
        })}
      />
    </AttractionSearchStyles>
  );
};
export default React.memo(AttractionSearch);
