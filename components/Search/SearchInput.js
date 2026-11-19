import { SearchInputStyles } from "./styles/SearchInputStyles";
import Image from "next/image";
const SearchInput = ({
  setSearchInput,
  searchInput,
  t,
  setShowSuggestions,
  closeAll,
}) => {
  return (
    <SearchInputStyles className="header-search-input">
      <div className="search-button">
        <Image
          src="/img/icon-search.svg"
          height={20}
          width={20}
          alt="search"
          className="search-icon"
        />
      </div>
      <button className="close-icon" onClick={() => closeAll()}>
        <Image src="/img/icon-close.svg" height={20} width={20} alt="close" />
      </button>
      <input
        id="search"
        placeholder={t("selectDestination")}
        className="search-input"
        autoComplete="off"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onFocus={() => {
          setShowSuggestions(true);
        }}
      />
    </SearchInputStyles>
  );
};
export default SearchInput;
