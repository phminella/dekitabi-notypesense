const unwrapCallableData = (responseOrData) => {
  if (!responseOrData || typeof responseOrData !== "object") {
    return responseOrData;
  }
  if ("data" in responseOrData) {
    return responseOrData.data;
  }
  return responseOrData;
};

export const getAutocompletePredictions = (responseOrData) => {
  const payload = unwrapCallableData(responseOrData);
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.predictions)) return payload.predictions;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const extractPlaceResult = (responseOrData) => {
  const payload = unwrapCallableData(responseOrData);
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidates = [
    payload?.result,
    payload?.data?.result,
    payload?.place,
    payload?.data?.place,
    payload,
  ];

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      continue;
    }
    if (
      candidate?.name ||
      candidate?.formatted_address ||
      candidate?.geometry?.location
    ) {
      return candidate;
    }
  }

  return null;
};

const toFiniteNumber = (value) => {
  let parsed = value;
  if (typeof parsed === "function") {
    try {
      parsed = parsed();
    } catch {
      return NaN;
    }
  }
  const number = Number(parsed);
  return Number.isFinite(number) ? number : NaN;
};

const extractNumberPairFromString = (value) => {
  if (typeof value !== "string") {
    return null;
  }
  const match = value.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!match) {
    return null;
  }
  const lat = toFiniteNumber(match[1]);
  const lng = toFiniteNumber(match[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }
  return [lat, lng];
};

const extractLatLngFromMapUrl = (url) => {
  if (typeof url !== "string" || !url) {
    return null;
  }
  const atMatch = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (atMatch) {
    return [toFiniteNumber(atMatch[1]), toFiniteNumber(atMatch[2])];
  }

  const encodedMatch = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (encodedMatch) {
    return [toFiniteNumber(encodedMatch[1]), toFiniteNumber(encodedMatch[2])];
  }

  const queryMatch = url.match(/[?&](?:q|query|center)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (queryMatch) {
    return [toFiniteNumber(queryMatch[1]), toFiniteNumber(queryMatch[2])];
  }

  return null;
};

const extractLatLngFromCandidate = (candidate) => {
  if (!candidate) {
    return null;
  }

  if (Array.isArray(candidate) && candidate.length >= 2) {
    const first = toFiniteNumber(candidate[0]);
    const second = toFiniteNumber(candidate[1]);
    if (Number.isFinite(first) && Number.isFinite(second)) {
      return [first, second];
    }
  }

  if (typeof candidate === "string") {
    return extractNumberPairFromString(candidate);
  }

  if (typeof candidate === "object") {
    const lat = toFiniteNumber(
      candidate?.lat ??
        candidate?.latitude ??
        candidate?._lat ??
        candidate?.y ??
        (typeof candidate?.lat === "function" ? candidate?.lat : undefined)
    );
    const lng = toFiniteNumber(
      candidate?.lng ??
        candidate?.longitude ??
        candidate?._long ??
        candidate?._lng ??
        candidate?.x ??
        (typeof candidate?.lng === "function" ? candidate?.lng : undefined)
    );

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return [lat, lng];
    }

    const coordinates = Array.isArray(candidate?.coordinates)
      ? candidate.coordinates
      : null;
    if (coordinates?.length >= 2) {
      // GeoJSON uses [lng, lat].
      const geoLng = toFiniteNumber(coordinates[0]);
      const geoLat = toFiniteNumber(coordinates[1]);
      if (Number.isFinite(geoLat) && Number.isFinite(geoLng)) {
        return [geoLat, geoLng];
      }
    }
  }

  return null;
};

const extractLatLngFromViewport = (viewport) => {
  if (!viewport || typeof viewport !== "object") {
    return null;
  }
  const northeast = extractLatLngFromCandidate(viewport?.northeast);
  const southwest = extractLatLngFromCandidate(viewport?.southwest);
  if (!northeast || !southwest) {
    return null;
  }
  return [
    (northeast[0] + southwest[0]) / 2,
    (northeast[1] + southwest[1]) / 2,
  ];
};

const findLatLngRecursively = (value, depth = 0, visited = new Set()) => {
  if (!value || depth > 8) {
    return null;
  }

  const direct = extractLatLngFromCandidate(value);
  if (direct) {
    return direct;
  }

  if (typeof value !== "object") {
    return null;
  }

  if (visited.has(value)) {
    return null;
  }
  visited.add(value);

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const found = findLatLngRecursively(value[i], depth + 1, visited);
      if (found) {
        return found;
      }
    }
    return null;
  }

  const priorityKeys = [
    "location",
    "geometry",
    "latLng",
    "lat_lng",
    "_geoloc",
    "geoloc",
    "coordinates",
    "viewport",
    "result",
    "place",
    "data",
  ];

  for (let i = 0; i < priorityKeys.length; i++) {
    const key = priorityKeys[i];
    if (key in value) {
      const found = findLatLngRecursively(value[key], depth + 1, visited);
      if (found) {
        return found;
      }
    }
  }

  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (priorityKeys.includes(key)) {
      continue;
    }
    const found = findLatLngRecursively(value[key], depth + 1, visited);
    if (found) {
      return found;
    }
  }

  return null;
};

export const getPlaceLatLng = (place) => {
  const locationCandidates = [
    place?.geometry?.location,
    place?.geometry?.location?.latLng,
    place?.geometry?.location?.lat_lng,
    place?.location,
    place?.latLng,
    place?.position,
    place?._geoloc,
    place?.geoloc,
    place?.coordinates,
    place?.viewport?.center,
    place?.geometry?.viewport?.center,
    extractLatLngFromViewport(place?.viewport),
    extractLatLngFromViewport(place?.geometry?.viewport),
    extractLatLngFromMapUrl(place?.url),
    extractLatLngFromMapUrl(place?.mapUrl),
    extractLatLngFromMapUrl(place?.googleMapsUri),
  ];

  for (let i = 0; i < locationCandidates.length; i++) {
    const coords = extractLatLngFromCandidate(locationCandidates[i]);
    if (coords) {
      const [lat, lng] = coords;
      if (
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        Math.abs(lat) <= 90 &&
        Math.abs(lng) <= 180
      ) {
        return [lat, lng];
      }
    }
  }

  const recursiveCoords = findLatLngRecursively(place);
  if (recursiveCoords) {
    const [lat, lng] = recursiveCoords;
    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180
    ) {
      return [lat, lng];
    }
  }

  return null;
};

export const getLatLngFromPlaceId = async (placeId) => {
  if (!placeId || typeof window === "undefined") {
    return null;
  }

  const geocoderCtor = window?.google?.maps?.Geocoder;
  if (typeof geocoderCtor !== "function") {
    return null;
  }

  try {
    const geocoder = new geocoderCtor();
    return await new Promise((resolve) => {
      geocoder.geocode({ placeId }, (results, status) => {
        if (status === "OK" && Array.isArray(results) && results[0]) {
          resolve(getPlaceLatLng(results[0]));
          return;
        }
        resolve(null);
      });
    });
  } catch {
    return null;
  }
};
