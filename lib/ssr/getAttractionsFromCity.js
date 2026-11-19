import dottie from "dottie";
import { findCityByEnglishName, searchCollection } from "../search";
const getAttractionsFromCity = async (search) => {
  const cityDocument = findCityByEnglishName(search[0].split("-").join(" "));
  if (!cityDocument) return "not-found";
  const city = dottie.transform(cityDocument);
  let searchDb;
  let searchParameters = {
    q: "",
    query_by: `url`,
    filter_by: `_geoloc:(${city?._geoloc[0]}, ${city?._geoloc[1]}, 8km) && hide:!=true`,
    sort_by: "ratingCounter:desc",
    per_page: 12,
    page: 1,
    exclude_fields:
      "reviews.en, reviews.es, reviews.fil, reviews.fr, reviews.id, reviews.it, reviews.ja, reviews.ko, reviews.ms, reviews.pt, reviews.th, reviews.vi, reviews.zh, reviews.zh-TW, reviews.zh-CH, phoneNumber, address.en, address.es, address.fil, address.fr, address.id, address.it, address.ja, address.ko, address.ms, address.pt, address.th, address.vi, address.zh, address.zh-TW, address.zh-CH, description, translatedDescription.en, translatedDescription.es, translatedDescription.fil, translatedDescription.fr, translatedDescription.id, translatedDescription.it, translatedDescription.ja, translatedDescription.ko, translatedDescription.ms, translatedDescription.pt, translatedDescription.th, translatedDescription.vi, translatedDescription.zh, translatedDescription.zh-TW, translatedDescription.zh-CH, translatedArea.en, translatedArea.es, translatedArea.fil, translatedArea.fr, translatedArea.id, translatedArea.it, translatedArea.ja, translatedArea.ko, translatedArea.ms, translatedArea.pt, translatedArea.th, translatedArea.vi, translatedArea.zh, translatedArea.zh-TW, translatedArea.zh-CH, translatedCity.en, translatedCity.es, translatedCity.fil, translatedCity.fr, translatedCity.id, translatedCity.it, translatedCity.ja, translatedCity.ko, translatedCity.ms, translatedCity.pt, translatedCity.th, translatedCity.vi, translatedCity.zh, translatedCity.zh-TW, translatedCity.zh-CH,",
  };
  if (search[1] === "itineraries") {
    searchDb = "tours";
    searchParameters = {
      ...searchParameters,
      query_by: "name",
      filter_by: `_geoloc:(${city?._geoloc[0]}, ${city?._geoloc[1]}, 120km)`,
      sort_by: `_geoloc(${city?._geoloc[0]}, ${city?._geoloc[1]}):asc`,
      exclude_fields: "",
    };
  } else if (search[1] === "guides") {
    searchDb = "users";
    searchParameters = {
      ...searchParameters,
      query_by: "firstname",
      filter_by: `guide:="true" && verified:="true" && states:=${city?.area}`,
      sort_by: "ratingCounter:desc",
      exclude_fields: "availability, states",
    };
  } else {
    searchDb = "attractions";
  }
  try {
    const data = searchCollection(searchDb, searchParameters);
    if (data?.hits?.length === 0) return "not-found";
    return { data: { ...data }, city };
  } catch {
    return "not-found";
  }
};
export default getAttractionsFromCity;
