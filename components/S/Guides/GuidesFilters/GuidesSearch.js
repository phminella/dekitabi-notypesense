import { GuidesSearchStyles } from "./styles/GuidesSearchStyles";
const GuidesSearch = ({ searchInput, setSearchInput, t }) => {
  return (
    <GuidesSearchStyles>
      <input
        name="guide-search"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={t("searchGuidesByName")}
      />
    </GuidesSearchStyles>
  );
};
export default GuidesSearch;
