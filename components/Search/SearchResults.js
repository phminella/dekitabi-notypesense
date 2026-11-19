import { SearchResultsStyles } from "./styles/SearchResultsStyles";
import Image from "next/legacy/image";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import dottie from "dottie";
const SearchResults = ({
  suggestions,
  language,
  loading,
  t,
  setShowResults,
  section,
  setShowSearch,
  setSearchInput,
}) => {
  return (
    <SearchResultsStyles className={`suggestions`}>
      {loading && (
        <>
          <div className="suggestion">
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "10px" }}
              width={"100%"}
              height={35}
            />
          </div>

          <div className="suggestion">
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "10px" }}
              width={"100%"}
              height={35}
            />
          </div>
          <div className="suggestion">
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "10px" }}
              width={"100%"}
              height={35}
            />
          </div>
          <div className="suggestion">
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "10px" }}
              width={"100%"}
              height={35}
            />
          </div>
          <div className="suggestion">
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "10px" }}
              width={"100%"}
              height={35}
            />
          </div>
        </>
      )}
      {!loading && suggestions?.length === 0 && (
        <p className="no-results">{t("noResults")}</p>
      )}
      {!loading && (
        <>
          {suggestions?.map((suggestion, i) => {
            let dottiedSuggestion = dottie.transform(suggestion.document);
            return (
              <Link
                prefetch={false}
                href={`/s/${dottiedSuggestion.translatedCity["en"]
                  .split(" ")
                  .join("-")}/${section}`}
                className="suggestion"
                key={i}
                onClick={() => {
                  setSearchInput("");
                  setShowResults(false);
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
                  {dottiedSuggestion.translatedCity[language?.code]}
                  <p className="suggestion-country">
                    {dottiedSuggestion.translatedCountry[language?.code]}
                  </p>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </SearchResultsStyles>
  );
};
export default SearchResults;
