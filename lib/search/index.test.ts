import fixtures from "../../scripts/fixtures/typesense-golden.json";
import attractionDocuments from "../../data/search/attractions.json";
import { findCityByEnglishName, SearchSyntaxError, searchCollection, type SearchCollection, type SearchParams } from "./index";

type Fixture = {
  name: string;
  collection: SearchCollection;
  params: SearchParams;
  found: number;
  out_of: number;
  hitIds: string[];
};

describe("local search golden fixtures", () => {
  it.each(fixtures as Fixture[])("matches Typesense counts and page membership for $name", (fixture) => {
    const result = searchCollection(fixture.collection, fixture.params);
    expect(result.found).toBe(fixture.found);
    expect(result.out_of).toBe(fixture.out_of);
    expect(result.hits.map((hit) => String(hit.document.id)).sort()).toEqual([...fixture.hitIds].sort());
  });
});

describe("local search geography", () => {
  const point = attractionDocuments.find((document) => Array.isArray(document._geoloc));
  if (!point) throw new Error("Expected an attraction with _geoloc in the snapshot.");
  const [latitude, longitude] = point._geoloc as number[];

  it("includes a point inside a polygon and excludes it outside", () => {
    const inside = searchCollection("attractions", {
      q: "",
      query_by: "name",
      filter_by: `_geoloc:(${latitude + 0.01}, ${longitude + 0.01}, ${latitude - 0.01}, ${longitude + 0.01}, ${latitude - 0.01}, ${longitude - 0.01}, ${latitude + 0.01}, ${longitude - 0.01})`,
      per_page: 100,
      page: 1,
    });
    const outside = searchCollection("attractions", {
      q: "",
      query_by: "name",
      filter_by: `_geoloc:(${latitude + 2}, ${longitude + 2}, ${latitude + 1}, ${longitude + 2}, ${latitude + 1}, ${longitude + 1}, ${latitude + 2}, ${longitude + 1})`,
      per_page: 100,
      page: 1,
    });
    expect(inside.hits.some((hit) => hit.document.id === point.id)).toBe(true);
    expect(outside.hits.some((hit) => hit.document.id === point.id)).toBe(false);
  });

  it("includes a point on a radius boundary", () => {
    const result = searchCollection("attractions", {
      q: "",
      query_by: "name",
      filter_by: `_geoloc:(${latitude}, ${longitude}, 0km)`,
      per_page: 100,
      page: 1,
    });
    expect(result.hits.some((hit) => hit.document.id === point.id)).toBe(true);
  });
});

describe("city snapshot lookups", () => {
  it("provides the fields used by city-specific server search pages", () => {
    const city = findCityByEnglishName("Tokyo");
    expect(city?.["translatedCity.en"]).toBe("Tokyo");
    expect(city?.area).toEqual(expect.any(String));
    expect(city?.["translatedArea.en"]).toEqual(expect.any(String));
  });
});

describe("local search strictness", () => {
  it("rejects unsupported filters instead of silently dropping them", () => {
    expect(() => searchCollection("attractions", {
      q: "",
      query_by: "name",
      filter_by: "hide:~true",
      per_page: 12,
      page: 1,
    })).toThrow(SearchSyntaxError);
  });

  it("rejects oversized and non-scalar request parameters", () => {
    expect(() => searchCollection("cities", {
      q: "x".repeat(10_001),
      query_by: "city",
      per_page: 12,
      page: 1,
    })).toThrow(SearchSyntaxError);
    expect(() => searchCollection("cities", {
      q: "",
      query_by: ["city"] as unknown as string,
      per_page: 12,
      page: 1,
    })).toThrow(SearchSyntaxError);
  });

  it("excludes fields only after filtering", () => {
    const result = searchCollection("users", {
      q: "",
      query_by: "firstname",
      filter_by: 'guide:="true" && verified:="true"',
      exclude_fields: "states, availability",
      per_page: 100,
      page: 1,
    });
    expect(result.found).toBeGreaterThan(0);
    expect(result.hits.every((hit) => !("states" in hit.document) && !("availability" in hit.document))).toBe(true);
  });
});

