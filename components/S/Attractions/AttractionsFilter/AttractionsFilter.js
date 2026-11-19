import { AttractionsFilterStyles } from "./styles/AttractionsFilterStyles";
import AttractionFilterTags from "./AttractionFilterTags";
import AttractionSearch from "./AttractionSearch";
import React from "react";
const AttractionsFilter = ({
  setSearchInput,
  searchInput,
  tags,
  setTags,
  topRef,
  t,
  tab,
  city,
  firstAttractionCity,
}) => {
  return (
    <AttractionsFilterStyles id="attractions-filter">
      <AttractionSearch
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        t={t}
        tab={tab}
        city={city}
        firstAttractionCity={firstAttractionCity}
      />
      <AttractionFilterTags
        tags={tags}
        setTags={setTags}
        t={t}
        topRef={topRef}
      />
    </AttractionsFilterStyles>
  );
};
export default React.memo(AttractionsFilter);
