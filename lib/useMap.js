import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import useDate from "./useDate";
const useMap = () => {
  const { toMinutes } = useDate();
  const calculateDistance = async (from, to, by) => {
    if (typeof google === "object" && typeof google.maps === "object") {
      const DirectionsService = new google.maps.DirectionsService();
      let route = {
        origin: new google.maps.LatLng(
          from._geoloc ? from._geoloc[0] : from[0],
          from._geoloc ? from._geoloc[1] : from[1]
        ),
        waypoints: [],
        destination: new google.maps.LatLng(
          to._geoloc ? to._geoloc[0] : to[0],
          to._geoloc ? to._geoloc[1] : to[1]
        ),
        travelMode: google.maps.TravelMode[by === "TRANSIT" ? "DRIVING" : by],
      };
      let mapResult = await DirectionsService.route(route);
      const calculatedDistance =
        by === "TRANSIT"
          ? Math.ceil(mapResult?.routes[0]?.legs[0]?.duration?.value / 60) < 30
            ? Math.ceil(
                (Math.ceil(
                  mapResult?.routes[0]?.legs[0]?.duration?.value / 60
                ) *
                  1.8) /
                  5
              ) * 5
            : Math.ceil(
                (Math.ceil(
                  mapResult?.routes[0]?.legs[0]?.duration?.value / 60
                ) +
                  20) /
                  5
              ) * 5
          : Math.ceil(mapResult?.routes[0]?.legs[0]?.duration?.value / 60 / 5) *
            5;
      return calculatedDistance;
    } else {
      return 20;
    }
  };
  const calculateAllDistances = async (
    attractions,
    meetingPlace,
    endPlace,
    travelModes
  ) => {
    return await Promise.all(
      travelModes?.map(async (travelMode, index) => {
        let from;
        let to;
        if (index === 0 && meetingPlace?._geoloc) {
          from = meetingPlace?._geoloc;
          to = attractions[0];
        } else {
          from = attractions[meetingPlace?._geoloc ? index - 1 : index];
          if (endPlace && index === travelModes?.length - 1) {
            to = endPlace;
          } else {
            to = attractions[meetingPlace?._geoloc ? index : index + 1];
          }
        }
        if (travelMode?.time && !travelMode?.mapTime) {
          return {
            time: travelMode?.time,
            type: travelMode?.type
              ? travelMode?.type
              : !travelMode
              ? "TRANSIT"
              : travelMode,
          };
        } else {
          return calculateDistance(
            from,
            to,
            travelMode?.type
              ? travelMode?.type
              : !travelMode
              ? "TRANSIT"
              : travelMode
          )
            .then((calculatedDistance) => {
              return {
                mapTime: calculatedDistance,
                time: calculatedDistance,
                type: travelMode?.type
                  ? travelMode?.type
                  : !travelMode
                  ? "TRANSIT"
                  : travelMode,
              };
            })
            .catch((err) => console.log(err));
        }
      })
    );
  };
  const getTransitTimes = (travelModes, routes, lunch) => {
    let transitTimes = [];
    for (let i = 0; i < routes?.length; i++) {
      let transitTime;
      if (travelModes[i]?.time > 0) {
        transitTime = travelModes[i]?.time;
      } else {
        transitTime =
          Math.ceil(routes[i].routes[0].legs[0].duration.value / 60 / 5) * 5;
        if (
          travelModes[i]?.type === "TRANSIT" ||
          travelModes[i] === "TRANSIT"
        ) {
          transitTime = transitTime + Math.ceil((transitTime * 0.4) / 5) * 5;
        }
      }
      if (lunch === i) {
        transitTime = transitTime + 60;
      }
      transitTimes = [...transitTimes, transitTime];
    }
    return transitTimes;
  };
  const getTotalTransitTime = (travelModes, routes, lunch) => {
    let totalTransitTime = routes.reduce((total, item, i) => {
      let transitTime =
        travelModes[i]?.time > 0
          ? travelModes[i]?.time
          : Math.ceil(item.routes[0]?.legs[0]?.duration.value / 60 / 5) * 5;
      if (travelModes[i]?.type === "TRANSIT" || travelModes[i] === "TRANSIT") {
        transitTime =
          travelModes[i]?.time > 0
            ? travelModes[i]?.time
            : transitTime + Math.ceil((transitTime * 0.4) / 5) * 5;
      }
      return total + transitTime;
    }, 0);
    // if (lunch > -1) {
    //   totalTransitTime = totalTransitTime + 60;
    // }
    return totalTransitTime;
  };
  const getArrivalDepartureTime = (
    travelModes,
    start,
    attractions,
    routes,
    meetingPlace,
    endPlace,
    lunchBreak,
    itineraryDurations
  ) => {
    const startTime = toMinutes(start);
    let arrivalDepartureTime = [];
    let currentTime = !meetingPlace?._geoloc
      ? startTime
      : travelModes[0]?.time > 0
      ? startTime + travelModes[0]?.time
      : Math.ceil(
          (startTime + routes[0]?.routes[0].legs[0].duration.value / 60) / 5
        ) * 5;
    if (
      meetingPlace?._geoloc &&
      (travelModes[0]?.type === "TRANSIT" || travelModes[0] === "TRANSIT") &&
      travelModes[0]?.time < 1
    ) {
      const transitTime =
        travelModes[0]?.time > 0
          ? travelModes[0]?.time
          : Math.ceil(routes[0].routes[0].legs[0].duration.value / 60 / 5) * 5;
      currentTime += Math.ceil((transitTime * 0.4) / 5) * 5;
    }
    for (let i = 0; i < attractions.length; i++) {
      if (
        lunchBreak !== -1 &&
        (meetingPlace?._geoloc ? i === lunchBreak : i - 1 === lunchBreak)
      ) {
        currentTime += 60;
      }
      let duration = itineraryDurations[i]
        ? itineraryDurations[i]
        : attractions[i]?.duration;
      arrivalDepartureTime.push({
        arrival: currentTime,
        departure: currentTime + duration,
      });
      currentTime +=
        travelModes[meetingPlace?._geoloc ? i + 1 : i]?.time > 0
          ? duration + travelModes[meetingPlace?._geoloc ? i + 1 : i]?.time
          : Math.ceil(
              (duration +
                routes[meetingPlace?._geoloc ? i + 1 : i]?.routes[0].legs[0]
                  .duration.value /
                  60) /
                5
            ) * 5;
      if (
        (travelModes[meetingPlace?._geoloc ? i + 1 : i]?.type === "TRANSIT" ||
          travelModes[meetingPlace?._geoloc ? i + 1 : i] === "TRANSIT") &&
        travelModes[meetingPlace?._geoloc ? i + 1 : i]?.time < 1 &&
        i !== meetingPlace?._geoloc
          ? 1
          : 0
      ) {
        const transitTime =
          Math.ceil(
            routes[meetingPlace?._geoloc ? i + 1 : i]?.routes[0].legs[0]
              .duration.value /
              60 /
              5
          ) * 5;
        currentTime += Math.ceil((transitTime * 0.4) / 5) * 5;
      }
    }
    if (endPlace) {
      arrivalDepartureTime.push({
        arrival: currentTime,
      });
    }
    return arrivalDepartureTime;
  };
  const getItineraryDuration = (attractions, durations, i) => {
    const attractionsDuration = attractions?.reduce((total, item, i) => {
      let duration = durations[i] ? durations[i] : item?.duration;
      return total + duration;
    }, 0);
    return attractionsDuration;
  };
  const getMapUrls = (route) => {
    const mapUrls = [];
    if (route.waypoints.length === 0) {
      mapUrls.push(
        `https://www.google.com/maps/dir/?api=1&origin=${route?.origin?.lat()},${route?.origin?.lng()}&destination=${route?.destination?.lat()},${route?.destination?.lng()}`
      );
    } else {
      mapUrls.push(
        `https://www.google.com/maps/dir/?api=1&origin=${route?.origin?.lat()},${route?.origin?.lng()}&destination=${route?.waypoints[0]?.location.lat()},${route?.waypoints[0]?.location.lng()}`
      );
      for (let i = 0; i < route.waypoints.length - 1; i++) {
        mapUrls.push(
          `https://www.google.com/maps/dir/?api=1&origin=${route?.waypoints[
            i
          ]?.location.lat()},${route?.waypoints[
            i
          ]?.location.lng()}&destination=${route?.waypoints[
            i + 1
          ]?.location.lat()},${route?.waypoints[i + 1]?.location.lng()}`
        );
      }
      mapUrls.push(
        `https://www.google.com/maps/dir/?api=1&origin=${route?.waypoints[
          route?.waypoints.length - 1
        ]?.location.lat()},${route?.waypoints[
          route?.waypoints.length - 1
        ]?.location.lng()}&destination=${route?.destination?.lat()},${route?.destination?.lng()}`
      );
    }
    return mapUrls;
  };
  const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (isLatLngLiteral(a) || a || isLatLngLiteral(b) || b) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }
    return deepEqual(a, b);
  });
  return {
    calculateDistance,
    calculateAllDistances,
    getTransitTimes,
    getTotalTransitTime,
    getArrivalDepartureTime,
    getItineraryDuration,
    getMapUrls,
    deepCompareEqualsForMaps,
  };
};
export default useMap;
