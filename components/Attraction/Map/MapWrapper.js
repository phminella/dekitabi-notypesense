import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from "./Marker";
import Map from "./Map";
import React, { useEffect, useState } from "react";
import LazySkeleton from "../../UI/LazySkeleton";
import ComponentOffline from "../../UI/ComponentOffline";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setMapLanguage } from "../../../store/appSlice";
const MapWrapper = ({ attraction }) => {
  const dispatch = useDispatch();
  const mapLanguage = useSelector((state) => state.app.mapLanguage);
  const router = useRouter();
  const [map, setMap] = useState();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!mapLanguage && router?.locale) {
      dispatch(setMapLanguage(router.locale));
    }
  }, [dispatch, mapLanguage, router?.locale]);

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <LazySkeleton minHeight={"100%"} />;
      case Status.FAILURE:
        return <ComponentOffline />;
      case Status.SUCCESS:
        return (
          <Map attraction={attraction} map={map} setMap={setMap}>
            <Marker
              attraction={attraction}
              position={{
                lat: attraction?._geoloc[0],
                lng: attraction?._geoloc[1],
              }}
            />
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
      render={render}
    ></Wrapper>
  );
};
export default React.memo(MapWrapper);
