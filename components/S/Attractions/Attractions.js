import React, { useCallback, useEffect, useRef, useState } from "react";
import AttractionsFilter from "./AttractionsFilter/AttractionsFilter";
import { AttractionsStyles } from "./styles/AttractionsStyles";
import { AttractionsResponsiveStyles } from "./styles/responsive/AttractionsResponsiveStyles";
import dottie from "dottie";
import AttractionsWrapper from "./AttractionsWrapper";
import { createLocalSearchClient } from "../../../lib/search/client";
const Attractions = ({
  city,
  language,
  t,
  tab,
  user,
  setFirstAttraction,
  firstAttraction,
  router,
  data,
  locale,
}) => {
  const topRef = useRef();
  const clientRef = useRef(null);
  const lastSearchKeyRef = useRef("");
  const [selectedAttraction, setSelectedAttraction] = useState();
  const [attractions, setAttractions] = useState(data?.hits);
  useEffect(() => {
    setAttractions(data?.hits);
  }, [data]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [polygon, setPolygon] = useState();
  const [previousCity, setPreviousCity] = useState(city?.city);
  // const [radiusUnit, setRadiusUnit] = useState("km");
  const [center, setCenter] = useState([
    city?._geoloc?.[0] ?? 35.6813, 
    city?._geoloc?.[1] ?? 139.7671,
  ]);
  const [searchInput, setSearchInput] = useState(
    router?.query?.query ? router?.query?.query : ""
  );
  const [sortBy, setSortBy] = useState(
    router?.query?.sortBy ? router?.query?.sortBy : "ratingCounter:desc"
  );
  const [resultDetails, setResultDetails] = useState({
    counter: data?.found,
    totalCounter: data?.out_of,
    perPage: router?.query?.perPage ? parseInt(router?.query?.perPage) : 12,
  });
  const [tags, setTags] = useState(
    router?.query?.tags?.length > 3
      ? Array.isArray(router?.query?.tags)
        ? router?.query?.tags
        : [router?.query?.tags]
      : []
  );
  const [pagination, setPagination] = useState(1);
  const [compareTags, setCompareTags] = useState("");
  useEffect(() => {
    if (tags) {
      let tempTags = "";
      tags?.map((tag) => {
        tempTags = tempTags + "tags:=" + tag + " && ";
      });
      setCompareTags(tempTags);
    }
  }, [tags]);

  const initSearch = useCallback(async (
    page = 1,
    shouldScroll = false,
    fromAreaSearch = false
  ) => {
    setLoadingResults(true);
    setSelectedAttraction(undefined);
    await router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          query: searchInput || undefined,
          tags: tags?.length > 0 ? tags : undefined,
          sortBy: sortBy || undefined,
          perPage: resultDetails?.perPage || undefined,
        },
      },
      undefined,
      { shallow: true }
    );
    if (polygon) {
      const searchParameters = {
        q: searchInput,
        query_by: `translatedName.${language?.code}, translatedCity.${language?.code}, translatedArea.${language?.code}, translatedName.en, translatedCity.en, translatedArea.en, translatedName.ja, translatedCity.ja, translatedArea.ja`,
        filter_by: `${tags?.length > 0 ? compareTags : ""}${
          !searchInput
            ? `_geoloc:(${polygon}) && hide:!=true`
            : `_geoloc:(${
                firstAttraction?._geoloc
                  ? firstAttraction?._geoloc?.[0] ?? 35.6813
                  : city?._geoloc?.[0] ?? 35.6813
              }, ${
                firstAttraction?._geoloc
                  ? firstAttraction?._geoloc?.[1] ?? 139.7671
                  : city?._geoloc?.[1] ?? 139.7671
              }, 70km) && hide:!=true`
        } `,
        sort_by: sortBy,
        per_page: resultDetails?.perPage,
        page,
        exclude_fields:
          "reviews.en, reviews.es, reviews.fil, reviews.fr, reviews.id, reviews.it, reviews.ja, reviews.ko, reviews.ms, reviews.pt, reviews.th, reviews.vi, reviews.zh, reviews.zh-TW, reviews.zh-CH, phoneNumber, address.en, address.es, address.fil, address.fr, address.id, address.it, address.ja, address.ko, address.ms, address.pt, address.th, address.vi, address.zh, address.zh-TW, address.zh-CH, description, translatedDescription.en, translatedDescription.es, translatedDescription.fil, translatedDescription.fr, translatedDescription.id, translatedDescription.it, translatedDescription.ja, translatedDescription.ko, translatedDescription.ms, translatedDescription.pt, translatedDescription.th, translatedDescription.vi, translatedDescription.zh, translatedDescription.zh-TW, translatedDescription.zh-CH, translatedArea.en, translatedArea.es, translatedArea.fil, translatedArea.fr, translatedArea.id, translatedArea.it, translatedArea.ja, translatedArea.ko, translatedArea.ms, translatedArea.pt, translatedArea.th, translatedArea.vi, translatedArea.zh, translatedArea.zh-TW, translatedArea.zh-CH, translatedCity.en, translatedCity.es, translatedCity.fil, translatedCity.fr, translatedCity.id, translatedCity.it, translatedCity.ja, translatedCity.ko, translatedCity.ms, translatedCity.pt, translatedCity.th, translatedCity.vi, translatedCity.zh, translatedCity.zh-TW, translatedCity.zh-CH,",
        // use_cache: true,
        // cache_ttl: 60 * 60 * 24 * 7,
      };
      try {
        if (typeof window === "undefined") return; // Safety check
        if (!clientRef.current) {
          clientRef.current = createLocalSearchClient();
        }
        clientRef.current
          .collections("attractions")
          .documents()
          .search(searchParameters)
          .then((data) => {
            if (data?.hits?.length > 0 && fromAreaSearch) {
              setFirstAttraction({
                state: data?.hits[0]?.document?.state,
                _geoloc: data?.hits[0]?.document?._geoloc,
                translatedCity: dottie.transform(data?.hits[0]?.document)
                  .translatedState,
              });
            }
            setAttractions(data?.hits);
            setPagination(page);
            setResultDetails((prev) => ({
              ...prev,
              counter: data?.found,
              totalCounter: data?.out_of,
            }));
            setTimeout(() => {
              setLoadingResults(false);
              if (shouldScroll && !fromAreaSearch) {
                topRef.current?.scrollIntoView({ behavior: "auto" });
              }
            }, 300);
          })
          .catch(() => {
            setAttractions([]);
            setPagination(1);
            setResultDetails((prev) => ({
              ...prev,
              counter: 0,
              totalCounter: 0,
            }));
            setTimeout(() => {
              setLoadingResults(false);
              if (shouldScroll && !fromAreaSearch) {
                topRef.current?.scrollIntoView({ behavior: "auto" });
              }
            }, 300);
          });
      } catch {
        setLoadingResults(false);
      }
    }
  }, [
    city?._geoloc,
    compareTags,
    firstAttraction?._geoloc,
    language?.code,
    polygon,
    resultDetails?.perPage,
    router,
    searchInput,
    setFirstAttraction,
    sortBy,
    tags,
  ]);
  useEffect(() => {
    if (loadingResults || !polygon || !language || !user) return;
    const hasSearchChanges =
      searchInput !== "" ||
      compareTags !== "" ||
      resultDetails?.perPage !== 12 ||
      sortBy !== "ratingCounter:desc";
    if (!hasSearchChanges && lastSearchKeyRef.current === "") return;

    const searchKey = JSON.stringify({
      city: city?.city,
      compareTags,
      perPage: resultDetails?.perPage,
      polygon,
      searchInput,
      sortBy,
    });
    if (searchKey === lastSearchKeyRef.current) return;

    const timeOutId = setTimeout(() => {
      lastSearchKeyRef.current = searchKey;
      initSearch();
    }, 700);
    return () => clearTimeout(timeOutId);
  }, [
    city?.city,
    initSearch,
    loadingResults,
    polygon,
    searchInput,
    compareTags,
    language,
    resultDetails?.perPage,
    sortBy,
    user,
  ]);
  useEffect(() => {
    if (!center || previousCity !== city?.city) {
      setFirstAttraction(false);
      setCenter([
        city?._geoloc?.[0] ?? 35.6813,
        city?._geoloc?.[1] ?? 139.7671,
      ]);
    }
  }, [center, city?._geoloc, city?.city, previousCity, setFirstAttraction]);
  useEffect(() => {
    if (previousCity !== city?.city) {
      setPreviousCity(city?.city);
      if (searchInput || tags?.length > 0) {
        setTags([]);
        setSearchInput("");
      }
    } else if (polygon && !attractions) {
      initSearch();
    }
  }, [
    attractions,
    city?.city,
    initSearch,
    polygon,
    previousCity,
    searchInput,
    tags?.length,
  ]);
  return (
    <AttractionsResponsiveStyles>
      <AttractionsStyles>
        <div>
          <AttractionsFilter
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            tags={tags}
            setTags={setTags}
            t={t}
            tab={tab}
            topRef={topRef}
            city={city?.translatedCity?.[locale] ?? "en"}
            firstAttractionCity={
              firstAttraction?.translatedCity
                ? firstAttraction?.translatedCity?.[locale ?? "en"]
                : null
            }
          />
          <AttractionsWrapper
            t={t}
            resultDetails={resultDetails}
            selectedAttraction={selectedAttraction}
            setSelectedAttraction={setSelectedAttraction}
            language={language}
            attractions={attractions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            city={city}
            loadingResults={loadingResults}
            center={center}
            setPolygon={setPolygon}
            polygon={polygon}
            pagination={pagination}
            initSearch={initSearch}
            setSearchInput={setSearchInput}
            setPagination={setPagination}
            setResultDetails={setResultDetails}
            searchInput={searchInput}
          />
        </div>
      </AttractionsStyles>
    </AttractionsResponsiveStyles>
  );
};
export default React.memo(Attractions);
