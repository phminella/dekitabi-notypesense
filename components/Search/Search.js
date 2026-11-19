import { SearchStyles } from "./styles/SearchStyles";
import { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import dynamic from "next/dynamic";
const SearchResults = dynamic(() => import("./SearchResults"), {
  srr: false,
});
const SearchSuggestions = dynamic(() => import("./SearchSuggestions"), {
  srr: false,
});
import { useRouter } from "next/router";
import { createLocalSearchClient } from "../../lib/search/client";
const Search = ({ t, language, showSearch, setShowSearch, fromItinerary }) => {
  const clientRef = useRef();
  const router = useRouter();
  const section = fromItinerary
    ? "itineraries"
    : typeof router.query?.id !== "string" && router.query?.id?.length > 1
    ? router.query?.id[1]
    : "";
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const initSearch = async () => {
    setLoading(true);
    setShowResults(true);
    setShowSuggestions(false);
    let searchParameters = {
      q: searchInput,
      query_by: `translatedCity.${language.code}, translatedCity.en, translatedCity.ja, city, translatedCountry.${language.code}, translatedCountry.en, country`,
      per_page: 5,
      page: 1,
      use_cache: true,
      cache_ttl: 60 * 60 * 24 * 7,
      sort_by: `city(missing_values: last):asc`,
    };
    try {
      if (typeof window === "undefined") return; // Safety check
      if (!clientRef.current) {
        clientRef.current = createLocalSearchClient();
      }
      clientRef.current
        .collections("cities")
        .documents()
        .search(searchParameters)
        .then((data) => {
          setSuggestions(data.hits);
          setTimeout(() => {
            setLoading(false);
          }, 300);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchInput.length > 1) {
      const timeOutId = setTimeout(() => {
        initSearch();
      }, 700);
      return () => clearTimeout(timeOutId);
    } else {
      const timeOutId = setTimeout(() => {
        setShowResults(false);
      }, 700);
      return () => clearTimeout(timeOutId);
    }
  }, [searchInput]);
  const wrapperRef = useRef(null);
  const closeAll = () => {
    setShowSuggestions(false);
    setShowResults(false);
    setShowSearch(false);
    setSearchInput("");
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeAll();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  useEffect(() => {
    if (showSearch) {
      document.getElementById("search").focus();
    }
  }, [showSearch]);
  return (
    <SearchStyles className={`search`}>
      <div className="search-wrapper" ref={wrapperRef}>
        <SearchInput
          t={t}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setShowSuggestions={setShowSuggestions}
          closeAll={closeAll}
        />
        {showResults && (
          <SearchResults
            suggestions={suggestions}
            language={language}
            t={t}
            loading={loading}
            setShowResults={setShowResults}
            section={section}
            setShowSearch={setShowSearch}
            setSearchInput={setSearchInput}
          />
        )}
        {showSuggestions && (
          <SearchSuggestions
            setSearchInput={setSearchInput}
            t={t}
            setShowSuggestions={setShowSuggestions}
            section={section}
            setShowSearch={setShowSearch}
          />
        )}
      </div>
      {(showResults || showSuggestions || showSearch) && (
        <div
          className="suggestions-bg"
          onClick={() => setShowSearch(false)}
        ></div>
      )}
    </SearchStyles>
  );
};
export default Search;
