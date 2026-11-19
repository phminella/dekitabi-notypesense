import { GuidesStyles } from "./styles/GuidesStyles";
import { GuidesResponsiveStyles } from "./styles/responsive/GuidesResponsiveStyles";
import * as Scroll from "react-scroll";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GuidesSearch from "./GuidesFilters/GuidesSearch";
import NotFound from "../../UI/NotFound";
import GuidesResultsDetails from "./GuidesResultsDetails";
import GuidesSkeleton from "./GuidesSkeleton";
import GuidesListSkeleton from "./GuidesListSkeleton";
import dynamic from "next/dynamic";
import GuideSkeleton from "./GuideSkeleton";
import SavedFilters from "../SavedFilters";
const Guide = dynamic(() => import("./Guide"), {
  loading: () => <GuideSkeleton />,
});
const GuidesFilter = dynamic(() => import("./GuidesFilters/GuidesFilter"), {
  ssr: false,
});
import GuidesFilterDate from "./GuidesFilters/GuidesFilterDate";
import Pagination from "@mui/material/Pagination";
import dottie from "dottie";
import { useSelector, shallowEqual } from "react-redux";
import dayjs from "dayjs";
import Image from "next/image";
import moment from "moment";
import { createLocalSearchClient } from "../../../lib/search/client";
import useLocalStorage from "../../../lib/useLocalStorage";
const Guides = ({ state, language, t, firstAttraction, router, data }) => {
  const parseAppliedFilters = (queryValue) => {
    if (typeof queryValue !== "string" || queryValue?.length <= 3) return [];
    try {
      const parsed = JSON.parse(queryValue);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  const parseStoredGuideFilters = (value) => {
    if (!value || typeof value !== "string") return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };
  const clientRef = useRef();
  const lastSearchKeyRef = useRef("");
  const { setItem, getItem } = useLocalStorage();
  const [includeTransport, setIncludeTransport] = useState(false);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const [searchFilters, setSearchFilters] = useState({
    licensed: router?.query?.licensed ? router?.query?.licensed : "",
    verified: "verified:='true'",
    canDrive: router?.query?.canDrive ? router?.query?.canDrive : "",
    languages: router?.query?.languages ? router?.query?.languages : "",
    feeHalfDay: router?.query?.feeHalfDay ? router?.query?.feeHalfDay : "",
    feeFullDay: router?.query?.feeFullDay ? router?.query?.feeFullDay : "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortBy, setSortBy] = useState("ratingCounter:desc");
  const [guides, setGuides] = useState(data?.hits);
  useEffect(() => {
    setGuides(data?.hits);
  }, [data]);
  const [pagination, setPagination] = useState(1);
  const [date, setDate] = useState(
    router?.query?.date ? moment(router?.query?.date, "MM-DD-YYYY") : null
  );
  const [appliedFilters, setAppliedFilters] = useState(
    parseAppliedFilters(router?.query?.appliedFilters)
  );
  const [previousState, setPreviousState] = useState();
  const [resultDetails, setResultDetails] = useState({
    counter: data?.found,
    totalCounter: data?.out_of,
    perPage: 12,
  });
  const initSearch = useCallback(async (page, first) => {
    setSearchLoading(true);
    if (page) {
      const scroller = Scroll.scroller;
      scroller.scrollTo("results-details", {
        delay: 0,
        duration: 0,
        offset: -70,
      });
    }
    if (router?.query?.section === "guides" && !first && !page) {
      const localStorageFilters = {
        date: date ? moment(date) : null,
        searchFilters: {
          licensed: searchFilters?.licensed,
          canDrive: searchFilters?.canDrive,
          languages: searchFilters?.languages,
          feeHalfDay: searchFilters?.feeHalfDay,
          feeFullDay: searchFilters?.feeFullDay,
        },
        appliedFilters: appliedFilters?.length > 0 ? appliedFilters : [],
      };
      const queryFilters = {
        ...router.query,
        date: date ? dayjs(date)?.format("MM-DD-YYYY") : null,
        licensed: searchFilters?.licensed,
        canDrive: searchFilters?.canDrive,
        languages: searchFilters?.languages,
        feeHalfDay: searchFilters?.feeHalfDay,
        feeFullDay: searchFilters?.feeFullDay,
        appliedFilters:
          appliedFilters?.length > 0 ? JSON.stringify(appliedFilters) : null,
        sortBy: sortBy || null,
        perPage: resultDetails?.perPage || null,
      };
      const cleanedQuery = Object.fromEntries(
        Object.entries(queryFilters).filter(([, value]) => value != null && value !== "")
      );
      if (
        Object.keys(localStorageFilters?.searchFilters)?.length > 0 ||
        localStorageFilters?.date
      ) {
        setItem("guideSearchFilters", JSON.stringify(localStorageFilters));
      }
      await router.replace(
        { pathname: router.pathname, query: cleanedQuery },
        undefined,
        { shallow: true }
      );
    }
    const searchParameters = {
      q: searchInput,
      query_by: `firstname, lastname`,
      filter_by: `guide:="true" && verified:="true" && ${
        date
          ?
            `acceptTourFrom:<=${Math.floor(
              Math.abs(new Date().getTime() - moment(date)?.valueOf()) /
                (1000 * 60 * 60 * 24)
            )} && `
          : ""
      }states:=${
        firstAttraction?.state ? firstAttraction?.state : state?.area
      }${searchFilters?.languages ? ` && ${searchFilters?.languages}` : ""}${
        searchFilters?.feeFullDay ? ` &&${searchFilters?.feeFullDay}` : ""
      }${searchFilters?.feeHalfDay ? ` &&${searchFilters?.feeHalfDay}` : ""}${
        searchFilters?.verified ? `&& ${searchFilters?.verified}` : ""
      }${searchFilters?.licensed ? `&& ${searchFilters?.licensed}` : ""}${
        searchFilters?.canDrive ? `&& ${searchFilters?.canDrive}` : ""
      }${includeTransport ? ' && transportIncluded:="true"' : ""}`,
      sort_by: sortBy,
      per_page: resultDetails?.perPage,
      page: page || 1,
      exclude_fields: "availability, states",
    };
    if (typeof window === "undefined") return; // Safety check
    if (!clientRef.current) {
      clientRef.current = createLocalSearchClient();
    }
    clientRef.current
      .collections("users")
      .documents()
      .search(searchParameters)
      .then((data) => {
        setGuides(data?.hits);
        setPagination(page || 1);
        setResultDetails((prev) => ({
          ...prev,
          counter: data?.found,
          totalCounter: data?.out_of,
        }));
        setLoading(false);
        setSearchLoading(false);
      })
      .catch(() => {
        setResultDetails((prev) => ({
          ...prev,
          counter: 0,
          totalCounter: 0,
        }));
        setGuides([]);
        setSearchLoading(false);
        setLoading(false);
      });
  }, [
    appliedFilters,
    date,
    firstAttraction?.state,
    includeTransport,
    resultDetails?.perPage,
    router,
    searchFilters?.canDrive,
    searchFilters?.feeFullDay,
    searchFilters?.feeHalfDay,
    searchFilters?.languages,
    searchFilters?.licensed,
    searchFilters?.verified,
    searchInput,
    setItem,
    sortBy,
    state?.area,
  ]);
  useEffect(() => {
    if (searchLoading) return;
    const hasSearchChanges =
      searchInput !== "" ||
      resultDetails?.perPage !== 12 ||
      sortBy !== "ratingCounter:desc" ||
      includeTransport ||
      searchFilters?.licensed !== "" ||
      searchFilters?.languages !== "" ||
      searchFilters?.feeHalfDay !== "" ||
      searchFilters?.feeFullDay !== "" ||
      searchFilters?.canDrive !== "";
    if (!hasSearchChanges && lastSearchKeyRef.current === "") return;

    const searchKey = JSON.stringify({
      canDrive: searchFilters?.canDrive,
      city: state?.city,
      date: date ? dayjs(date)?.format("MM-DD-YYYY") : null,
      feeFullDay: searchFilters?.feeFullDay,
      feeHalfDay: searchFilters?.feeHalfDay,
      includeTransport,
      languages: searchFilters?.languages,
      licensed: searchFilters?.licensed,
      perPage: resultDetails?.perPage,
      searchInput,
      sortBy,
    });
    if (searchKey === lastSearchKeyRef.current) return;

    const timeOutId = setTimeout(() => {
      lastSearchKeyRef.current = searchKey;
      initSearch(undefined, false);
    }, 600);
    return () => clearTimeout(timeOutId);
  }, [
    date,
    initSearch,
    searchLoading,
    searchInput,
    resultDetails?.perPage,
    sortBy,
    includeTransport,
    searchFilters?.canDrive,
    searchFilters?.feeFullDay,
    searchFilters?.feeHalfDay,
    searchFilters?.languages,
    searchFilters?.licensed,
    state?.city,
  ]);
  useEffect(() => {
    if (previousState !== state?.city) {
      setPreviousState(state?.city);
      if (searchInput || date) {
        setSearchInput("");
        if (previousState && previousState !== state?.city) {
          setDate();
        }
      }
    }
  }, [date, previousState, searchInput, state?.city]);
  const storedGuideFilters = parseStoredGuideFilters(getItem("guideSearchFilters"));
  if (loading) return <GuidesSkeleton />;
  return (
    <GuidesResponsiveStyles>
      <GuidesStyles>
        <div
          className="guides-filter-wrapper"
          style={{
            position: loading ? "absolute" : "relative",
            visibility: loading ? "hidden" : "visible",
          }}
        >
          <div className="guides-filter" id="guides-filter">
            <GuidesSearch
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              t={t}
            />
            <div className="guides-filter-two">
              <div className="filter-date">
                {date && (
                  <button className="close-icon" onClick={() => setDate()}>
                    <Image
                      src="/img/icon-close.svg"
                      height={20}
                      width={20}
                      alt="close"
                    />
                  </button>
                )}
                <GuidesFilterDate date={date} setDate={setDate} t={t} />
              </div>
              <GuidesFilter
                t={t}
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
                guidesLength={resultDetails?.counter}
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
                router={router}
              />
            </div>
          </div>
          {storedGuideFilters && (
            <>
              {(storedGuideFilters?.appliedFilters?.length > 0 ||
                storedGuideFilters?.date) &&
                appliedFilters?.length === 0 &&
                !date &&
                !router?.query?.date &&
                !router?.query?.appliedFilters &&
                !searchLoading && (
                  <SavedFilters
                    t={t}
                    pastFilters={storedGuideFilters}
                    searchingFor={"guide"}
                    searchFilters={searchFilters}
                    setSearchFilters={setSearchFilters}
                    setAppliedFilters={setAppliedFilters}
                    setDate={setDate}
                  />
                )}
            </>
          )}
          <GuidesResultsDetails
            t={t}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resultDetails={resultDetails}
            setResultDetails={setResultDetails}
            includeTransport={includeTransport}
            setIncludeTransport={setIncludeTransport}
          />
        </div>
        {!searchLoading && (
          <>
            {guides?.length === 0 && (
              <NotFound message={`${t("guidesFound", { guidesFound: 0 })}.`} />
            )}
            <div className="guides-wrapper">
              {guides?.map((tour, i) => (
                <Guide
                  language={language}
                  currency={currency}
                  guide={dottie.transform(tour?.document)}
                  t={t}
                  key={i}
                  includeTransport={includeTransport}
                />
              ))}
            </div>
          </>
        )}
        {searchLoading && <GuidesListSkeleton />}
        {guides?.length > 0 && (
          <div className="pagination">
            <Pagination
              page={pagination ? pagination : 1}
              count={Math.ceil(resultDetails?.counter / resultDetails?.perPage)}
              shape="rounded"
              variant="outlined"
              onChange={(e, value) => {
                initSearch(value);
                setPagination(value);
              }}
            />
          </div>
        )}
      </GuidesStyles>
    </GuidesResponsiveStyles>
  );
};
export default React.memo(Guides);
