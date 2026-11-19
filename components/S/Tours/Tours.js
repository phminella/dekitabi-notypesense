import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToursStyles } from "./styles/ToursStyles";
import { ToursResponsiveStyles } from "./styles/responsive/ToursResponsiveStyles";
import dynamic from "next/dynamic";
import TourSkeleton from "./TourSkeleton";
import ShowOriginal from "../../UI/ShowOriginal";
// import ShowItineraryVideo from "../../Misc/ShowItineraryVideo";
const Tour = dynamic(() => import("./Tour"), {
  loading: () => <TourSkeleton />,
});
import NotFound from "../../UI/NotFound";
import AttractionFilterTags from "../Attractions/AttractionsFilter/AttractionFilterTags";
import AttractionSearch from "../Attractions/AttractionsFilter/AttractionSearch";
import ToursResultsDetails from "./ToursResultsDetails";
import ToursFilter from "./ToursFilters/ToursFilter";
import Pagination from "@mui/material/Pagination";
import dottie from "dottie";
import TourListSkeleton from "./TourListSkeleton";
import ToursSkeleton from "./ToursSkeleton";
import { createLocalSearchClient } from "../../../lib/search/client";
const Tours = ({ city, language, t, firstAttraction, router, data, user }) => {
  const parseAppliedFilters = (queryValue) => {
    if (typeof queryValue !== "string" || queryValue?.length <= 3) return [];
    try {
      const parsed = JSON.parse(queryValue);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  const topRef = useRef();
  const clientRef = useRef(null);
  const lastSearchKeyRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortBy, setSortBy] = useState(
    router?.query?.sortBy
      ? router?.query?.sortBy
      : `_geoloc(${city?._geoloc?.[0] ?? 35.6813}, ${
          city?._geoloc?.[1] ?? 139.7671
        }):asc`
  );
  const [tours, setTours] = useState(data?.hits);
  useEffect(() => {
    setTours(data?.hits);
  }, [data]);
  const [appliedFilters, setAppliedFilters] = useState(
    parseAppliedFilters(router?.query?.appliedFilters)
  );
  const [searchFilters, setSearchFilters] = useState({
    time: router?.query?.time ? router?.query?.time : "",
    duration: router?.query?.duration ? router?.query?.duration : "",
  });
  const [searchInput, setSearchInput] = useState(
    router?.query?.query ? router?.query?.query : ""
  );
  const [resultDetails, setResultDetails] = useState({
    counter: data?.found,
    totalCounter: data?.out_of,
    perPage: router?.query?.perPage ? parseInt(router?.query?.perPage) : 12,
  });
  const [tags, setTags] = useState(
    router?.query?.tags
      ? Array.isArray(router?.query?.tags)
        ? router?.query?.tags
        : [router?.query?.tags]
      : []
  );
  const [pagination, setPagination] = useState(1);
  const [compareTags, setCompareTags] = useState("");
  const [previousCity, setPreviousCity] = useState(city?.city);
  useEffect(() => {
    if (tags) {
      let tempTags = "";
      tags?.map((tag) => {
        tempTags = tempTags + "tags:=" + tag + " && ";
      });
      setCompareTags(tempTags);
    }
  }, [tags]);
  const initSearch = useCallback(async (page = 1) => {
    setSearchLoading(true);
    const nextQuery = {
      ...router.query,
      query: searchInput || undefined,
      tags: tags?.length > 0 ? tags : undefined,
      sortBy: sortBy || undefined,
      time: searchFilters?.time || undefined,
      duration: searchFilters?.duration || undefined,
      perPage: resultDetails?.perPage || undefined,
      appliedFilters:
        appliedFilters?.length > 0 ? JSON.stringify(appliedFilters) : undefined,
    };
    await router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true }
    );
    const searchParameters = {
      q: searchInput,
      query_by: `${
        language?.code ? `translatedAttractions.${language?.code}` : ""
      }, translatedAttractions.en,  translatedAttractions.ja`,
      filter_by: `${tags?.length > 0 ? compareTags : ""} ${
        searchFilters?.time ? `${searchFilters?.time} && ` : ""
      }${
        searchFilters?.duration ? `${searchFilters?.duration} && ` : ""
      }${`_geoloc:(${
        firstAttraction?._geoloc
          ? firstAttraction?._geoloc?.[0] ?? 35.6813
          : city?._geoloc?.[0] ?? 35.6813
      }, ${
        firstAttraction?._geoloc
          ? firstAttraction?._geoloc?.[1] ?? 139.7671
          : city?._geoloc?.[1] ?? 139.7671
      }, 120km)`}`,
      sort_by: sortBy
        ? sortBy
        : `_geoloc(${city?._geoloc?.[0] ?? 35.6813}, ${
            city?._geoloc?.[1] ?? 139.7671
          }):asc`,
      per_page: resultDetails?.perPage,
      page,
    };
    if (typeof window === "undefined") return; // Safety check
    if (!clientRef.current) {
      clientRef.current = createLocalSearchClient();
    }
    clientRef.current
      .collections("tours")
      .documents()
      .search(searchParameters)
      .then(async (data) => {
        if (page) {
          topRef?.current?.scrollIntoView({ behavior: "auto" });
        }
        const results = data?.hits;
        setPagination(page || 1);
        setResultDetails((prev) => ({
          ...prev,
          counter: data?.found,
          totalCounter: data?.out_of,
        }));
        setLoading(false);
        setSearchLoading(false);
        setTours(results);
      })
      .catch(() => {
        setResultDetails((prev) => ({
          ...prev,
          counter: 0,
          totalCounter: 0,
        }));
        setPagination(1);
        setTours([]);
        setSearchLoading(false);
        setLoading(false);
      });
  }, [
    appliedFilters,
    city?._geoloc,
    compareTags,
    firstAttraction?._geoloc,
    language?.code,
    resultDetails?.perPage,
    router,
    searchFilters?.duration,
    searchFilters?.time,
    searchInput,
    sortBy,
    tags,
  ]);
  useEffect(() => {
    if (searchLoading || !language || !user) return;
    const defaultSort = `_geoloc(${city?._geoloc?.[0] ?? 35.6813}, ${
      city?._geoloc?.[1] ?? 139.7671
    }):asc`;
    const hasSearchChanges =
      searchInput !== "" ||
      compareTags !== "" ||
      resultDetails?.perPage !== 12 ||
      sortBy !== defaultSort ||
      searchFilters?.time !== "" ||
      searchFilters?.duration !== "";
    if (!hasSearchChanges && lastSearchKeyRef.current === "") return;

    const searchKey = JSON.stringify({
      city: city?.city,
      compareTags,
      duration: searchFilters?.duration,
      perPage: resultDetails?.perPage,
      searchInput,
      sortBy,
      time: searchFilters?.time,
    });
    if (searchKey === lastSearchKeyRef.current) return;

    const timeOutId = setTimeout(() => {
      lastSearchKeyRef.current = searchKey;
      initSearch();
    }, 700);
    return () => clearTimeout(timeOutId);
  }, [
    city?._geoloc,
    city?.city,
    initSearch,
    searchLoading,
    searchInput,
    compareTags,
    resultDetails?.perPage,
    sortBy,
    language,
    searchFilters?.duration,
    searchFilters?.time,
    user,
  ]);
  useEffect(() => {
    if (previousCity !== city?.city) {
      setPreviousCity(city?.city);
      if (searchInput || tags?.length > 0 || appliedFilters?.length > 0) {
        setSearchInput("");
        setTags([]);
        setAppliedFilters([]);
        setSearchFilters({
          time: "",
          duration: "",
        });
      }
    }
  }, [
    appliedFilters?.length,
    city?.city,
    previousCity,
    searchInput,
    tags?.length,
  ]);
  return (
    <ToursResponsiveStyles>
      <ToursStyles>
        {loading ? (
          <ToursSkeleton topRef={topRef} />
        ) : (
          <>
            <div
              className="tours-filter-wrapper"
              style={{
                position: loading ? "fixed" : "relative",
                visibility: loading ? "hidden" : "visible",
              }}
            >
              <div className="tours-filter" id="tours-filter">
                <AttractionSearch
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  t={t}
                />
                <ToursFilter
                  t={t}
                  searchFilters={searchFilters}
                  setSearchFilters={setSearchFilters}
                  toursLength={resultDetails?.counter}
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                />
              </div>
              <AttractionFilterTags tags={tags} setTags={setTags} t={t} />
            </div>
            <div
              className="tours-wrapper"
              style={{
                visibility: loading ? "hidden" : "visible",
              }}
            >
              <div id="tours-wrapper" ref={topRef}>
                {/* <ShowItineraryVideo /> */}
                <ToursResultsDetails
                  t={t}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  resultDetails={resultDetails}
                  setResultDetails={setResultDetails}
                  city={city}
                />
                {!searchLoading && (
                  <div id="tours-wrapper">
                    <ShowOriginal
                      t={t}
                      showOriginal={showOriginal}
                      setShowOriginal={setShowOriginal}
                    />
                    {tours?.length === 0 && (
                      <NotFound message={t("noItineraries")} />
                    )}
                    <div className="tours-list">
                      {tours?.map((tour, i) => (
                        <Tour
                          language={language}
                          tour={dottie.transform(tour.document)}
                          t={t}
                          key={i}
                          index={i}
                          showOriginal={showOriginal}
                        />
                      ))}
                    </div>
                    {tours?.length > 0 && (
                      <div className="pagination">
                        <Pagination
                          page={pagination ? pagination : 1}
                          count={Math.ceil(
                            resultDetails?.counter / resultDetails?.perPage
                          )}
                          shape="rounded"
                          variant="outlined"
                          onChange={(e, value) => {
                            initSearch(value);
                            setPagination(value);
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
                {searchLoading && <TourListSkeleton />}
              </div>
            </div>
          </>
        )}
      </ToursStyles>
    </ToursResponsiveStyles>
  );
};
export default React.memo(Tours);
