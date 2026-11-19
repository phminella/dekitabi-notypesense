import { Wrapper, Status } from "@googlemaps/react-wrapper";
import dynamic from "next/dynamic";
const Marker = dynamic(() => import("./Marker"), { ssr: false });
import Map from "./Map";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import LazySkeleton from "../../../UI/LazySkeleton";
import ComponentOffline from "../../../UI/ComponentOffline";
import dottie from "dottie";
import Image from "next/image";
import NoAttractionsMap from "./NoAttractionsMap";
import { Pagination } from "@mui/material";
import isPwa from "../../../../lib/isPwa";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setMapLanguage } from "../../../../store/appSlice";
const MapWrapper = ({
  attractions,
  setSelectedAttraction,
  selectedAttraction,
  setPolygon,
  center,
  language,
  attractionOpeningTime,
  loadingResults,
  t,
  pagination,
  setPagination,
  setSearchInput,
  resultDetails,
  setAttractionToAdd,
  setShowItinerary,
  setShowMap,
  showMap,
  searchInput,
  initSearch,
}) => {
  const dispatch = useDispatch();
  const mapLanguage = useSelector((state) => state.app.mapLanguage);
  const router = useRouter();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const markersRef = useRef([]);
  const otherWindow = useRef();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const setAllMarkers = useCallback(async () => {
    const tempMarkers = await Promise.all(
      attractions?.map((attraction, i) => {
        const icon = {
          path: "M53.1,48.1c3.9-5.1,6.3-11.3,6.3-18.2C59.4,13.7,46.2,0.5,30,0.5C13.8,0.5,0.6,13.7,0.6,29.9 c0,6.9,2.5,13.1,6.3,18.2C12.8,55.8,30,77.5,30,77.5S47.2,55.8,53.1,48.1z",
          fillColor: "#fc0165",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 3,
          scale: 0.45,
          anchor: new google.maps.Point(32, 80),
          labelOrigin: new google.maps.Point(30, 30),
        };
        return new google.maps.Marker({
          label: {
            text: String(i + 1),
            color: "white",
          },
          icon,
          zIndex: 500 + i + 1,
        });
      })
    );
    markersRef.current = tempMarkers;
    setMarkers(tempMarkers);
  }, [attractions]);
  useEffect(() => {
    let mounted = true;
    const existingMarkers = markersRef.current;
    Promise.all(
      existingMarkers?.map(async (marker) => {
        marker?.setMap(null);
      })
    ).then(() => {
      if (mounted && attractions && map) {
        setAllMarkers();
      }
    });
    return () => {
      mounted = false;
    };
  }, [attractions, map, setAllMarkers]);
  useEffect(() => {
    return () => {
      markersRef.current?.forEach((marker) => marker?.setMap(null));
    };
  }, []);
  useEffect(() => {
    if (!mapLanguage && router?.locale) {
      dispatch(setMapLanguage(router.locale));
    }
  }, [dispatch, mapLanguage, router?.locale]);
  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <LazySkeleton minHeight={"100vh"} />;
      case Status.FAILURE:
        return <ComponentOffline />;
      case Status.SUCCESS:
        return (
          <Map
            attractions={attractions}
            selectedAttraction={selectedAttraction}
            map={map}
            setMap={setMap}
            setPolygon={setPolygon}
            center={center}
            otherWindow={otherWindow}
            searchInput={searchInput}
          >
            <button className="show-map" onClick={() => setShowMap(!showMap)}>
              <Image
                height={35}
                width={35}
                src="/img/icon-close.svg"
                alt="map2"
              />
            </button>
            <NoAttractionsMap t={t} noAttractions={attractions?.length === 0} />
            {Math.ceil(resultDetails?.counter / resultDetails?.perPage) > 1 && (
              <div className={`${isPwa() ? "is-pwa" : ""} pagination-map`}>
                <Pagination
                  page={pagination}
                  count={Math.ceil(
                    resultDetails?.counter / resultDetails?.perPage
                  )}
                  shape="rounded"
                  variant="outlined"
                  onChange={(e, value) => {
                    initSearch(value, true);
                    setPagination(value);
                  }}
                />
              </div>
            )}
            <button
              onClick={() => {
                if (searchInput?.length > 0) {
                  setSearchInput("");
                } else {
                  initSearch(1, false, true);
                }
              }}
              className="search-area-button"
            >
              {loadingResults ? (
                <Image
                  width={35}
                  height={35}
                  alt="spinner"
                  src={"/img/icon-spinner-white.svg"}
                />
              ) : (
                <>
                  <Image
                    width={20}
                    height={20}
                    alt="search-area"
                    src={"/img/icon-search.svg"}
                    className="search-icon"
                  />
                  {t("searchThisArea")}
                </>
              )}
            </button>
            {attractions?.map((attraction, i) => (
              <Marker
                key={i}
                position={{
                  lat: attraction?.document?._geoloc[0],
                  lng: attraction?.document?._geoloc[1],
                }}
                index={i + 1}
                setSelectedAttraction={setSelectedAttraction}
                selectedAttraction={selectedAttraction}
                otherWindow={otherWindow}
                attraction={dottie.transform(attraction?.document)}
                language={language}
                attractionOpeningTime={attractionOpeningTime}
                attractions={attractions}
                marker={markers[i]}
                setShowItinerary={setShowItinerary}
                setAttractionToAdd={setAttractionToAdd}
                t={t}
              />
            ))}
          </Map>
        );
    }
  };
  if (!googleMapsApiKey) {
    return <ComponentOffline />;
  }
  return (
    <Wrapper
      apiKey={googleMapsApiKey}
      language={mapLanguage || router?.locale || "en"}
      className="map"
      render={render}
    ></Wrapper>
  );
};
export default React.memo(MapWrapper);
