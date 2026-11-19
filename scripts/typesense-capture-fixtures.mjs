import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.TYPESENSE_HOST || "https://hft21495dauqblnop-1.a1.typesense.net";
const adminKey = process.env.TYPESENSE_ADMIN_KEY;

if (!adminKey) {
  throw new Error("TYPESENSE_ADMIN_KEY must be set in the environment before capturing fixtures.");
}

const loadSnapshot = async (collection) => JSON.parse(await readFile(path.join(root, "data", "search", `${collection}.json`), "utf8"));

const search = async (collection, params) => {
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  const response = await fetch(`${host}/collections/${collection}/documents/search?${query}`, {
    headers: { "X-TYPESENSE-API-KEY": adminKey },
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`${collection} fixture failed (${response.status}): ${body.slice(0, 300)}`);
  return JSON.parse(body);
};

const first = (items, predicate = () => true) => items.find(predicate) || items[0];
const geoPolygon = ([lat, lng]) => `${lat + 0.05}, ${lng + 0.05}, ${lat - 0.05}, ${lng + 0.05}, ${lat - 0.05}, ${lng - 0.05}, ${lat + 0.05}, ${lng - 0.05}`;
const queryToken = (value) => String(value || "").trim().split(/\s+/)[0] || "";

function sortKeyValues(documents, sortBy) {
  return documents.map((document) =>
    sortBy.split(/,(?![^()]*\))/).map((expression) => {
      const field = expression.trim().replace(/:(asc|desc)$/i, "");
      if (field.startsWith("_eval(")) return document.uid || document.id;
      if (field.startsWith("_geoloc(")) return document._geoloc || null;
      return document[field] ?? null;
    })
  );
}

