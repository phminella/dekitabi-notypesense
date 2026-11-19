import { SearchResultsStyles } from "./styles/SearchResultsStyles";
import Image from "next/image";
import Link from "next/link";
const SearchSuggestions = ({
  t,
  setShowSuggestions,
  section,
  setShowSearch,
  setSearchInput,
}) => {
  return (
    <SearchResultsStyles className="suggestions">
      <Link
        prefetch={false}
        href={`/s/Tokyo/${section}`}
        className="suggestion"
        onClick={() => {
          setSearchInput("");
          setShowSuggestions(false);
          setShowSearch(false);
        }}
      >
        <div className="marker-wrapper">
          <Image
            src="/img/icon-marker.svg"
            height={25}
            width={25}
            alt="marker"
          />
        </div>
        <div className="suggestion-city">
          {t("Tokyo")}
          <p className="suggestion-country">{t("japan")}</p>
        </div>
      </Link>
      <Link
        prefetch={false}
        href={`/s/Osaka-city/${section}`}
        className="suggestion"
        onClick={() => {
          setShowSuggestions(false);
          setShowSearch(false);
        }}
      >
        <div className="marker-wrapper">
          <Image
            src="/img/icon-marker.svg"
            height={25}
            width={25}
            alt="marker"
          />
        </div>
        <div className="suggestion-city">
          {t("Osaka")}
          <p className="suggestion-country">{t("japan")}</p>
        </div>
      </Link>
      <Link
        prefetch={false}
        href={`/s/Kyoto-City/${section}`}
        className="suggestion"
        onClick={() => {
          setShowSuggestions(false);
          setShowSearch(false);
        }}
      >
        <div className="marker-wrapper">
          <Image
            src="/img/icon-marker.svg"
            height={25}
            width={25}
            alt="marker"
          />
        </div>
        <div className="suggestion-city">
          {t("Kyoto")}
          <p className="suggestion-country">{t("japan")}</p>
        </div>
      </Link>
      <Link
        prefetch={false}
        href={`/s/Yokohama/${section}`}
        className="suggestion"
        onClick={() => {
          setShowSuggestions(false);
          setShowSearch(false);
        }}
      >
        <div className="marker-wrapper">
          <Image
            src="/img/icon-marker.svg"
            height={25}
            width={25}
            alt="marker"
          />
        </div>
        <div className="suggestion-city">
          {t("Yokohama")}
          <p className="suggestion-country">{t("japan")}</p>
        </div>
      </Link>
      <Link
        prefetch={false}
        href={`/s/Nara-City/${section}`}
        className="suggestion"
        onClick={() => {
          setShowSuggestions(false);
          setShowSearch(false);
        }}
      >
        <div className="marker-wrapper">
          <Image
            src="/img/icon-marker.svg"
            height={25}
            width={25}
            alt="marker"
          />
        </div>
        <div className="suggestion-city">
          {t("Nara")}
          <p className="suggestion-country">{t("japan")}</p>
        </div>
      </Link>
    </SearchResultsStyles>
  );
};
export default SearchSuggestions;
