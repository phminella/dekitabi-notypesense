import { AttractionsWrapperStyles } from "./styles/AttractionsWrapperStyles";
import AttractionSortBy from "./AttractionsFilter/AttractionsSortBy";
import dynamic from "next/dynamic";
import AttractionsList from "./AttractionsList";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import ListSpinner from "../../UI/ListSpinner";
import { useState } from "react";
const NotFound = dynamic(() => import("../../UI/NotFound"));
// import ShowItineraryVideo from "../../Misc/ShowItineraryVideo";
import MapWrapper from "./Map/MapWrapper";
import BasicModal from "../../UI/BasicModal";
import AttractionItinerary from "./AttractionItinerary";
import useLocalStorage from "../../../lib/useLocalStorage";
const AttractionsWrapper = ({
  t,
  resultDetails,
  selectedAttraction,
  setSelectedAttraction,
  language,
  attractions,
  sortBy,
  setSortBy,
  city,
  loadingResults,
  setPolygon,
  pagination,
  setSearchInput,
  setPagination,
  setResultDetails,
  center,
  searchInput,
  initSearch,
}) => {
  const [showMap, setShowMap] = useState(false);
  const [attractionToAdd, setAttractionToAdd] = useState();
  const [showItinerary, setShowItinerary] = useState();
  const lastMonday = () => {
    let prevMonday = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Tokyo",
      })
    );
    return new Date(
      prevMonday?.setDate(
        prevMonday?.getDate() - ((prevMonday?.getDay() + 6) % 7)
      )
    );
  };
  const { setItem } = useLocalStorage();
  return (
    <AttractionsWrapperStyles className="attractions-wrapper">
      <BasicModal setShowModal={setShowItinerary} showModal={showItinerary}>
        <AttractionItinerary
          attraction={attractionToAdd}
          showItinerary={showItinerary}
          setShowItinerary={setShowItinerary}
          t={t}
        />
      </BasicModal>
      <div className="attractions-list">
        <div className="attraction-update">
          <p>{t("attractionUpdate")}</p>
          <p>
            <Image
              height={15}
              width={15}
              src="/img/icon-clock.svg"
              alt="clock"
              className="icons"
            ></Image>
            {t("lastUpdate")}{" "}
            <b>
              {(lastMonday()?.getMonth() > 8
                ? lastMonday()?.getMonth() + 1
                : "0" + (lastMonday()?.getMonth() + 1)) +
                "/" +
                (lastMonday()?.getDate() > 9
                  ? lastMonday()?.getDate()
                  : "0" + lastMonday()?.getDate()) +
                "/" +
                lastMonday()?.getFullYear()}
            </b>
          </p>
        </div>
        {/* <ShowItineraryVideo /> */}
        <p className="found">
          <Image
            height={20}
            width={20}
            alt="itinerary"
            src="/img/icon-marker2.svg"
          />
          {t("attractionsFound", {
            attractionsFound: resultDetails?.counter,
          })}
        </p>
        <div className="result-details">
          <AttractionSortBy
            t={t}
            sortBy={sortBy}
            setSortBy={setSortBy}
            city={city}
          />

          <div className="per-page">
            {t("perPage")}
            <button
              className={resultDetails?.perPage === 12 ? "active" : ""}
              onClick={() =>
                setResultDetails({ ...resultDetails, perPage: 12 })
              }
            >
              12
            </button>
            <button
              className={resultDetails?.perPage === 24 ? "active" : ""}
              onClick={() =>
                setResultDetails({ ...resultDetails, perPage: 24 })
              }
            >
              24
            </button>
            <button
              className={resultDetails?.perPage === 48 ? "active" : ""}
              onClick={() =>
                setResultDetails({ ...resultDetails, perPage: 48 })
              }
            >
              48
            </button>
          </div>
        </div>
        <div
          className={`attraction-list-wrapper ${
            attractions?.length === 0 ? "empty" : ""
          }`}
        >
          <ListSpinner loading={loadingResults} />
          <AttractionsList
            selectedAttraction={selectedAttraction}
            setSelectedAttraction={setSelectedAttraction}
            t={t}
            language={language}
            attractions={attractions}
            showItinerary={showItinerary}
            setShowItinerary={setShowItinerary}
            setAttractionToAdd={setAttractionToAdd}
            setShowMap={setShowMap}
          />
          {attractions?.length === 0 && (
            <NotFound message={`${t("noAttractions")}.`} />
          )}
        </div>
        {attractions?.length > 0 && (
          <div className="pagination">
            <Pagination
              page={pagination}
              count={Math.ceil(resultDetails?.counter / resultDetails?.perPage)}
              shape="rounded"
              variant="outlined"
              onChange={(e, value) => {
                initSearch(value, true);
                setPagination(value);
              }}
            />
          </div>
        )}
      </div>
      <div className={`attractions-map ${showMap ? "show" : ""}`}>
        <MapWrapper
          // radius={radius}
          setPolygon={setPolygon}
          center={center}
          attractions={attractions}
          setSelectedAttraction={setSelectedAttraction}
          selectedAttraction={selectedAttraction}
          loadingResults={loadingResults}
          language={language}
          t={t}
          pagination={pagination}
          setPagination={setPagination}
          setSearchInput={setSearchInput}
          resultDetails={resultDetails}
          setShowItinerary={setShowItinerary}
          setAttractionToAdd={setAttractionToAdd}
          searchInput={searchInput}
          initSearch={initSearch}
          setShowMap={setShowMap}
          showMap={showMap}
        />
      </div>
      <button
        className={`show-map`}
        onClick={() => {
          setShowMap(!showMap);
          setItem("firstTimeAttractions", true);
        }}
      >
        <Image height={35} width={35} src="/img/icon-marker.svg" alt="map2" />
      </button>
    </AttractionsWrapperStyles>
  );
};
export default AttractionsWrapper;