async function main() {
  const [users, attractions, tours, cities] = await Promise.all([
    loadSnapshot("users"),
    loadSnapshot("attractions"),
    loadSnapshot("tours"),
    loadSnapshot("cities"),
  ]);
  const guide = first(users, (document) => document.uid && document.states && document.fee?.fullDay !== undefined);
  const attraction = first(attractions, (document) => document._geoloc && document.tags?.length && document["translatedName.ja"] && document["translatedName.es"]);
  const tour = first(tours, (document) => document._geoloc && document.tags?.length);
  const city = first(cities, (document) => document._geoloc && document["translatedCity.en"]);
  const state = Array.isArray(guide.states) ? guide.states[0] : guide.states;
  const language = Array.isArray(guide.languages) ? guide.languages[0] : guide.languages;
  const attractionTag = Array.isArray(attraction.tags) ? attraction.tags[0] : attraction.tags;
  const tourTag = Array.isArray(tour.tags) ? tour.tags[0] : tour.tags;
  const guideSorts = ["ratingCounter:desc", "ratingScore:desc", "fee.halfDay:asc", "fee.halfDay:desc", "fee.fullDay:asc", "fee.fullDay:desc", "maxPeople:desc", "licensed:desc", "canDrive:desc"];
  const attractionSorts = ["ratingCounter:desc", "rating:desc", `_geoloc(${attraction._geoloc[0]}, ${attraction._geoloc[1]}):asc`, "duration:asc", "duration:desc"];
  const tourSorts = ["ratingCounter:desc", "ratingScore:desc", "duration:asc", "duration:desc", `_geoloc(${tour._geoloc[0]}, ${tour._geoloc[1]}):asc`];
  const cases = [
    ["users-base", "users", { q: "", query_by: "firstname, lastname", filter_by: `guide:=\"true\" && verified:='true' && states:=${state}`, sort_by: "ratingCounter:desc", per_page: 12, page: 1, exclude_fields: "availability, states" }],
    ["users-language", "users", { q: "*", query_by: "firstname, lastname", filter_by: `guide:=\"true\" && verified:='true' && languages:=[\`${language}\`]`, sort_by: "ratingScore:desc", per_page: 24, page: 1 }],
    ["users-fees-and-qualifications", "users", { q: "", query_by: "firstname, lastname", filter_by: `guide:=\"true\" && verified:='true' && fee.fullDay:[0..${Math.ceil(Number(guide["fee.fullDay"]) || 99999)}] && fee.halfDay:[0..${Math.ceil(Number(guide["fee.halfDay"]) || 99999)}] && licensed:='true'`, sort_by: "fee.fullDay:asc", per_page: 12, page: 1 }],
    ["users-transport-and-date", "users", { q: "", query_by: "firstname, lastname", filter_by: `guide:=\"true\" && verified:=\"true\" && acceptTourFrom:<=36500 && transportIncluded:=\"true\"`, sort_by: "ratingCounter:desc", per_page: 48, page: 1 }],
    ["users-eval", "users", { q: "", query_by: "firstname,lastname", filter_by: `guide:=\"true\" && verified:=\"true\"`, sort_by: `_eval(uid:${guide.uid}):desc, ratingScore:desc`, per_page: 12, page: 1 }],
    ["users-text-en-page-2", "users", { q: queryToken(guide.firstname), query_by: "firstname, lastname", filter_by: `guide:=\"true\" && verified:=\"true\"`, sort_by: "ratingCounter:desc", per_page: 12, page: 2 }],
    ...guideSorts.map((sort_by) => [`users-sort-${sort_by.replace(/[^a-z0-9]+/gi, "-")}`, "users", { q: "", query_by: "firstname, lastname", filter_by: `guide:=\"true\" && verified:=\"true\"`, sort_by, per_page: 12, page: 1 }]),
    ["attractions-polygon-tags", "attractions", { q: "", query_by: "translatedName.en, translatedCity.en, translatedArea.en", filter_by: `tags:=${attractionTag} && _geoloc:(${geoPolygon(attraction._geoloc)}) && hide:!=true`, sort_by: "ratingCounter:desc", per_page: 12, page: 1 }],
    ["attractions-radius-ja", "attractions", { q: queryToken(attraction["translatedName.ja"]), query_by: "translatedName.ja, translatedCity.ja, translatedArea.ja", filter_by: `_geoloc:(${attraction._geoloc[0]}, ${attraction._geoloc[1]}, 70km) && hide:!=true`, sort_by: "rating:desc", per_page: 24, page: 1 }],
    ["attractions-radius-es-page-2", "attractions", { q: queryToken(attraction["translatedName.es"]), query_by: "translatedName.es, translatedCity.es, translatedArea.es", filter_by: `_geoloc:(${attraction._geoloc[0]}, ${attraction._geoloc[1]}, 45mi) && hide:!=true`, sort_by: "duration:asc", per_page: 48, page: 2 }],
    ...attractionSorts.map((sort_by) => [`attractions-sort-${sort_by.replace(/[^a-z0-9]+/gi, "-")}`, "attractions", { q: "", query_by: "translatedName.en, translatedCity.en, translatedArea.en", filter_by: "hide:!=true", sort_by, per_page: 12, page: 1 }]),
    ["tours-combined-filters", "tours", { q: "", query_by: "translatedAttractions.en, translatedAttractions.ja", filter_by: `tags:=${tourTag} && startTime:[360..720] && duration:[0..240] && _geoloc:(${tour._geoloc[0]}, ${tour._geoloc[1]}, 120km)`, sort_by: "ratingCounter:desc", per_page: 12, page: 1 }],
    ...tourSorts.map((sort_by) => [`tours-sort-${sort_by.replace(/[^a-z0-9]+/gi, "-")}`, "tours", { q: "", query_by: "translatedAttractions.en, translatedAttractions.ja", filter_by: `_geoloc:(${tour._geoloc[0]}, ${tour._geoloc[1]}, 120km)`, sort_by, per_page: 12, page: 1 }]),
    ["cities-text", "cities", { q: queryToken(city["translatedCity.en"]), query_by: "translatedCity.en, translatedCity.ja, city, translatedCountry.en, country", sort_by: "city(missing_values: last):asc", per_page: 5, page: 1 }],
    ["empty-result", "attractions", { q: "local-engine-impossible-query", query_by: "translatedName.en", filter_by: "hide:!=true", sort_by: "ratingCounter:desc", per_page: 12, page: 1 }],
  ];

  const fixtures = [];
  for (const [name, collection, params] of cases) {
    const response = await search(collection, params);
    const documents = (response.hits || []).map((hit) => hit.document);
    fixtures.push({
      name,
      collection,
      params,
      found: response.found,
      // The served users snapshot intentionally contains only public verified guides.
      out_of: collection === "users" ? users.length : response.out_of,
      hitIds: documents.map((document) => document.id),
      sortKeyValues: sortKeyValues(documents, params.sort_by || ""),
    });
  }

  const destination = path.join(root, "scripts", "fixtures", "typesense-golden.json");
  await writeFile(destination, `${JSON.stringify(fixtures, null, 2)}\n`);
  console.log(`Captured ${fixtures.length} fixtures in ${destination}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
