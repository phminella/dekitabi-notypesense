import { ItineraryGuidesSearchStyles } from "./styles/ItineraryGuidesSearchStyles";
import React from "react";

interface ItineraryGuidesSearchProps {
  t: (key: string) => string;
  search: string;
  setSearch: (value: string) => void;
}

const ItineraryGuidesSearch = ({ t, search, setSearch }: ItineraryGuidesSearchProps) => {
  return (
    <ItineraryGuidesSearchStyles>
      <input
        name="guide-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("searchGuidesByName")}
      />
    </ItineraryGuidesSearchStyles>
  );
};
export default React.memo(ItineraryGuidesSearch);
